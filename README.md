# React Wardrobe

A reusable React + TypeScript design system with warm editorial styling, accessible React Aria controls, theme tokens, and optional notification sound. Version 0.2 is a preview; it has not been published to npm or integrated into Clinic Management.

## Develop

Node 22.12+ required (Node 24 LTS recommended).

```sh
npm ci
npm run dev                 # http://localhost:6010 — full component documentation
npm run storybook           # http://localhost:6011
npm run check               # types, behavioral tests, package build
npm run build:showcase       # generates API + usage examples and builds docs
npm run build:storybook
```

Docker: `docker compose up --build`, then open port 6010. The container serves the showcase on internal port 80. Port 6000 is browser-restricted, so development uses 6010 and 6011.

## Consume locally

Run `npm pack` here, then install the resulting `.tgz` in your React app. The package name is provisional until registry availability and ownership are checked. Publication is a separate release step.

```tsx
import {
  WardrobeProvider,
  NotificationProvider,
  Button,
  TextField,
  Select,
  NumberField,
  DatePicker,
  NotificationCenter,
} from "react-wardrobe";
import "react-wardrobe/styles.css";

export function App() {
  return (
    <WardrobeProvider theme="light" accent="amber" locale="en-IN">
      <NotificationProvider>
        <TextField label="Full name" name="name" isRequired />
        <Select label="Visit" options={[{ id: "review", label: "Review" }]} />
        <DatePicker label="Appointment date" />
        <NumberField
          label="Minutes"
          minValue={15}
          step={15}
          defaultValue={30}
        />
        <Button onPress={() => console.log("save")}>Save</Button>
        <NotificationCenter />
      </NotificationProvider>
    </WardrobeProvider>
  );
}
```

ES module package; React and React DOM are peer dependencies. Import the stylesheet once. No Tailwind setup is required; it can coexist with Tailwind. Styles are scoped under `.rw-root`. Use `onPress` on buttons, `onChange` on fields, and `selectedKey` / `onSelectionChange` on Select. Accessible field labels are required. Use `parseDate('2026-09-24')` for date-only values; do not convert appointment time zones through date-only controls.

## Components

The searchable documentation site has **63 component pages**, each with a live example, copyable usage, generated prop reference and interaction notes. Open `http://localhost:6010/#/components/button`; the original design showcase is at `/#showcase`. Storybook mirrors all component examples by family. See [COVERAGE.md](COVERAGE.md) for the complete inventory and explicit scope boundaries.


- Controls: Button, TextField (including multiline), NumberField, Select, Checkbox, Switch, Calendar, DatePicker.
- Overlays: Modal, Dropdown, Tooltip.
- Feedback: Alert, Badge, Skeleton, EmptyState, NotificationProvider, NotificationCenter, useNotifications.
- Structure: AppShell, Navbar, PageHeader, Toolbar, FormSection, Card, Inline, Stack.
- DataTable: lightweight semantic sorting. DataGrid adds client-side filtering, sorting, pagination, page selection, column visibility and expandable rows.
- Advanced inputs: ComboBox (including free-text autocomplete), MultiSelect, SearchField, RadioGroup, CheckboxGroup, Slider, FileUpload, ToggleButton and SegmentedControl.
- Date/time: DateField, TimeField, RangeCalendar and DateRangePicker.
- Navigation: Tabs, Breadcrumbs, Pagination, Accordion, Link and Steps.
- Additional overlays: Drawer, ConfirmDialog, Popover and CommandPalette.
- Collections and feedback: ListBox, Tree, ProgressBar, Meter, Spinner, Avatar, AvatarGroup, TagGroup, Separator, Kbd and CodeBlock.
- Form wraps React Aria form validation; date utilities are re-exported for convenience.

See `stories/` and `showcase/catalogue.tsx` for runnable examples and `showcase/main.tsx` for a complete composition. Generated TypeScript declarations describe all props.

## Theming

Provider options: `theme="light" | "dark"`, `accent="amber" | "sage" | "iris"`, `density="comfortable" | "compact"`, and an Intl locale. Control these props in your application to persist preferences. Shared tokens in `src/styles.css` cover color, spacing, control height, corners, depth and motion. For custom brands, override the same variables on both the root and portalled `.rw-root` overlays, for example `.rw-root[data-accent="amber"] { --rw-accent: #87571e; }`. Recheck contrast after changes.

## Live notifications

```tsx
const { notify, enableSound, mute, notifications } = useNotifications();
notify({ id: "event-123", title: "Appointment updated", tone: "success" });
// Call enableSound() from a user click; browsers require user activation.
```

Pass a stable `source` function to NotificationProvider: `(receive) => unsubscribe`. Your application owns authenticated SSE/WebSocket delivery, reconnects, authorization and tenant filtering. The optional `channel` enables same-origin BroadcastChannel mirroring; scope its name to the authenticated tenant AND session, and remount the provider on account changes. Do not put patient details or secrets in event titles/descriptions. Mirrored events are silent; simultaneous server delivery to multiple tabs is not guaranteed to produce only one sound globally. IDs deduplicate the most recent 500 events; inbox is bounded to 50 items and three visible toasts. This is an in-memory presentation layer, not durable delivery or a clinical audit log.

Sound is off by default and generated locally with Web Audio after explicit opt-in. Toasts announce through a live region, pause dismissal during focus/hover and remain in the inbox. Essential tasks must never depend on hearing a sound or seeing a transient toast.

## Release

Run all checks, browser accessibility tests and both documentation builds. Inspect `npm pack --dry-run`, install the tarball in a consuming application, verify the intended npm account and package name, then publish deliberately. The package contains no clinic backend code. React 18 is declared compatible but only the installed React 19 development environment is currently tested.

## Documentation maintenance

Run `npm run docs:api` after API/example changes. It extracts prop types/defaults from TypeScript and complete usage examples from the actual runnable catalogue. `npm run build:showcase` runs this automatically. Styling and examples share the package implementation. The original showcase is a composition demo, not a separate component implementation.

## Collection and upload contracts

DataGrid is a semantic HTML table (despite its convenience name), not a spreadsheet ARIA grid. It operates on supplied client-side rows; page selection affects visible rows and is retained when filtering. Use `selection`/`onSelectionChange` for controlled selection. `rowKey` must be stable and unique. Data fetching, server paging and persistence remain consumer responsibilities.

FileUpload selects files and checks accepted types/extensions and size; `onFilesChange` receives local File objects. It does not send files over a network. Apply server validation and upload progress in the consuming application.
