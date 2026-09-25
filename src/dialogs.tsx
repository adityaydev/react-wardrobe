import { useState, type ReactNode } from "react";
import * as A from "react-aria-components";
import { X } from "lucide-react";
import { Button } from "./controls";
import { useThemeAttributes } from "./provider";
import { Modal, type ModalProps } from "./overlays";
export interface DrawerProps extends ModalProps {
  side?: "start" | "end";
}
export function Drawer({
  trigger,
  title,
  description,
  children,
  footer,
  isOpen,
  onOpenChange,
  isDismissable = true,
  side = "end",
}: DrawerProps) {
  const theme = useThemeAttributes();
  return (
    <A.DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <A.ModalOverlay
        {...theme}
        className={`rw-root rw-modal-overlay rw-drawer-overlay rw-drawer--${side}`}
        isDismissable={isDismissable}
      >
        <A.Modal className="rw-drawer">
          <A.Dialog className="rw-dialog">
            {({ close }) => (
              <>
                <header className="rw-dialog-header">
                  <div>
                    <A.Heading slot="title">{title}</A.Heading>
                    {description && <p>{description}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    aria-label="Close drawer"
                    onPress={close}
                  >
                    <X size={18} />
                  </Button>
                </header>
                <div className="rw-dialog-body">{children}</div>
                {footer && (
                  <footer className="rw-dialog-footer">{footer}</footer>
                )}
              </>
            )}
          </A.Dialog>
        </A.Modal>
      </A.ModalOverlay>
    </A.DialogTrigger>
  );
}
export interface PopoverProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  placement?: A.Placement;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export function Popover({
  trigger,
  title,
  children,
  placement = "bottom",
  isOpen,
  onOpenChange,
}: PopoverProps) {
  const theme = useThemeAttributes();
  return (
    <A.DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <A.Popover
        {...theme}
        placement={placement}
        className="rw-root rw-popover"
      >
        <A.Dialog className="rw-popover-dialog">
          <A.Heading slot="title">{title}</A.Heading>
          {children}
        </A.Dialog>
      </A.Popover>
    </A.DialogTrigger>
  );
}
export interface ConfirmDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  danger?: boolean;
}
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  danger = false,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false),
    [pending, setPending] = useState(false),
    [error, setError] = useState("");
  return (
    <Modal
      trigger={trigger}
      title={title}
      isOpen={open}
      isDismissable={!pending}
      onOpenChange={(v) => {
        if (!pending) {
          setOpen(v);
          setError("");
        }
      }}
      footer={
        <>
          <Button
            variant="secondary"
            autoFocus
            isDisabled={pending}
            onPress={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            loading={pending}
            onPress={async () => {
              setPending(true);
              setError("");
              try {
                await onConfirm();
                setOpen(false);
              } catch {
                setError(
                  "The action could not be completed. Please try again.",
                );
              } finally {
                setPending(false);
              }
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p>{description}</p>
      {error && (
        <p role="alert" className="rw-error">
          {error}
        </p>
      )}
    </Modal>
  );
}
export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  onAction: () => void;
}
export function CommandPalette({
  trigger,
  commands,
  isOpen,
  onOpenChange,
}: {
  trigger: ReactNode;
  commands: CommandItem[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internal, setInternal] = useState(false),
    [query, setQuery] = useState("");
  const open = isOpen ?? internal;
  function change(v: boolean) {
    setInternal(v);
    onOpenChange?.(v);
    if (!v) setQuery("");
  }
  const filtered = commands.filter((c) =>
    `${c.label} ${c.description ?? ""}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()),
  );
  return (
    <Modal
      trigger={trigger}
      title="Command palette"
      isOpen={open}
      onOpenChange={change}
    >
      <A.ComboBox
        aria-label="Search commands"
        inputValue={query}
        onInputChange={setQuery}
        items={filtered}
        allowsEmptyCollection
        menuTrigger="focus"
        onSelectionChange={(key) => {
          const c = commands.find((c) => c.id === key);
          if (c && !c.disabled) {
            change(false);
            c.onAction();
          }
        }}
        disabledKeys={commands.filter((c) => c.disabled).map((c) => c.id)}
        className="rw-field"
      >
        <A.Input autoFocus className="rw-input" placeholder="Type a command…" />
        <A.ListBox<CommandItem>
          className="rw-command-list"
          renderEmptyState={() => (
            <p className="rw-empty">No matching commands</p>
          )}
        >
          {(c) => (
            <A.ListBoxItem id={c.id} textValue={c.label} className="rw-option">
              <div>
                <A.Text slot="label">{c.label}</A.Text>
                {c.description && (
                  <A.Text slot="description" className="rw-description">
                    {c.description}
                  </A.Text>
                )}
              </div>
            </A.ListBoxItem>
          )}
        </A.ListBox>
      </A.ComboBox>
    </Modal>
  );
}
