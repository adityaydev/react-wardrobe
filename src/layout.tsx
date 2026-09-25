import type { HTMLAttributes, ReactNode } from "react";
import { Info, CircleCheck, TriangleAlert } from "lucide-react";
import { cx } from "./utils";
export function Stack({
  children,
  gap = "md",
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { gap?: "sm" | "md" | "lg" }) {
  return (
    <div {...props} className={cx("rw-stack", `rw-gap-${gap}`, className)}>
      {children}
    </div>
  );
}
export function Inline({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("rw-inline", className)}>
      {children}
    </div>
  );
}
export function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("rw-card", className)}>
      {children}
    </div>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
}) {
  return <span className={`rw-badge rw-badge--${tone}`}>{children}</span>;
}
export function Alert({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children?: ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
}) {
  const Icon =
    tone === "success" ? CircleCheck : tone === "info" ? Info : TriangleAlert;
  return (
    <div
      className={`rw-alert rw-alert--${tone}`}
      role={tone === "danger" ? "alert" : "status"}
    >
      <Icon size={19} aria-hidden />
      <div>
        <strong>{title}</strong>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="rw-page-header">
      <div>
        {eyebrow && <span className="rw-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="rw-inline">{actions}</div>}
    </header>
  );
}
export function Toolbar({
  children,
  actions,
  label = "Page tools",
}: {
  children?: ReactNode;
  actions?: ReactNode;
  label?: string;
}) {
  return (
    <div className="rw-toolbar" role="group" aria-label={label}>
      <div className="rw-inline">{children}</div>
      <div className="rw-inline">{actions}</div>
    </div>
  );
}
export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rw-form-section">
      <legend>{title}</legend>
      {description && <p>{description}</p>}
      <div className="rw-form-grid">{children}</div>
    </fieldset>
  );
}
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
}
export function Navbar({
  brand,
  items,
  activeId,
  footer,
}: {
  brand: ReactNode;
  items: NavItem[];
  activeId?: string;
  footer?: ReactNode;
}) {
  return (
    <aside className="rw-navbar">
      <div className="rw-navbar-brand">{brand}</div>
      <nav aria-label="Main navigation">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={activeId === item.id ? "page" : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && <small>{item.badge}</small>}
          </a>
        ))}
      </nav>
      {footer && <div className="rw-navbar-footer">{footer}</div>}
    </aside>
  );
}
export function AppShell({
  navigation,
  children,
  topbar,
}: {
  navigation: ReactNode;
  children: ReactNode;
  topbar?: ReactNode;
}) {
  return (
    <div className="rw-app-shell">
      <a className="rw-skip-link" href="#rw-main">
        Skip to content
      </a>
      {navigation}
      <div className="rw-app-content">
        {topbar && <header className="rw-topbar">{topbar}</header>}
        <main id="rw-main">{children}</main>
      </div>
    </div>
  );
}
export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rw-empty">
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
export function Skeleton({
  width = "100%",
  height = 20,
}: {
  width?: number | string;
  height?: number | string;
}) {
  return <span className="rw-skeleton" aria-hidden style={{ width, height }} />;
}
