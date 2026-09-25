import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function NavigationLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="demo-navigation-link" href={href}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
