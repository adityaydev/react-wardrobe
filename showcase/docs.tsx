import { NavigationLink } from "./navigation-link";
import { useState, useEffect } from "react";
import { Search, Layers, Menu, X } from "lucide-react";
import * as W from "../src";
import { catalogue } from "./catalogue";
import api from "./api.json";
import examples from "./examples.json";
import "./docs.css";
type PropRow = {
  name: string;
  type: string;
  required: boolean;
  default: string;
  description: string;
};
export function Documentation() {
  const [hash, setHash] = useState(location.hash),
    [query, setQuery] = useState(""),
    [theme, setTheme] = useState<W.Theme>("light"),
    [accent, setAccent] = useState<W.Accent>("amber"),
    [density, setDensity] = useState<"comfortable" | "compact">("comfortable"),
    [navOpen, setNavOpen] = useState(false),
    [showAllProps, setShowAllProps] = useState(false);
  useEffect(() => {
    const update = () => {
      if (!location.hash.startsWith("#/components/")) return;
      setHash(location.hash);
      setNavOpen(false);
      setShowAllProps(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const id = hash.split("/")[2] ?? "button";
  const item = catalogue.find((c) => c.id === id);
  const docs = catalogue.filter((c) =>
    `${c.name} ${c.category} ${c.description}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const groups = [...new Set(catalogue.map((c) => c.category))];
  const propData = item
    ? ((api as Record<string, { props: PropRow[] }>)[item.name]?.props ?? [])
    : [];
  const props = showAllProps
    ? propData
    : propData.filter(
        (p) =>
          !/^on[A-Z]/.test(p.name) &&
          !["id", "slot", "style", "className"].includes(p.name),
      );
  useEffect(() => {
    document.title = item
      ? `${item.name} — React Wardrobe`
      : "Components — React Wardrobe";
  }, [item]);
  return (
    <W.WardrobeProvider theme={theme} accent={accent} density={density}>
      <W.NotificationProvider>
        <div className="docs-shell">
          <a
            className="rw-skip-link"
            href="#docs-main"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("docs-main")?.scrollIntoView();
              document.getElementById("docs-main")?.focus();
            }}
          >
            Skip to content
          </a>
          <header className="docs-top">
            <a className="docs-brand" href="#/components/button">
              <span>w.</span> wardrobe <small>COMPONENT LIBRARY</small>
            </a>
            <W.Inline>
              <W.Button
                variant="ghost"
                size="sm"
                className="docs-menu-toggle"
                aria-label={navOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={navOpen}
                onPress={() => setNavOpen(!navOpen)}
              >
                {navOpen ? <X size={18} /> : <Menu size={18} />}
              </W.Button>
              <NavigationLink href="#showcase">Showcase</NavigationLink>
              <W.Switch
                isSelected={theme === "dark"}
                onChange={(v) => setTheme(v ? "dark" : "light")}
              >
                Dark mode
              </W.Switch>
            </W.Inline>
          </header>
          <aside
            className={`docs-sidebar ${navOpen ? "docs-sidebar--open" : ""}`}
          >
            <W.SearchField
              label="Find a component"
              placeholder="Search the library…"
              value={query}
              onChange={setQuery}
            />
            <div className="docs-count">{docs.length} components · v0.2</div>
            <nav aria-label="Component documentation">
              {groups.map((group) => {
                const matches = docs.filter((d) => d.category === group);
                return matches.length ? (
                  <section key={group}>
                    <h2>{group}</h2>
                    {matches.map((c) => (
                      <a
                        key={c.id}
                        href={`#/components/${c.id}`}
                        aria-current={c.id === id ? "page" : undefined}
                      >
                        {c.name}
                      </a>
                    ))}
                  </section>
                ) : null;
              })}
              {docs.length === 0 && (
                <p className="rw-description">
                  No components match your search.
                </p>
              )}
            </nav>
            <div className="docs-sidebar-note">
              <Layers size={16} />
              <p>
                One visual language.
                <br />
                Every interaction considered.
              </p>
            </div>
          </aside>
          <main id="docs-main" tabIndex={-1} className="docs-main">
            {item ? (
              <>
                <W.Breadcrumbs
                  items={[
                    {
                      id: "library",
                      label: "Library",
                      href: "#/components/button",
                    },
                    { id: "category", label: item.category },
                    { id: "component", label: item.name },
                  ]}
                />
                <header className="docs-heading">
                  <W.Badge tone="accent">{item.category}</W.Badge>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                </header>
                <div className="docs-anchor-links">
                  <a
                    href="#docs-preview"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById("docs-preview")?.scrollIntoView();
                    }}
                  >
                    Preview
                  </a>
                  <a
                    href="#docs-usage"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById("docs-usage")?.scrollIntoView();
                    }}
                  >
                    Usage
                  </a>
                  <a
                    href="#docs-api"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById("docs-api")?.scrollIntoView();
                    }}
                  >
                    API reference
                  </a>
                  <a
                    href="#docs-accessibility"
                    onClick={(event) => {
                      event.preventDefault();
                      document
                        .getElementById("docs-accessibility")
                        ?.scrollIntoView();
                    }}
                  >
                    Interaction notes
                  </a>
                </div>
                <section id="docs-preview" className="docs-section">
                  <div className="docs-section-heading">
                    <h2>Make it your own.</h2>
                    <span>LIVE PREVIEW</span>
                  </div>
                  <div className="docs-preview-controls">
                    <W.Select
                      label="Accent"
                      selectedKey={accent}
                      onSelectionChange={(v) => setAccent(v as W.Accent)}
                      options={[
                        { id: "amber", label: "Amber" },
                        { id: "sage", label: "Sage" },
                        { id: "iris", label: "Iris" },
                      ]}
                    />
                    <W.Select
                      label="Density"
                      selectedKey={density}
                      onSelectionChange={(v) =>
                        setDensity(v as "comfortable" | "compact")
                      }
                      options={[
                        { id: "comfortable", label: "Comfortable" },
                        { id: "compact", label: "Compact" },
                      ]}
                    />
                  </div>
                  <div
                    className={`docs-example docs-example--${item.id}`}
                    key={item.id}
                  >
                    {item.render()}
                  </div>
                  <p className="rw-description">
                    This is a working component. Use your keyboard, change the
                    theme, and try its interaction.
                  </p>
                </section>
                <section id="docs-usage" className="docs-section">
                  <h2>Usage</h2>
                  <W.CodeBlock
                    code={
                      (examples as Record<string, string>)[item.name] ??
                      item.code
                    }
                    label={`${item.name} usage`}
                  />
                  <p className="rw-description">
                    Import the stylesheet once and wrap your application with
                    WardrobeProvider. Notification examples additionally need
                    NotificationProvider.
                  </p>
                </section>
                <section id="docs-api" className="docs-section">
                  <div className="docs-section-heading">
                    <h2>API reference</h2>
                    <W.Button
                      variant="ghost"
                      size="sm"
                      onPress={() => setShowAllProps(!showAllProps)}
                    >
                      {showAllProps
                        ? "Show common props"
                        : "Show all props & events"}
                    </W.Button>
                  </div>
                  {props.length ? (
                    <div
                      className="rw-table-wrap"
                      role="region"
                      aria-label={`${item.name} props`}
                      tabIndex={0}
                    >
                      <table className="rw-table docs-props">
                        <caption className="rw-sr-only">
                          {item.name} props
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Prop</th>
                            <th scope="col">Type</th>
                            <th scope="col">Default / requirement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.map((p) => (
                            <tr key={p.name}>
                              <td>
                                <code>{p.name}</code>
                                {p.description && <p>{p.description}</p>}
                              </td>
                              <td>
                                <code>{p.type}</code>
                              </td>
                              <td>
                                {p.default ||
                                  (p.required ? "Required" : "Optional")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <W.Alert title="Composition API">
                      This component is provided through React Aria context. See
                      the typed source and the usage example for its composition
                      contract.
                    </W.Alert>
                  )}
                  <p className="rw-description">
                    Generated from the installed TypeScript implementation.
                    ARIA/data attributes remain supported where the underlying
                    primitive accepts them. Long generic types may be
                    abbreviated.
                  </p>
                </section>
                <section id="docs-accessibility" className="docs-section">
                  <h2>Interaction & accessibility</h2>
                  <W.Alert title="Implementation guidance">
                    {item.notes}
                  </W.Alert>
                  <p className="rw-description">
                    All examples share focus rings, theme tokens and
                    reduced-motion support. Test the final composition with
                    keyboard and assistive technology; accessible primitives do
                    not certify an application.
                  </p>
                </section>
                <footer className="docs-footer">
                  <span>React Wardrobe · MIT</span>
                  <a
                    href="https://react-aria.adobe.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Built on React Aria ↗
                  </a>
                </footer>
              </>
            ) : (
              <W.EmptyState
                title="Component not found"
                description="Choose a component from the navigation."
                action={
                  <W.Link href="#/components/button">Open the library</W.Link>
                }
              />
            )}
          </main>
        </div>
      </W.NotificationProvider>
    </W.WardrobeProvider>
  );
}
