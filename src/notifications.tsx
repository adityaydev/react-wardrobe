import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Bell,
  CheckCheck,
  Volume2,
  VolumeX,
  X,
  CircleCheck,
  Info,
  TriangleAlert,
} from "lucide-react";
import { Button } from "./controls";
import { Modal } from "./overlays";
import { EmptyState } from "./layout";

export interface NotificationInput {
  id?: string;
  title: string;
  description?: string;
  tone?: "info" | "success" | "warning" | "danger";
}
export interface Notification extends NotificationInput {
  id: string;
  createdAt: number;
  read: boolean;
}
interface NotificationContextValue {
  notifications: Notification[];
  notify: (input: NotificationInput) => void;
  markAllRead: () => void;
  clear: () => void;
  soundEnabled: boolean;
  enableSound: () => Promise<boolean>;
  mute: () => void;
  soundError: string | null;
}
const Context = createContext<NotificationContextValue | null>(null);
export function useNotifications() {
  const value = useContext(Context);
  if (!value)
    throw new Error("useNotifications requires NotificationProvider.");
  return value;
}
export interface NotificationProviderProps {
  children: ReactNode;
  source?: (listener: (notification: NotificationInput) => void) => () => void;
  channel?: string;
}
export function NotificationProvider({
  children,
  source,
  channel,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]),
    [toasts, setToasts] = useState<Notification[]>([]),
    [soundEnabled, setSoundEnabled] = useState(false),
    [soundError, setSoundError] = useState<string | null>(null),
    [announcement, setAnnouncement] = useState("");
  const seen = useRef(new Set<string>()),
    audio = useRef<AudioContext | null>(null),
    enabled = useRef(false),
    broadcast = useRef<BroadcastChannel | null>(null),
    lastSound = useRef(0),
    mounted = useRef(true);
  const receive = useCallback((input: NotificationInput, remote = false) => {
    if (
      !mounted.current ||
      !input ||
      typeof input.title !== "string" ||
      !input.title.trim()
    )
      return;
    const id =
      input.id ??
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`;
    if (seen.current.has(id)) return;
    seen.current.add(id);
    if (seen.current.size > 500)
      seen.current.delete(seen.current.values().next().value!);
    const item: Notification = {
      id,
      title: input.title.slice(0, 300),
      description:
        typeof input.description === "string"
          ? input.description.slice(0, 1000)
          : undefined,
      tone: ["info", "success", "warning", "danger"].includes(input.tone ?? "")
        ? input.tone
        : "info",
      createdAt: Date.now(),
      read: false,
    };
    setNotifications((list) => [item, ...list].slice(0, 50));
    setToasts((list) => [...list, item].slice(-3));
    setAnnouncement(`${item.title}. ${item.description ?? ""}`);
    if (!remote) broadcast.current?.postMessage(item);
    if (
      !remote &&
      enabled.current &&
      audio.current?.state === "running" &&
      Date.now() - lastSound.current > 1000
    ) {
      lastSound.current = Date.now();
      const context = audio.current,
        osc = context.createOscillator(),
        gain = context.createGain();
      osc.connect(gain);
      gain.connect(context.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        880,
        context.currentTime + 0.13,
      );
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + 0.25,
      );
      osc.start();
      osc.stop(context.currentTime + 0.27);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    }
  }, []);
  const notify = useCallback(
    (input: NotificationInput) => receive(input),
    [receive],
  );
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      enabled.current = false;
      void audio.current?.close();
      audio.current = null;
    };
  }, []);
  useEffect(() => source?.(notify), [source, notify]);
  useEffect(() => {
    if (!channel || typeof BroadcastChannel === "undefined") return;
    const bus = new BroadcastChannel(channel);
    broadcast.current = bus;
    bus.onmessage = (event) => receive(event.data, true);
    return () => {
      bus.close();
      broadcast.current = null;
    };
  }, [channel, receive]);
  const enableSound = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !window.AudioContext)
        throw new Error("Audio is unavailable in this browser.");
      const context = audio.current ?? new AudioContext();
      audio.current = context;
      await context.resume();
      if (context.state !== "running")
        throw new Error("Your browser did not enable sound.");
      if (!mounted.current) return false;
      enabled.current = true;
      setSoundEnabled(true);
      setSoundError(null);
      return true;
    } catch (error) {
      enabled.current = false;
      setSoundEnabled(false);
      setSoundError(
        error instanceof Error ? error.message : "Sound could not be enabled.",
      );
      return false;
    }
  }, []);
  const dismiss = useCallback(
    (id: string) =>
      setToasts((items) => items.filter((item) => item.id !== id)),
    [],
  );
  return (
    <Context.Provider
      value={{
        notifications,
        notify,
        soundEnabled,
        soundError,
        enableSound,
        mute: () => {
          enabled.current = false;
          setSoundEnabled(false);
        },
        markAllRead: () =>
          setNotifications((items) =>
            items.map((item) => ({ ...item, read: true })),
          ),
        clear: () => {
          setNotifications([]);
          setToasts([]);
        },
      }}
    >
      {children}
      <div
        className="rw-sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="rw-toast-region" role="region" aria-label="Notifications">
        {toasts.map((item) => (
          <Toast key={item.id} item={item} dismiss={dismiss} />
        ))}
      </div>
    </Context.Provider>
  );
}
function Toast({
  item,
  dismiss,
}: {
  item: Notification;
  dismiss: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const paused = hovered || focusWithin;
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => dismiss(item.id), 7000);
    return () => clearTimeout(timer);
  }, [item.id, dismiss, paused]);
  const Icon =
    item.tone === "success"
      ? CircleCheck
      : item.tone === "warning" || item.tone === "danger"
        ? TriangleAlert
        : Info;
  return (
    <article
      className={`rw-toast rw-toast--${item.tone}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocusWithin(false);
      }}
    >
      <Icon size={19} />
      <div>
        <strong>{item.title}</strong>
        {item.description && <p>{item.description}</p>}
      </div>
      <Button
        variant="ghost"
        size="sm"
        aria-label={`Dismiss ${item.title}`}
        onPress={() => dismiss(item.id)}
      >
        <X size={15} />
      </Button>
    </article>
  );
}
export function NotificationCenter() {
  const {
    notifications,
    markAllRead,
    clear,
    soundEnabled,
    enableSound,
    mute,
    soundError,
  } = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <Modal
      title="Your notifications"
      description="A quiet place for everything that needs your attention."
      trigger={
        <Button
          variant="secondary"
          aria-label={`Notifications, ${unread} unread`}
          icon={<Bell size={17} />}
        >
          {unread > 0 && <span className="rw-count">{unread}</span>}
        </Button>
      }
    >
      <div className="rw-inline rw-notification-actions">
        <Button
          size="sm"
          variant="ghost"
          icon={<CheckCheck size={15} />}
          onPress={markAllRead}
        >
          Mark all read
        </Button>
        <Button
          size="sm"
          variant="ghost"
          icon={soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          onPress={() => {
            if (soundEnabled) mute();
            else void enableSound();
          }}
        >
          {soundEnabled ? "Mute sound" : "Enable sound"}
        </Button>
        <Button size="sm" variant="ghost" onPress={clear}>
          Clear
        </Button>
      </div>
      {soundError && (
        <p className="rw-error" role="alert">
          {soundError}
        </p>
      )}
      <div className="rw-inbox">
        {notifications.length ? (
          notifications.map((item) => (
            <article key={item.id} data-unread={!item.read}>
              <span className="rw-inbox-dot" />
              <div>
                <strong>{item.title}</strong>
                {item.description && <p>{item.description}</p>}
                <small>
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            </article>
          ))
        ) : (
          <EmptyState
            icon={<Bell size={28} />}
            title="You're all caught up"
            description="New notifications will appear here."
          />
        )}
      </div>
    </Modal>
  );
}
