import { useState, type ReactElement } from "react";
import * as W from "../src";
export interface ComponentDoc {
  name: string;
  id: string;
  category: string;
  description: string;
  notes: string;
  code: string;
  render: () => ReactElement;
}
const people = [
  { id: "1", name: "Alex Morgan", role: "Designer" },
  { id: "2", name: "Jamie Patel", role: "Developer" },
  { id: "3", name: "Taylor Shah", role: "Product lead" },
  { id: "4", name: "Riley Chen", role: "Researcher" },
  { id: "5", name: "Sam Ellis", role: "Engineer" },
];
const columns: W.Column<(typeof people)[number]>[] = [
  { id: "name", header: "Name", cell: (r) => r.name, sortValue: (r) => r.name },
  { id: "role", header: "Role", cell: (r) => r.role, sortValue: (r) => r.role },
];
function PaginationExample() {
  const [page, setPage] = useState(1);
  return <W.Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
function TagsExample() {
  const [items, setItems] = useState([
    { id: "one", label: "Design" },
    { id: "two", label: "Engineering" },
    { id: "three", label: "Product" },
  ]);
  return (
    <W.TagGroup
      label="Topics"
      items={items}
      onRemove={(keys) => setItems(items.filter((i) => !keys.has(i.id)))}
    />
  );
}

function ExampleButton() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      <W.Button
        onPress={() => notify({ title: "Changes saved", tone: "success" })}
      >
        Save changes
      </W.Button>
      <W.Button variant="secondary">Secondary</W.Button>
      <W.Button variant="ghost">Ghost</W.Button>
      <W.Button variant="danger">Delete</W.Button>
      <W.Button loading>Saving</W.Button>
      <W.Button isDisabled>Disabled</W.Button>
    </W.Inline>
  );
}
function ExampleToggleButton() {
  const { notify } = W.useNotifications();
  return <W.ToggleButton>Pin this item</W.ToggleButton>;
}
function ExampleSegmentedControl() {
  const { notify } = W.useNotifications();
  return (
    <W.SegmentedControl
      label="View"
      selectionMode="single"
      defaultSelectedKeys={["alpha"]}
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
    />
  );
}
function ExampleTextField() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <W.TextField label="Display name" placeholder="Alex Morgan" />
      <W.TextField label="Notes" multiline />
      <W.TextField label="Email" errorMessage="Enter a valid address" />
    </W.Stack>
  );
}
function ExampleNumberField() {
  const { notify } = W.useNotifications();
  return (
    <W.NumberField
      label="Quantity"
      defaultValue={2}
      minValue={1}
      maxValue={10}
      step={1}
    />
  );
}
function ExampleSelect() {
  const { notify } = W.useNotifications();
  return (
    <W.Select
      label="Team"
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      defaultSelectedKey="alpha"
    />
  );
}
function ExampleComboBox() {
  const { notify } = W.useNotifications();
  return (
    <W.ComboBox
      label="Search teams"
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      placeholder="Start typing…"
    />
  );
}
function ExampleMultiSelect() {
  const { notify } = W.useNotifications();
  return (
    <W.MultiSelect
      label="Teams"
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      placeholder="Choose teams"
    />
  );
}
function ExampleSearchField() {
  const { notify } = W.useNotifications();
  return (
    <W.SearchField label="Search library" placeholder="Search components…" />
  );
}
function ExampleCheckbox() {
  const { notify } = W.useNotifications();
  return <W.Checkbox defaultSelected>Send a reminder</W.Checkbox>;
}
function ExampleCheckboxGroup() {
  const { notify } = W.useNotifications();
  return (
    <W.CheckboxGroup
      label="Permissions"
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      defaultValue={["alpha"]}
    />
  );
}
function ExampleRadioGroup() {
  const { notify } = W.useNotifications();
  return (
    <W.RadioGroup
      label="Priority"
      options={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      defaultValue="alpha"
    />
  );
}
function ExampleSwitch() {
  const { notify } = W.useNotifications();
  return <W.Switch defaultSelected>Accept bookings</W.Switch>;
}
function ExampleSlider() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <W.Slider label="Volume" defaultValue={40} />
      <W.Slider
        label="Budget range"
        defaultValue={[20, 80]}
        thumbLabels={["Minimum budget", "Maximum budget"]}
      />
    </W.Stack>
  );
}
function ExampleFileUpload() {
  const { notify } = W.useNotifications();
  return (
    <W.FileUpload
      label="Attachments"
      accept=".pdf,image/*"
      multiple
      onFilesChange={(files) =>
        notify({ title: `${files.length} files selected` })
      }
    />
  );
}
function ExampleCalendar() {
  const { notify } = W.useNotifications();
  return <W.Calendar aria-label="Choose date" />;
}
function ExampleDatePicker() {
  const { notify } = W.useNotifications();
  return <W.DatePicker label="Appointment date" />;
}
function ExampleDateField() {
  const { notify } = W.useNotifications();
  return <W.DateField label="Date of birth" />;
}
function ExampleTimeField() {
  const { notify } = W.useNotifications();
  return <W.TimeField label="Start time" defaultValue={new W.Time(9, 30)} />;
}
function ExampleRangeCalendar() {
  const { notify } = W.useNotifications();
  return <W.RangeCalendar aria-label="Select travel dates" />;
}
function ExampleDateRangePicker() {
  const { notify } = W.useNotifications();
  return <W.DateRangePicker label="Travel dates" />;
}
function ExampleTabs() {
  const { notify } = W.useNotifications();
  return (
    <W.Tabs
      label="Project sections"
      items={[
        {
          id: "overview",
          label: "Overview",
          content: <p>Everything in one place.</p>,
        },
        {
          id: "activity",
          label: "Activity",
          content: <p>Your latest updates appear here.</p>,
        },
        { id: "locked", label: "Locked", disabled: true, content: null },
      ]}
    />
  );
}
function ExampleBreadcrumbs() {
  const { notify } = W.useNotifications();
  return (
    <W.Breadcrumbs
      items={[
        { id: "home", label: "Home", href: "#/" },
        { id: "library", label: "Library", href: "#/components/button" },
        { id: "current", label: "Current page" },
      ]}
    />
  );
}
function ExamplePagination() {
  const { notify } = W.useNotifications();
  return <PaginationExample />;
}
function ExampleAccordion() {
  const { notify } = W.useNotifications();
  return (
    <W.Accordion
      allowsMultipleExpanded
      items={[
        {
          id: "one",
          title: "How does theming work?",
          content: <p>All components share the same design tokens.</p>,
        },
        {
          id: "two",
          title: "Can I use this with Tailwind?",
          content: <p>Yes. The library ships its own scoped stylesheet.</p>,
        },
      ]}
    />
  );
}
function ExampleLink() {
  const { notify } = W.useNotifications();
  return <W.Link href="#/components/button">Explore buttons →</W.Link>;
}
function ExampleSteps() {
  const { notify } = W.useNotifications();
  return <W.Steps items={["Details", "Review", "Complete"]} current={1} />;
}
function ExampleModal() {
  const { notify } = W.useNotifications();
  return (
    <W.Modal title="Project settings" trigger={<W.Button>Open modal</W.Button>}>
      <W.TextField label="Project name" />
    </W.Modal>
  );
}
function ExampleDrawer() {
  const { notify } = W.useNotifications();
  return (
    <W.Drawer title="Record details" trigger={<W.Button>Open drawer</W.Button>}>
      <W.Stack>
        <W.TextField label="Display name" />
        <W.TextField label="Notes" multiline />
      </W.Stack>
    </W.Drawer>
  );
}
function ExampleConfirmDialog() {
  const { notify } = W.useNotifications();
  return (
    <W.ConfirmDialog
      trigger={<W.Button variant="danger">Remove record</W.Button>}
      title="Remove this record?"
      description="This example only shows a notification."
      confirmLabel="Remove"
      danger
      onConfirm={() => notify({ title: "Example record removed" })}
    />
  );
}
function ExamplePopover() {
  const { notify } = W.useNotifications();
  return (
    <W.Popover
      title="Display options"
      trigger={<W.Button variant="secondary">Display options</W.Button>}
    >
      <W.Switch defaultSelected>Show descriptions</W.Switch>
    </W.Popover>
  );
}
function ExampleDropdown() {
  const { notify } = W.useNotifications();
  return (
    <W.Dropdown
      trigger={<W.Button variant="secondary">Actions</W.Button>}
      items={[
        { id: "duplicate", label: "Duplicate" },
        { id: "archive", label: "Archive" },
        { id: "delete", label: "Delete", danger: true },
      ]}
      onAction={(key) => notify({ title: `Selected ${key}` })}
    />
  );
}
function ExampleTooltip() {
  const { notify } = W.useNotifications();
  return (
    <W.Tooltip content="Save your current changes">
      <W.Button variant="secondary">Hover or focus me</W.Button>
    </W.Tooltip>
  );
}
function ExampleCommandPalette() {
  const { notify } = W.useNotifications();
  return (
    <W.CommandPalette
      trigger={<W.Button>Search commands</W.Button>}
      commands={[
        {
          id: "new",
          label: "Create project",
          description: "Start something new",
          onAction: () => notify({ title: "Create project selected" }),
        },
        {
          id: "settings",
          label: "Open settings",
          onAction: () => notify({ title: "Settings selected" }),
        },
      ]}
    />
  );
}
function ExampleDataTable() {
  const { notify } = W.useNotifications();
  return (
    <W.DataTable
      caption="Team"
      rows={people}
      columns={columns}
      rowKey={(r) => r.id}
    />
  );
}
function ExampleDataGrid() {
  const { notify } = W.useNotifications();
  return (
    <W.DataGrid
      caption="Team"
      rows={people}
      columns={columns}
      rowKey={(r) => r.id}
      rowLabel={(r) => r.name}
      searchText={(r) => `${r.name} ${r.role}`}
      pageSize={3}
      renderExpanded={(r) => <p>{r.name} · Additional record details.</p>}
    />
  );
}
function ExampleListBox() {
  const { notify } = W.useNotifications();
  return (
    <W.ListBox
      label="Projects"
      items={[
        { id: "alpha", label: "Alpha" },
        { id: "beta", label: "Beta" },
        { id: "gamma", label: "Gamma", disabled: true },
      ]}
      selectionMode="multiple"
    />
  );
}
function ExampleTree() {
  const { notify } = W.useNotifications();
  return (
    <W.Tree
      label="Files"
      selectionMode="single"
      items={[
        {
          id: "src",
          label: "Source",
          children: [
            { id: "components", label: "Components" },
            { id: "tokens", label: "Tokens" },
          ],
        },
        { id: "readme", label: "README.md" },
      ]}
    />
  );
}
function ExampleAlert() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <W.Alert title="Changes saved" tone="success">
        Your preferences are up to date.
      </W.Alert>
      <W.Alert title="Action needed" tone="danger">
        Check the highlighted fields.
      </W.Alert>
    </W.Stack>
  );
}
function ExampleBadge() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      <W.Badge>Draft</W.Badge>
      <W.Badge tone="success">Ready</W.Badge>
      <W.Badge tone="warning">Pending</W.Badge>
      <W.Badge tone="danger">Failed</W.Badge>
    </W.Inline>
  );
}
function ExampleProgressBar() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <W.ProgressBar label="Upload progress" value={65} />
      <W.ProgressBar label="Preparing" isIndeterminate />
    </W.Stack>
  );
}
function ExampleMeter() {
  const { notify } = W.useNotifications();
  return <W.Meter label="Storage used" value={42} maxValue={100} />;
}
function ExampleSpinner() {
  const { notify } = W.useNotifications();
  return <W.Spinner label="Loading records" />;
}
function ExampleSkeleton() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <W.Skeleton height={24} width="70%" />
      <W.Skeleton />
      <W.Skeleton width="85%" />
    </W.Stack>
  );
}
function ExampleEmptyState() {
  const { notify } = W.useNotifications();
  return (
    <W.EmptyState
      title="No projects yet"
      description="Create your first project to get started."
      action={
        <W.Button onPress={() => notify({ title: "Create project selected" })}>
          Create project
        </W.Button>
      }
    />
  );
}
function ExampleAvatar() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      <W.Avatar name="Alex Morgan" size="sm" />
      <W.Avatar name="Jamie Patel" />
      <W.Avatar name="Taylor Shah" size="lg" />
    </W.Inline>
  );
}
function ExampleAvatarGroup() {
  const { notify } = W.useNotifications();
  return (
    <W.AvatarGroup
      people={[
        { name: "Alex Morgan" },
        { name: "Jamie Patel" },
        { name: "Taylor Shah" },
        { name: "Riley Chen" },
      ]}
      max={3}
    />
  );
}
function ExampleTagGroup() {
  const { notify } = W.useNotifications();
  return <TagsExample />;
}
function ExampleNotificationCenter() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      <W.Button
        onPress={() =>
          notify({
            title: "New update",
            description: "A simulated event from this example.",
            tone: "success",
          })
        }
      >
        Send notification
      </W.Button>
      <W.NotificationCenter />
    </W.Inline>
  );
}
function ExampleCodeBlock() {
  const { notify } = W.useNotifications();
  return (
    <W.CodeBlock
      code={`import { Button } from "react-wardrobe";\n<Button>Save</Button>`}
    />
  );
}
function ExampleKbd() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      Open search <W.Kbd>⌘ K</W.Kbd>
    </W.Inline>
  );
}
function ExampleSeparator() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack>
      <span>Section one</span>
      <W.Separator />
      <span>Section two</span>
    </W.Stack>
  );
}
function ExampleCard() {
  const { notify } = W.useNotifications();
  return (
    <W.Card>
      <h3>A considered surface</h3>
      <p>Group related content with a shared border, radius and elevation.</p>
    </W.Card>
  );
}
function ExampleStack() {
  const { notify } = W.useNotifications();
  return (
    <W.Stack gap="lg">
      <W.Button>First</W.Button>
      <W.Button variant="secondary">Second</W.Button>
    </W.Stack>
  );
}
function ExampleInline() {
  const { notify } = W.useNotifications();
  return (
    <W.Inline>
      <W.Badge>One</W.Badge>
      <W.Badge>Two</W.Badge>
      <W.Button size="sm">Action</W.Button>
    </W.Inline>
  );
}
function ExamplePageHeader() {
  const { notify } = W.useNotifications();
  return (
    <W.PageHeader
      eyebrow="WORKSPACE"
      title="Your projects"
      description="Everything you are working on."
      actions={<W.Button>Create project</W.Button>}
    />
  );
}
function ExampleToolbar() {
  const { notify } = W.useNotifications();
  return (
    <W.Toolbar
      label="Collection actions"
      actions={<W.Button>New item</W.Button>}
    >
      <W.Badge>12 items</W.Badge>
    </W.Toolbar>
  );
}
function ExampleFormSection() {
  const { notify } = W.useNotifications();
  return (
    <W.FormSection title="Contact details" description="How we can reach you.">
      <W.TextField label="Full name" />
      <W.TextField label="Email" type="email" />
    </W.FormSection>
  );
}
function ExampleNavbar() {
  const { notify } = W.useNotifications();
  return (
    <div style={{ height: 340 }}>
      <W.Navbar
        brand="Acme workspace"
        activeId="home"
        items={[
          { id: "home", label: "Overview", href: "#/components/navbar" },
          { id: "projects", label: "Projects", href: "#/components/data-grid" },
        ]}
        footer="Your workspace"
      />
    </div>
  );
}
function ExampleAppShell() {
  const { notify } = W.useNotifications();
  return (
    <W.Alert title="A complete application frame">
      The live showcase uses AppShell. Open{" "}
      <W.Link href="#showcase">the showcase</W.Link> to explore its navigation,
      topbar, skip link and main landmark.
    </W.Alert>
  );
}
function ExampleWardrobeProvider() {
  const { notify } = W.useNotifications();
  return (
    <W.WardrobeProvider theme="dark" accent="iris">
      <W.Card>
        <W.Stack>
          <W.TextField label="A different theme" />
          <W.Button>Shared tokens</W.Button>
        </W.Stack>
      </W.Card>
    </W.WardrobeProvider>
  );
}
function ExampleNotificationProvider() {
  const { notify } = W.useNotifications();
  return (
    <W.Alert title="Provider integration">
      This catalogue is already wrapped in NotificationProvider. Open{" "}
      <W.Link href="#/components/notification-center">
        NotificationCenter
      </W.Link>{" "}
      to send a simulated event.
    </W.Alert>
  );
}
function ExampleForm() {
  const { notify } = W.useNotifications();
  return (
    <W.Form
      onSubmit={(e) => {
        e.preventDefault();
        notify({ title: "Form submitted" });
      }}
    >
      <W.Stack>
        <W.TextField label="Project name" name="project" isRequired />
        <W.Button type="submit">Submit</W.Button>
      </W.Stack>
    </W.Form>
  );
}
export const catalogue: ComponentDoc[] = [
  {
    name: "Button",
    id: "button",
    category: "Actions",
    description: "Actions with clear emphasis and reliable pending states.",
    notes:
      "Use onPress for mouse, touch and keyboard. Loading prevents duplicate activation while preserving focus. Icon-only buttons need aria-label.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline><W.Button onPress={()=>notify({title:"Changes saved",tone:"success"})}>Save changes</W.Button><W.Button variant="secondary">Secondary</W.Button><W.Button variant="ghost">Ghost</W.Button><W.Button variant="danger">Delete</W.Button><W.Button loading>Saving</W.Button><W.Button isDisabled>Disabled</W.Button></W.Inline>',
    render: () => <ExampleButton />,
  },
  {
    name: "ToggleButton",
    id: "toggle-button",
    category: "Actions",
    description: "A persistent on/off action.",
    notes:
      "Use isSelected/onChange for a controlled toggle; the pressed state is announced.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.ToggleButton>Pin this item</W.ToggleButton>',
    render: () => <ExampleToggleButton />,
  },
  {
    name: "SegmentedControl",
    id: "segmented-control",
    category: "Actions",
    description: "Compact selection between related views.",
    notes:
      "Use single or multiple selection. Arrow keys move between enabled options.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.SegmentedControl label="View" selectionMode="single" defaultSelectedKeys={["alpha"]} options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]}/>',
    render: () => <ExampleSegmentedControl />,
  },
  {
    name: "TextField",
    id: "text-field",
    category: "Inputs",
    description: "Text, multiline input and visible validation.",
    notes:
      "Connect value/onChange to application state. Labels remain visible; errors are associated with the input.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><W.TextField label="Display name" placeholder="Alex Morgan"/><W.TextField label="Notes" multiline/><W.TextField label="Email" errorMessage="Enter a valid address"/></W.Stack>',
    render: () => <ExampleTextField />,
  },
  {
    name: "NumberField",
    id: "number-field",
    category: "Inputs",
    description: "Locale-aware numeric entry with custom steppers.",
    notes:
      "Arrow keys increment or decrement. minValue/maxValue constrain the value; formatOptions supports currency and percentages.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.NumberField label="Quantity" defaultValue={2} minValue={1} maxValue={10} step={1}/>',
    render: () => <ExampleNumberField />,
  },
  {
    name: "Select",
    id: "select",
    category: "Inputs",
    description: "Choose one option from a custom menu.",
    notes:
      "Arrow keys and typeahead navigate; Enter selects and Escape closes. Use stable option IDs.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Select label="Team" options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} defaultSelectedKey="alpha"/>',
    render: () => <ExampleSelect />,
  },
  {
    name: "ComboBox",
    id: "combo-box",
    category: "Inputs",
    description: "Search and select an option with keyboard support.",
    notes:
      "Filtering is locale-sensitive. Use selectedKey/onSelectionChange to control selection. Use allowsCustomValue for free-text autocomplete.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.ComboBox label="Search teams" options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} placeholder="Start typing\u2026"/>',
    render: () => <ExampleComboBox />,
  },
  {
    name: "MultiSelect",
    id: "multi-select",
    category: "Inputs",
    description: "Select several values from a custom menu.",
    notes:
      "Use value/onChange for controlled multiple selection. Disabled options cannot be chosen. Escape closes the list.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.MultiSelect label="Teams" options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} placeholder="Choose teams"/>',
    render: () => <ExampleMultiSelect />,
  },
  {
    name: "SearchField",
    id: "search-field",
    category: "Inputs",
    description: "Search text with a built-in clear action.",
    notes:
      "Use onChange to filter and onSubmit to run a search. Escape clears the input.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.SearchField label="Search library" placeholder="Search components\u2026"/>',
    render: () => <ExampleSearchField />,
  },
  {
    name: "Checkbox",
    id: "checkbox",
    category: "Inputs",
    description: "Independent checked, unchecked and mixed states.",
    notes:
      "Use isIndeterminate for partial selection and isSelected/onChange for controlled state.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Checkbox defaultSelected>Send a reminder</W.Checkbox>',
    render: () => <ExampleCheckbox />,
  },
  {
    name: "CheckboxGroup",
    id: "checkbox-group",
    category: "Inputs",
    description: "Related independent choices with a shared label.",
    notes:
      "Use value/onChange for arrays of option IDs. Group validation is announced with the options.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.CheckboxGroup label="Permissions" options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} defaultValue={["alpha"]}/>',
    render: () => <ExampleCheckboxGroup />,
  },
  {
    name: "RadioGroup",
    id: "radio-group",
    category: "Inputs",
    description: "Exactly one choice from a visible list.",
    notes:
      "Arrow keys navigate/select; use value/onChange and preserve the group label.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.RadioGroup label="Priority" options={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} defaultValue="alpha"/>',
    render: () => <ExampleRadioGroup />,
  },
  {
    name: "Switch",
    id: "switch",
    category: "Inputs",
    description: "An immediately applied on/off setting.",
    notes: "Keep the label stable when state changes. Use isSelected/onChange.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Switch defaultSelected>Accept bookings</W.Switch>',
    render: () => <ExampleSwitch />,
  },
  {
    name: "Slider",
    id: "slider",
    category: "Inputs",
    description: "Single-value and multi-thumb range selection.",
    notes:
      "Arrow keys adjust each thumb. Give each range thumb a unique label; expose a precise number input when exact entry matters.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><W.Slider label="Volume" defaultValue={40}/><W.Slider label="Budget range" defaultValue={[20,80]} thumbLabels={["Minimum budget","Maximum budget"]}/></W.Stack>',
    render: () => <ExampleSlider />,
  },
  {
    name: "FileUpload",
    id: "file-upload",
    category: "Inputs",
    description: "Keyboard file selection and drag/drop with local validation.",
    notes:
      "Files stay local until your application uploads them. Accept and maxSize validate client-side; servers must independently validate content. This component does not perform uploads.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.FileUpload label="Attachments" accept=".pdf,image/*" multiple onFilesChange={files=>notify({title:`${files.length} files selected`})}/>',
    render: () => <ExampleFileUpload />,
  },
  {
    name: "Calendar",
    id: "calendar",
    category: "Date & time",
    description: "A keyboard-navigable single-date calendar.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Calendar aria-label="Choose date"/>',
    render: () => <ExampleCalendar />,
  },
  {
    name: "DatePicker",
    id: "date-picker",
    category: "Date & time",
    description: "Segmented date entry with a calendar popover.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.DatePicker label="Appointment date"/>',
    render: () => <ExampleDatePicker />,
  },
  {
    name: "DateField",
    id: "date-field",
    category: "Date & time",
    description: "Segmented date entry without a calendar.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.DateField label="Date of birth"/>',
    render: () => <ExampleDateField />,
  },
  {
    name: "TimeField",
    id: "time-field",
    category: "Date & time",
    description: "Localized segmented time entry.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.TimeField label="Start time" defaultValue={new W.Time(9,30)}/>',
    render: () => <ExampleTimeField />,
  },
  {
    name: "RangeCalendar",
    id: "range-calendar",
    category: "Date & time",
    description: "Select a start and end date on a calendar.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.RangeCalendar aria-label="Select travel dates"/>',
    render: () => <ExampleRangeCalendar />,
  },
  {
    name: "DateRangePicker",
    id: "date-range-picker",
    category: "Date & time",
    description: "Two segmented dates with a range-calendar popover.",
    notes:
      "Use @internationalized/date values, not JavaScript Date. Pass minValue, maxValue or isDateUnavailable as appropriate. Arrow keys edit segments or move calendar focus; date-only values have no appointment time zone.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.DateRangePicker label="Travel dates"/>',
    render: () => <ExampleDateRangePicker />,
  },
  {
    name: "Tabs",
    id: "tabs",
    category: "Navigation",
    description: "Switch between related panels without leaving the page.",
    notes:
      'Arrow keys navigate tabs. Use keyboardActivation="manual" for panels with expensive work.',
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Tabs label="Project sections" items={[{id:"overview",label:"Overview",content:<p>Everything in one place.</p>},{id:"activity",label:"Activity",content:<p>Your latest updates appear here.</p>},{id:"locked",label:"Locked",disabled:true,content:null}]}/>',
    render: () => <ExampleTabs />,
  },
  {
    name: "Breadcrumbs",
    id: "breadcrumbs",
    category: "Navigation",
    description: "Show where a page belongs.",
    notes:
      "The final item is current. Supply real hrefs; do not use breadcrumbs as action buttons.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Breadcrumbs items={[{id:"home",label:"Home",href:"#/"},{id:"library",label:"Library",href:"#/components/button"},{id:"current",label:"Current page"}]}/>',
    render: () => <ExampleBreadcrumbs />,
  },
  {
    name: "Pagination",
    id: "pagination",
    category: "Navigation",
    description: "Bounded page navigation for collections.",
    notes:
      "Page numbers are one-based; control page and onPageChange in the consumer.",
    code: "const [page, setPage] = useState(1);\n<W.Pagination page={page} pageCount={12} onPageChange={setPage} />",
    render: () => <ExamplePagination />,
  },
  {
    name: "Accordion",
    id: "accordion",
    category: "Navigation",
    description: "Progressively disclose related content.",
    notes:
      "Disclosure buttons support Enter/Space. allowsMultipleExpanded enables independent sections.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Accordion allowsMultipleExpanded items={[{id:"one",title:"How does theming work?",content:<p>All components share the same design tokens.</p>},{id:"two",title:"Can I use this with Tailwind?",content:<p>Yes. The library ships its own scoped stylesheet.</p>}]}/>',
    render: () => <ExampleAccordion />,
  },
  {
    name: "Link",
    id: "link",
    category: "Navigation",
    description: "A semantic navigation link.",
    notes:
      "Use links for navigation and Button for actions. Set target and rel for external destinations as appropriate.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Link href="#/components/button">Explore buttons \u2192</W.Link>',
    render: () => <ExampleLink />,
  },
  {
    name: "Steps",
    id: "steps",
    category: "Navigation",
    description: "A non-interactive view of workflow progress.",
    notes:
      "current is zero-based. This is an ordered progress indicator; it does not implement wizard navigation or validation.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Steps items={["Details","Review","Complete"]} current={1}/>',
    render: () => <ExampleSteps />,
  },
  {
    name: "Modal",
    id: "modal",
    category: "Overlays",
    description: "A focused task with contained keyboard navigation.",
    notes:
      "Escape dismisses; focus returns to the trigger. Use a Wardrobe Button trigger. Controlled state uses isOpen/onOpenChange.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Modal title="Project settings" trigger={<W.Button>Open modal</W.Button>}><W.TextField label="Project name"/></W.Modal>',
    render: () => <ExampleModal />,
  },
  {
    name: "Drawer",
    id: "drawer",
    category: "Overlays",
    description: "A side panel for contextual work.",
    notes:
      'Same focus containment as a modal. side="start" or "end" follows the document direction.',
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Drawer title="Record details" trigger={<W.Button>Open drawer</W.Button>}><W.Stack><W.TextField label="Display name"/><W.TextField label="Notes" multiline/></W.Stack></W.Drawer>',
    render: () => <ExampleDrawer />,
  },
  {
    name: "ConfirmDialog",
    id: "confirm-dialog",
    category: "Overlays",
    description:
      "An explicit confirmation with asynchronous pending and failure states.",
    notes:
      "onConfirm may return a Promise. The dialog remains open on rejection and prevents dismissal while pending. Application authorization remains outside the component.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.ConfirmDialog trigger={<W.Button variant="danger">Remove record</W.Button>} title="Remove this record?" description="This example only shows a notification." confirmLabel="Remove" danger onConfirm={()=>notify({title:"Example record removed"})}/>',
    render: () => <ExampleConfirmDialog />,
  },
  {
    name: "Popover",
    id: "popover",
    category: "Overlays",
    description: "Anchored interactive content with a labelled dialog.",
    notes:
      "Use for interactive content; Tooltip is for short noninteractive hints. Escape restores trigger focus.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Popover title="Display options" trigger={<W.Button variant="secondary">Display options</W.Button>}><W.Switch defaultSelected>Show descriptions</W.Switch></W.Popover>',
    render: () => <ExamplePopover />,
  },
  {
    name: "Dropdown",
    id: "dropdown",
    category: "Overlays",
    description: "A keyboard-navigable action menu.",
    notes:
      "Use onAction to handle stable item IDs. Menu actions should not contain nested form inputs.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Dropdown trigger={<W.Button variant="secondary">Actions</W.Button>} items={[{id:"duplicate",label:"Duplicate"},{id:"archive",label:"Archive"},{id:"delete",label:"Delete",danger:true}]} onAction={key=>notify({title:`Selected ${key}`})}/>',
    render: () => <ExampleDropdown />,
  },
  {
    name: "Tooltip",
    id: "tooltip",
    category: "Overlays",
    description: "Short help on hover and keyboard focus.",
    notes:
      "Never put required instructions or interactive elements only in a tooltip.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Tooltip content="Save your current changes"><W.Button variant="secondary">Hover or focus me</W.Button></W.Tooltip>',
    render: () => <ExampleTooltip />,
  },
  {
    name: "CommandPalette",
    id: "command-palette",
    category: "Overlays",
    description: "Searchable actions in a focus-managed dialog.",
    notes:
      "Type to filter; arrow keys and Enter choose a command. The consumer owns any global keyboard shortcut to avoid hijacking inputs.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.CommandPalette trigger={<W.Button>Search commands</W.Button>} commands={[{id:"new",label:"Create project",description:"Start something new",onAction:()=>notify({title:"Create project selected"})},{id:"settings",label:"Open settings",onAction:()=>notify({title:"Settings selected"})}]}/>',
    render: () => <ExampleCommandPalette />,
  },
  {
    name: "DataTable",
    id: "data-table",
    category: "Collections",
    description: "A lightweight semantic table with optional sorting.",
    notes:
      "Provide stable unique IDs. Tables retain native table semantics; the richer DataGrid operates on supplied client-side rows. Select-current-page affects visible rows only. Filtering does not discard selection. Virtualization and server queries are not implemented by these wrappers.",
    code: 'const rows = [{ id: "1", name: "Alex", role: "Designer" }];\nconst columns = [{ id: "name", header: "Name", cell: row => row.name, sortValue: row => row.name }];\n\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.DataTable caption="Team" rows={rows} columns={columns} rowKey={r=>r.id}/>',
    render: () => <ExampleDataTable />,
  },
  {
    name: "DataGrid",
    id: "data-grid",
    category: "Collections",
    description:
      "Filtering, sorting, pagination, selection, visibility and expandable rows.",
    notes:
      "Provide stable unique IDs. Tables retain native table semantics; the richer DataGrid operates on supplied client-side rows. Select-current-page affects visible rows only. Filtering does not discard selection. Virtualization and server queries are not implemented by these wrappers.",
    code: 'const rows = [{ id: "1", name: "Alex", role: "Designer" }];\nconst columns = [{ id: "name", header: "Name", cell: row => row.name, sortValue: row => row.name }];\n\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.DataGrid caption="Team" rows={rows} columns={columns} rowKey={r=>r.id} rowLabel={r=>r.name} searchText={r=>`${r.name} ${r.role}`} pageSize={3} renderExpanded={r=><p>{r.name} \u00b7 Additional record details.</p>}/>',
    render: () => <ExampleDataGrid />,
  },
  {
    name: "ListBox",
    id: "list-box",
    category: "Collections",
    description: "A selectable list with typeahead and keyboard navigation.",
    notes:
      "Provide stable unique IDs. Tables retain native table semantics; the richer DataGrid operates on supplied client-side rows. Select-current-page affects visible rows only. Filtering does not discard selection. Virtualization and server queries are not implemented by these wrappers.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.ListBox label="Projects" items={[{id:"alpha",label:"Alpha"},{id:"beta",label:"Beta"},{id:"gamma",label:"Gamma",disabled:true}]} selectionMode="multiple"/>',
    render: () => <ExampleListBox />,
  },
  {
    name: "Tree",
    id: "tree",
    category: "Collections",
    description: "Hierarchical selection with expandable branches.",
    notes:
      "Provide stable unique IDs. Tables retain native table semantics; the richer DataGrid operates on supplied client-side rows. Select-current-page affects visible rows only. Filtering does not discard selection. Virtualization and server queries are not implemented by these wrappers.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Tree label="Files" selectionMode="single" items={[{id:"src",label:"Source",children:[{id:"components",label:"Components"},{id:"tokens",label:"Tokens"}]},{id:"readme",label:"README.md"}]}/>',
    render: () => <ExampleTree />,
  },
  {
    name: "Alert",
    id: "alert",
    category: "Feedback",
    description: "Persistent, contextual status messages.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><W.Alert title="Changes saved" tone="success">Your preferences are up to date.</W.Alert><W.Alert title="Action needed" tone="danger">Check the highlighted fields.</W.Alert></W.Stack>',
    render: () => <ExampleAlert />,
  },
  {
    name: "Badge",
    id: "badge",
    category: "Feedback",
    description: "Compact text status with semantic tones.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline><W.Badge>Draft</W.Badge><W.Badge tone="success">Ready</W.Badge><W.Badge tone="warning">Pending</W.Badge><W.Badge tone="danger">Failed</W.Badge></W.Inline>',
    render: () => <ExampleBadge />,
  },
  {
    name: "ProgressBar",
    id: "progress-bar",
    category: "Feedback",
    description: "Determinate or indeterminate task progress.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><W.ProgressBar label="Upload progress" value={65}/><W.ProgressBar label="Preparing" isIndeterminate/></W.Stack>',
    render: () => <ExampleProgressBar />,
  },
  {
    name: "Meter",
    id: "meter",
    category: "Feedback",
    description: "A measurement within a known range.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Meter label="Storage used" value={42} maxValue={100}/>',
    render: () => <ExampleMeter />,
  },
  {
    name: "Spinner",
    id: "spinner",
    category: "Feedback",
    description: "A labelled indeterminate loading indicator.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Spinner label="Loading records"/>',
    render: () => <ExampleSpinner />,
  },
  {
    name: "Skeleton",
    id: "skeleton",
    category: "Feedback",
    description: "Decorative placeholders while real content loads.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><W.Skeleton height={24} width="70%"/><W.Skeleton/><W.Skeleton width="85%"/></W.Stack>',
    render: () => <ExampleSkeleton />,
  },
  {
    name: "EmptyState",
    id: "empty-state",
    category: "Feedback",
    description: "Helpful guidance for an empty collection.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.EmptyState title="No projects yet" description="Create your first project to get started." action={<W.Button onPress={()=>notify({title:"Create project selected"})}>Create project</W.Button>}/>',
    render: () => <ExampleEmptyState />,
  },
  {
    name: "Avatar",
    id: "avatar",
    category: "Feedback",
    description: "People represented by images or initials.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline><W.Avatar name="Alex Morgan" size="sm"/><W.Avatar name="Jamie Patel"/><W.Avatar name="Taylor Shah" size="lg"/></W.Inline>',
    render: () => <ExampleAvatar />,
  },
  {
    name: "AvatarGroup",
    id: "avatar-group",
    category: "Feedback",
    description: "A compact group with a visible overflow count.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.AvatarGroup people={[{name:"Alex Morgan"},{name:"Jamie Patel"},{name:"Taylor Shah"},{name:"Riley Chen"}]} max={3}/>',
    render: () => <ExampleAvatarGroup />,
  },
  {
    name: "TagGroup",
    id: "tag-group",
    category: "Feedback",
    description: "A keyboard-accessible set of removable tags.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'const [items, setItems] = useState([{id:"one",label:"Design"}]);\n<W.TagGroup label="Topics" items={items} onRemove={keys => setItems(items.filter(i => !keys.has(i.id)))} />',
    render: () => <ExampleTagGroup />,
  },
  {
    name: "NotificationCenter",
    id: "notification-center",
    category: "Feedback",
    description: "An inbox, live toasts and opt-in notification sound.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline><W.Button onPress={()=>notify({title:"New update",description:"A simulated event from this example.",tone:"success"})}>Send notification</W.Button><W.NotificationCenter/></W.Inline>',
    render: () => <ExampleNotificationCenter />,
  },
  {
    name: "CodeBlock",
    id: "code-block",
    category: "Feedback",
    description: "Readable code with explicit copy feedback.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.CodeBlock code={\'import { Button } from "react-wardrobe";\n<Button>Save</Button>\'}/>',
    render: () => <ExampleCodeBlock />,
  },
  {
    name: "Kbd",
    id: "kbd",
    category: "Feedback",
    description: "Visual notation for a keyboard shortcut.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline>Open search <W.Kbd>\u2318 K</W.Kbd></W.Inline>',
    render: () => <ExampleKbd />,
  },
  {
    name: "Separator",
    id: "separator",
    category: "Feedback",
    description: "A semantic divider between sections.",
    notes:
      "Use meaningful labels and text in addition to color. Respect reduced-motion preferences. Notifications require NotificationProvider, remain in memory, and never replace durable application records. Decorative skeletons are hidden from assistive technology.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack><span>Section one</span><W.Separator/><span>Section two</span></W.Stack>',
    render: () => <ExampleSeparator />,
  },
  {
    name: "Card",
    id: "card",
    category: "Layout",
    description: "A consistent surface for related content.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Card><h3>A considered surface</h3><p>Group related content with a shared border, radius and elevation.</p></W.Card>',
    render: () => <ExampleCard />,
  },
  {
    name: "Stack",
    id: "stack",
    category: "Layout",
    description: "Vertical rhythm from shared spacing tokens.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Stack gap="lg"><W.Button>First</W.Button><W.Button variant="secondary">Second</W.Button></W.Stack>',
    render: () => <ExampleStack />,
  },
  {
    name: "Inline",
    id: "inline",
    category: "Layout",
    description: "Wrapping horizontal composition.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Inline><W.Badge>One</W.Badge><W.Badge>Two</W.Badge><W.Button size="sm">Action</W.Button></W.Inline>',
    render: () => <ExampleInline />,
  },
  {
    name: "PageHeader",
    id: "page-header",
    category: "Layout",
    description: "Consistent page title and action hierarchy.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.PageHeader eyebrow="WORKSPACE" title="Your projects" description="Everything you are working on." actions={<W.Button>Create project</W.Button>}/>',
    render: () => <ExamplePageHeader />,
  },
  {
    name: "Toolbar",
    id: "toolbar",
    category: "Layout",
    description: "A labelled group of related page actions.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Toolbar label="Collection actions" actions={<W.Button>New item</W.Button>}><W.Badge>12 items</W.Badge></W.Toolbar>',
    render: () => <ExampleToolbar />,
  },
  {
    name: "FormSection",
    id: "form-section",
    category: "Layout",
    description: "A fieldset and legend for related form controls.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.FormSection title="Contact details" description="How we can reach you."><W.TextField label="Full name"/><W.TextField label="Email" type="email"/></W.FormSection>',
    render: () => <ExampleFormSection />,
  },
  {
    name: "Navbar",
    id: "navbar",
    category: "Layout",
    description: "Responsive primary navigation with an active destination.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<div style={{height:340}}><W.Navbar brand="Acme workspace" activeId="home" items={[{id:"home",label:"Overview",href:"#/components/navbar"},{id:"projects",label:"Projects",href:"#/components/data-grid"}]} footer="Your workspace"/></div>',
    render: () => <ExampleNavbar />,
  },
  {
    name: "AppShell",
    id: "app-shell",
    category: "Layout",
    description: "Primary navigation, topbar and main content in one frame.",
    notes:
      "Keep one main landmark and one page-level heading in a consuming screen. Layout primitives add structure; use the shared inputs and actions inside them.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Alert title="A complete application frame">The live showcase uses AppShell. Open <W.Link href="#showcase">the showcase</W.Link> to explore its navigation, topbar, skip link and main landmark.</W.Alert>',
    render: () => <ExampleAppShell />,
  },
  {
    name: "WardrobeProvider",
    id: "wardrobe-provider",
    category: "Foundation",
    description: "The theme, density and locale boundary.",
    notes:
      "Wrap your application once, then import react-wardrobe/styles.css. Portalled components carry provider attributes. Locale affects date/number formatting; theme persistence belongs to the application.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.WardrobeProvider theme="dark" accent="iris"><W.Card><W.Stack><W.TextField label="A different theme"/><W.Button>Shared tokens</W.Button></W.Stack></W.Card></W.WardrobeProvider>',
    render: () => <ExampleWardrobeProvider />,
  },
  {
    name: "NotificationProvider",
    id: "notification-provider",
    category: "Foundation",
    description:
      "Connect application events to the notification presentation layer.",
    notes:
      "Pass source={(receive) => unsubscribe} for authenticated events. Scope optional BroadcastChannel names to tenant and session and remount on account changes. Sound requires explicit user activation.",
    code: 'import * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Alert title="Provider integration">This catalogue is already wrapped in NotificationProvider. Open <W.Link href="#/components/notification-center">NotificationCenter</W.Link> to send a simulated event.</W.Alert>',
    render: () => <ExampleNotificationProvider />,
  },
  {
    name: "Form",
    id: "form",
    category: "Foundation",
    description: "Native form submission and accessible validation.",
    notes:
      "React Aria Form is re-exported. Use field names and validationErrors for server errors; the application owns submission and authorization.",
    code: '// Within WardrobeProvider > NotificationProvider:\nconst { notify } = W.useNotifications();\nimport * as W from "react-wardrobe";\nimport "react-wardrobe/styles.css";\n\n<W.Form onSubmit={e=>{e.preventDefault();notify({title:"Form submitted"})}}><W.Stack><W.TextField label="Project name" name="project" isRequired/><W.Button type="submit">Submit</W.Button></W.Stack></W.Form>',
    render: () => <ExampleForm />,
  },
];
