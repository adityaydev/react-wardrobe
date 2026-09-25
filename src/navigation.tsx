import { type ReactNode } from "react";
import * as A from "react-aria-components";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./controls";
export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}
export interface TabsProps extends Omit<A.TabsProps, "children" | "className"> {
  label: string;
  items: TabItem[];
}
export function Tabs({ label, items, ...props }: TabsProps) {
  return (
    <A.Tabs {...props} className="rw-tabs">
      <A.TabList aria-label={label} className="rw-tab-list">
        {items.map((t) => (
          <A.Tab
            key={t.id}
            id={t.id}
            isDisabled={t.disabled}
            className="rw-tab"
          >
            {t.label}
          </A.Tab>
        ))}
      </A.TabList>
      {items.map((t) => (
        <A.TabPanel key={t.id} id={t.id} className="rw-tab-panel">
          {t.content}
        </A.TabPanel>
      ))}
    </A.Tabs>
  );
}
export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
}
export function Breadcrumbs({
  items,
  label = "Breadcrumbs",
}: {
  items: BreadcrumbItem[];
  label?: string;
}) {
  return (
    <A.Breadcrumbs aria-label={label} className="rw-breadcrumbs">
      {items.map((item, i) => (
        <A.Breadcrumb key={item.id}>
          <A.Link href={item.href} className="rw-link">
            {item.label}
          </A.Link>
          {i < items.length - 1 && <ChevronRight size={12} aria-hidden />}
        </A.Breadcrumb>
      ))}
    </A.Breadcrumbs>
  );
}
export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label?: string;
  isDisabled?: boolean;
}
export function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "Pagination",
  isDisabled,
}: PaginationProps) {
  const count = Math.max(1, Math.floor(pageCount) || 1),
    current = Math.max(1, Math.min(count, page));
  const pages = Array.from(
    new Set([
      1,
      ...Array.from({ length: 5 }, (_, i) => current + i - 2).filter(
        (n) => n > 1 && n < count,
      ),
      count,
    ]),
  ).sort((a, b) => a - b);
  return (
    <nav className="rw-pagination" aria-label={label}>
      <Button
        variant="secondary"
        size="sm"
        aria-label="Previous page"
        isDisabled={isDisabled || current === 1}
        onPress={() => onPageChange(current - 1)}
      >
        <ChevronLeft size={15} />
      </Button>
      {pages.map((n, i) => (
        <span key={n} className="rw-inline">
          {i > 0 && n - pages[i - 1] > 1 && <span aria-hidden>…</span>}
          <Button
            size="sm"
            variant={n === current ? "primary" : "ghost"}
            aria-label={`Page ${n}`}
            aria-current={n === current ? "page" : undefined}
            isDisabled={isDisabled}
            onPress={() => onPageChange(n)}
          >
            {n}
          </Button>
        </span>
      ))}
      <Button
        variant="secondary"
        size="sm"
        aria-label="Next page"
        isDisabled={isDisabled || current === count}
        onPress={() => onPageChange(current + 1)}
      >
        <ChevronRight size={15} />
      </Button>
    </nav>
  );
}
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}
export interface AccordionProps extends Omit<
  A.DisclosureGroupProps,
  "children" | "className"
> {
  items: AccordionItem[];
}
export function Accordion({ items, ...props }: AccordionProps) {
  return (
    <A.DisclosureGroup {...props} className="rw-accordion">
      {items.map((item) => (
        <A.Disclosure
          id={item.id}
          key={item.id}
          isDisabled={item.disabled}
          className="rw-disclosure"
        >
          <A.Heading>
            <A.Button slot="trigger" className="rw-disclosure-trigger">
              {item.title}
              <ChevronDown size={17} />
            </A.Button>
          </A.Heading>
          <A.DisclosurePanel className="rw-disclosure-panel">
            {item.content}
          </A.DisclosurePanel>
        </A.Disclosure>
      ))}
    </A.DisclosureGroup>
  );
}
export interface LinkProps extends Omit<A.LinkProps, "children" | "className"> {
  children: ReactNode;
}
export function Link({ children, ...props }: LinkProps) {
  return (
    <A.Link {...props} className="rw-link">
      {children}
    </A.Link>
  );
}
export function Steps({
  items,
  current,
  label = "Progress",
}: {
  items: string[];
  current: number;
  label?: string;
}) {
  return (
    <ol className="rw-steps" aria-label={label}>
      {items.map((title, i) => (
        <li
          key={`${i}-${title}`}
          aria-current={i === current ? "step" : undefined}
          data-complete={i < current}
        >
          <span aria-hidden>{i < current ? "✓" : i + 1}</span>
          <span>{title}</span>
        </li>
      ))}
    </ol>
  );
}
