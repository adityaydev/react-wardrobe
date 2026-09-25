import { useState, useEffect, type ReactNode } from "react";
import * as A from "react-aria-components";
import { LoaderCircle, Copy, Check } from "lucide-react";
import { Button } from "./controls";
export interface ProgressBarProps extends Omit<
  A.ProgressBarProps,
  "children" | "className"
> {
  label: string;
}
export function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <A.ProgressBar {...props} className="rw-progress">
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="rw-progress-label">
            <A.Label>{label}</A.Label>
            <span>{isIndeterminate ? "In progress" : valueText}</span>
          </div>
          <div className="rw-progress-track">
            <div
              className="rw-progress-fill"
              style={{ width: isIndeterminate ? "35%" : `${percentage}%` }}
            />
          </div>
        </>
      )}
    </A.ProgressBar>
  );
}
export interface MeterProps {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  valueLabel?: string;
  formatOptions?: Intl.NumberFormatOptions;
}
export function Meter({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  valueLabel,
  formatOptions,
}: MeterProps) {
  const { locale } = A.useLocale();
  const minimum = Number.isFinite(minValue) ? minValue : 0;
  const maximum = Number.isFinite(maxValue) ? Math.max(minimum, maxValue) : 100;
  const bounded = Math.max(
    minimum,
    Math.min(maximum, Number.isFinite(value) ? value : minimum),
  );
  const fraction =
    maximum === minimum ? 0 : (bounded - minimum) / (maximum - minimum);
  const text =
    valueLabel ??
    new Intl.NumberFormat(locale, formatOptions ?? { style: "percent" }).format(
      formatOptions ? bounded : fraction,
    );
  return (
    <div className="rw-progress">
      <meter
        className="rw-sr-only"
        aria-label={label}
        min={minimum}
        max={maximum}
        value={bounded}
        aria-valuetext={text}
      />
      <div className="rw-progress-label" aria-hidden="true">
        <span>{label}</span>
        <span>{text}</span>
      </div>
      <div className="rw-progress-track" aria-hidden="true">
        <div
          className="rw-progress-fill"
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
    </div>
  );
}
export function Spinner({
  label = "Loading",
  size = 20,
}: {
  label?: string;
  size?: number;
}) {
  return (
    <span role="status" className="rw-inline">
      <LoaderCircle size={size} className="rw-spin" aria-hidden />
      <span className="rw-sr-only">{label}</span>
    </span>
  );
}
export interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}
export function Avatar({ name, src, size = "md" }: AvatarProps) {
  const [failed, setFailed] = useState<string>();
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className={`rw-avatar rw-avatar--${size}`}
      role="img"
      aria-label={name}
    >
      {src && failed !== src ? (
        <img src={src} alt="" onError={() => setFailed(src)} />
      ) : (
        initials || "?"
      )}
    </span>
  );
}
export function AvatarGroup({
  people,
  max = 4,
}: {
  people: AvatarProps[];
  max?: number;
}) {
  const visible = Math.max(1, max);
  return (
    <div className="rw-avatar-group" role="group" aria-label="People">
      {people.slice(0, visible).map((p, i) => (
        <Avatar key={i} {...p} />
      ))}
      {people.length > visible && (
        <span
          className="rw-avatar"
          aria-label={`${people.length - visible} more people`}
        >
          +{people.length - visible}
        </span>
      )}
    </div>
  );
}
export interface TagItem {
  id: string;
  label: string;
}
export interface TagGroupProps {
  label: string;
  items: TagItem[];
  onRemove?: (keys: Set<A.Key>) => void;
  isDisabled?: boolean;
}
export function TagGroup({
  label,
  items,
  onRemove,
  isDisabled,
}: TagGroupProps) {
  return (
    <A.TagGroup
      aria-label={label}
      onRemove={isDisabled ? undefined : onRemove}
      disabledKeys={isDisabled ? items.map((i) => i.id) : undefined}
      className="rw-tags"
    >
      <A.TagList items={items}>
        {(item) => (
          <A.Tag id={item.id} textValue={item.label} className="rw-tag">
            {item.label}
            {onRemove && (
              <A.Button slot="remove" aria-label={`Remove ${item.label}`}>
                ×
              </A.Button>
            )}
          </A.Tag>
        )}
      </A.TagList>
    </A.TagGroup>
  );
}
export function Separator({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  return <A.Separator orientation={orientation} className="rw-separator" />;
}
export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rw-kbd">{children}</kbd>;
}
export function CodeBlock({
  code,
  label = "Example code",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    setCopied(false);
    setError("");
  }, [code]);
  return (
    <div className="rw-code">
      <Button
        variant="ghost"
        size="sm"
        aria-label={`Copy ${label}`}
        onPress={async () => {
          try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setError("");
          } catch {
            setError("Copy unavailable. Select and copy the code manually.");
          }
        }}
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
        {copied ? "Copied" : "Copy"}
      </Button>
      <pre tabIndex={0} aria-label={label}>
        <code>{code}</code>
      </pre>
      <span role="status" className={error ? "rw-error" : "rw-sr-only"}>
        {error || (copied ? "Code copied" : "")}
      </span>
    </div>
  );
}
