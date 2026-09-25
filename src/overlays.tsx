import type { ReactNode } from "react";
import {
  DialogTrigger,
  ModalOverlay,
  Modal as AriaModal,
  Dialog,
  Heading,
  MenuTrigger,
  Menu as AriaMenu,
  MenuItem,
  Popover,
  TooltipTrigger,
  Tooltip as AriaTooltip,
  type Key,
} from "react-aria-components";
import { X } from "lucide-react";
import { Button } from "./controls";
import { useThemeAttributes } from "./provider";

export interface ModalProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isDismissable?: boolean;
}
export function Modal({
  trigger,
  title,
  description,
  children,
  footer,
  isOpen,
  onOpenChange,
  isDismissable = true,
}: ModalProps) {
  const theme = useThemeAttributes();
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <ModalOverlay
        {...theme}
        className="rw-root rw-modal-overlay"
        isDismissable={isDismissable}
      >
        <AriaModal className="rw-modal">
          <Dialog className="rw-dialog">
            {({ close }) => (
              <>
                <header className="rw-dialog-header">
                  <div>
                    <Heading slot="title">{title}</Heading>
                    {description && <p>{description}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    aria-label="Close dialog"
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
          </Dialog>
        </AriaModal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}
export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onAction?: (key: Key) => void;
  label?: string;
}
export function Dropdown({
  trigger,
  items,
  onAction,
  label = "Actions",
}: DropdownProps) {
  const theme = useThemeAttributes();
  return (
    <MenuTrigger>
      {trigger}
      <Popover {...theme} className="rw-root rw-popover">
        <AriaMenu
          aria-label={label}
          items={items}
          onAction={onAction}
          disabledKeys={items.filter((i) => i.disabled).map((i) => i.id)}
          className="rw-menu"
        >
          {(item) => (
            <MenuItem
              id={item.id}
              textValue={item.label}
              className={`rw-menu-item ${item.danger ? "rw-menu-item--danger" : ""}`}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          )}
        </AriaMenu>
      </Popover>
    </MenuTrigger>
  );
}
export function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) {
  const theme = useThemeAttributes();
  return (
    <TooltipTrigger delay={400}>
      {children}
      <AriaTooltip {...theme} className="rw-root rw-tooltip">
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
