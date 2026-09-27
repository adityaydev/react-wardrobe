import { NavigationLink } from "./navigation-link";
import { Documentation } from "./docs";
import pkg from "../package.json";
import "../src/styles.css";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Layers,
  SlidersHorizontal,
  Bell,
  LayoutGrid,
  Plus,
} from "lucide-react";
import {
  WardrobeProvider,
  NotificationProvider,
  NotificationCenter,
  useNotifications,
  AppShell,
  Navbar,
  Button,
  Badge,
  Card,
  Inline,
  Stack,
  TextField,
  NumberField,
  Select,
  DatePicker,
  Checkbox,
  Switch,
  Modal,
  Dropdown,
  DataTable,
  Alert,
  type Theme,
  type Accent,
} from "../src";
import "./showcase.css";
function Showcase() {
  const [route, setRoute] = useState(location.hash);
  useEffect(() => {
    const update = () => setRoute(location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const [theme, setTheme] = useState<Theme>("light");
  const [accent, setAccent] = useState<Accent>("amber");
  if (route.startsWith("#/components/") || !route) return <Documentation />;
  return (
    <WardrobeProvider theme={theme} accent={accent}>
      <NotificationProvider>
        <Gallery
          theme={theme}
          setTheme={setTheme}
          accent={accent}
          setAccent={setAccent}
        />
      </NotificationProvider>
    </WardrobeProvider>
  );
}
function Gallery({
  theme,
  setTheme,
  accent,
  setAccent,
}: {
  theme: Theme;
  setTheme: (v: Theme) => void;
  accent: Accent;
  setAccent: (v: Accent) => void;
}) {
  const { notify } = useNotifications();
  return (
    <AppShell
      navigation={
        <Navbar
          brand={
            <>
              <span className="brand-mark">w.</span> wardrobe
              <span className="brand-sub">A REACT DESIGN SYSTEM</span>
            </>
          }
          items={[
            {
              id: "overview",
              label: "The collection",
              href: "#overview",
              icon: <LayoutGrid size={17} />,
            },
            {
              id: "controls",
              label: "Inputs & controls",
              href: "#controls",
              icon: <SlidersHorizontal size={17} />,
            },
            {
              id: "patterns",
              label: "Layouts & data",
              href: "#patterns",
              icon: <Layers size={17} />,
            },
            {
              id: "feedback",
              label: "Feedback & motion",
              href: "#feedback",
              icon: <Bell size={17} />,
            },
          ]}
          footer={
            <>
              <Badge tone="accent">v{pkg.version} · Preview</Badge>
              <p>
                Considered details.
                <br />
                Consistent by design.
              </p>
            </>
          }
        />
      }
      topbar={
        <>
          <NavigationLink href="#/components/button">
            Component documentation
          </NavigationLink>
          <Inline>
            <Switch
              isSelected={theme === "dark"}
              onChange={(v) => setTheme(v ? "dark" : "light")}
            >
              Dark mode
            </Switch>
            <NotificationCenter />
          </Inline>
        </>
      }
    >
      <div className="collection">
        <section className="hero" id="overview">
          <div>
            <div className="kicker">
              <span /> A WARDROBE FOR YOUR INTERFACE
            </div>
            <h1>
              Good interfaces
              <br />
              have <em>good bones.</em>
            </h1>
            <p>
              A considered collection of everyday components.
              <br />
              Expressive enough to stand out. Consistent enough to belong.
            </p>
            <Inline>
              <Button
                onPress={() =>
                  document
                    .getElementById("controls")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                icon={<ArrowUpRight size={17} />}
              >
                Explore the collection
              </Button>
              <Badge>React + TypeScript</Badge>
            </Inline>
          </div>
          <div className="hero-object" aria-hidden="true">
            <div className="paper paper-back" />
            <div className="paper paper-middle" />
            <div className="paper paper-front">
              <span className="mini-label">THE ESSENTIALS / 001</span>
              <div className="object-letter">
                Aa<span>↗</span>
              </div>
              <div className="swatches">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="object-bottom">
                A little character.
                <br />
                Everywhere.
              </div>
            </div>
          </div>
        </section>
        <div className="principles">
          <span>
            <b>01</b> One visual language
          </span>
          <span>
            <b>02</b> Accessible foundations
          </span>
          <span>
            <b>03</b> Made to make your own
          </span>
        </div>
        <section className="specimen" id="controls">
          <header>
            <div className="kicker">01 / THE EVERYDAY</div>
            <h2>Small details. Big difference.</h2>
            <p>Shared controls with a complete family of states.</p>
          </header>
          <div className="specimen-grid">
            <Card>
              <div className="card-heading">
                <h3>Actions with intention</h3>
                <Badge>Button</Badge>
              </div>
              <Stack>
                <Inline>
                  <Button
                    icon={<Plus size={16} />}
                    onPress={() =>
                      notify({
                        title: "Your changes are saved",
                        tone: "success",
                      })
                    }
                  >
                    Create something
                  </Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Subtle action ↗</Button>
                </Inline>
                <Inline>
                  <Button loading>Saving</Button>
                  <Button isDisabled>Unavailable</Button>
                  <Dropdown
                    trigger={<Button variant="secondary">More actions</Button>}
                    items={[
                      { id: "copy", label: "Duplicate item" },
                      { id: "archive", label: "Archive item" },
                    ]}
                    onAction={(id) => notify({ title: `Demo action: ${id}` })}
                  />
                </Inline>
                <pre>
                  {
                    '<Button variant="primary" onPress={save}>\n  Save changes\n</Button>'
                  }
                </pre>
              </Stack>
            </Card>
            <Card>
              <div className="card-heading">
                <h3>A theme of your own</h3>
                <Badge>Tokens</Badge>
              </div>
              <Select
                label="Accent palette"
                selectedKey={accent}
                onSelectionChange={(key) => setAccent(key as Accent)}
                options={[
                  { id: "amber", label: "Amber · warm & expressive" },
                  { id: "sage", label: "Sage · quiet confidence" },
                  { id: "iris", label: "Iris · a fresh perspective" },
                ]}
              />
              <p className="muted">
                Color, typography, spacing, depth and motion are defined once.
                Every component follows.
              </p>
              <Inline>
                <Badge tone="success">Ready</Badge>
                <Badge tone="warning">Needs attention</Badge>
                <Badge tone="danger">Action required</Badge>
              </Inline>
            </Card>
            <Card className="form-card">
              <div className="card-heading">
                <h3>Forms that feel natural</h3>
                <Badge>Accessible inputs</Badge>
              </div>
              <div className="form-demo">
                <TextField
                  label="Full name"
                  placeholder="e.g. Alex Morgan"
                  description="Visible labels. Clear guidance."
                />
                <Select
                  label="Appointment type"
                  placeholder="Choose a type"
                  options={[
                    {
                      id: "consult",
                      label: "Consultation",
                      description: "A little time to talk",
                    },
                    { id: "review", label: "Follow-up review" },
                    { id: "procedure", label: "Procedure" },
                  ]}
                />
                <DatePicker label="Preferred date" />
                <NumberField
                  label="Duration (minutes)"
                  defaultValue={30}
                  minValue={15}
                  maxValue={120}
                  step={15}
                />
              </div>
              <Inline>
                <Checkbox defaultSelected>Send a reminder</Checkbox>
                <Switch defaultSelected>Accept new bookings</Switch>
              </Inline>
            </Card>
            <Card>
              <div className="card-heading">
                <h3>A tidy toolbar</h3>
                <Badge>hideLabel</Badge>
              </div>
              <p className="muted">
                Selects with <code>hideLabel</code> keep an accessible name
                but drop the stacked visible label, so they sit flush with
                plain buttons in the same row.
              </p>
              <Inline className="toolbar-demo">
                <Select
                  label="Branch"
                  hideLabel
                  placeholder="All branches"
                  options={[
                    { id: "all", label: "All branches" },
                    {
                      id: "north",
                      label: "North Campus Multi Speciality Branch",
                    },
                    { id: "south", label: "South Campus" },
                  ]}
                />
                <Select
                  label="Status"
                  hideLabel
                  placeholder="Any status"
                  options={[
                    { id: "any", label: "Any status" },
                    { id: "open", label: "Open" },
                    { id: "closed", label: "Closed" },
                  ]}
                />
                <Button variant="secondary">Export</Button>
              </Inline>
            </Card>
          </div>
        </section>
        <section className="specimen" id="patterns">
          <header>
            <div className="kicker">02 / BRING IT TOGETHER</div>
            <h2>Order, without the ordinary.</h2>
            <p>Semantic tables, purposeful hierarchy, and space to breathe.</p>
          </header>
          <Card>
            <div className="card-heading">
              <div>
                <h3>The work ahead</h3>
                <p className="muted">
                  Fictional records · click a column heading to sort
                </p>
              </div>
              <Modal
                trigger={
                  <Button variant="secondary">Open example dialog</Button>
                }
                title="A focused moment"
                description="Keyboard focus stays here until you close the dialog."
              >
                <Stack>
                  <TextField
                    label="Collection name"
                    placeholder="My next project"
                  />
                  <Alert title="Ready to reuse">
                    This dialog shares its controls and tokens with the rest of
                    the library.
                  </Alert>
                </Stack>
              </Modal>
            </div>
            <DataTable
              caption="Example appointments"
              rowKey={(r) => r.name}
              rows={[
                {
                  name: "Alex Morgan",
                  type: "Consultation",
                  time: "09:30",
                  status: "Confirmed",
                },
                {
                  name: "Jamie Patel",
                  type: "Follow-up",
                  time: "10:15",
                  status: "Waiting",
                },
                {
                  name: "Taylor Shah",
                  type: "Review",
                  time: "11:00",
                  status: "Confirmed",
                },
              ]}
              columns={[
                {
                  id: "name",
                  header: "Name",
                  cell: (r) => <strong>{r.name}</strong>,
                  sortValue: (r) => r.name,
                },
                { id: "type", header: "Visit type", cell: (r) => r.type },
                {
                  id: "time",
                  header: "Time",
                  cell: (r) => r.time,
                  sortValue: (r) => r.time,
                },
                {
                  id: "status",
                  header: "Status",
                  cell: (r) => (
                    <Badge
                      tone={r.status === "Confirmed" ? "success" : "warning"}
                    >
                      {r.status}
                    </Badge>
                  ),
                },
              ]}
            />
          </Card>
        </section>
        <section className="specimen" id="feedback">
          <header>
            <div className="kicker">03 / KEEP PEOPLE IN THE LOOP</div>
            <h2>A gentle nudge. At the right time.</h2>
            <p>
              Live announcements, an inbox, and sound only when you enable it.
            </p>
          </header>
          <Card>
            <Inline>
              <Button
                onPress={() =>
                  notify({
                    title: "A new appointment just arrived",
                    description:
                      "Simulated event · connect your own authenticated event source.",
                    tone: "success",
                  })
                }
              >
                Simulate a live event
              </Button>
              <NotificationCenter />
            </Inline>
            <p className="muted">
              Open the bell to enable sound. Reduced-motion preferences are
              respected throughout the library.
            </p>
            <Alert tone="info" title="Designed for real products">
              Your application owns authentication, tenant isolation and event
              delivery. Wardrobe owns the presentation.
            </Alert>
          </Card>
        </section>
        <footer className="collection-footer">
          <strong>wardrobe.</strong>
          <span>Build something that feels considered.</span>
          <span>MIT licensed · React</span>
        </footer>
      </div>
    </AppShell>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Showcase />
  </React.StrictMode>,
);
