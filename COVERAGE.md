# Component coverage

All listed components have live, hash-addressable documentation pages in the catalogue. Individual verification results are recorded separately; a listed component is not a claim of exhaustive cross-browser or screen-reader certification.

| Component | Family | Documentation route |
|---|---|---|
| Button | Actions | `#/components/button` |
| ToggleButton | Actions | `#/components/toggle-button` |
| SegmentedControl | Actions | `#/components/segmented-control` |
| TextField | Inputs | `#/components/text-field` |
| NumberField | Inputs | `#/components/number-field` |
| Select | Inputs | `#/components/select` |
| ComboBox | Inputs | `#/components/combo-box` |
| MultiSelect | Inputs | `#/components/multi-select` |
| SearchField | Inputs | `#/components/search-field` |
| Checkbox | Inputs | `#/components/checkbox` |
| CheckboxGroup | Inputs | `#/components/checkbox-group` |
| RadioGroup | Inputs | `#/components/radio-group` |
| Switch | Inputs | `#/components/switch` |
| Slider | Inputs | `#/components/slider` |
| FileUpload | Inputs | `#/components/file-upload` |
| Calendar | Date & time | `#/components/calendar` |
| DatePicker | Date & time | `#/components/date-picker` |
| DateField | Date & time | `#/components/date-field` |
| TimeField | Date & time | `#/components/time-field` |
| RangeCalendar | Date & time | `#/components/range-calendar` |
| DateRangePicker | Date & time | `#/components/date-range-picker` |
| Tabs | Navigation | `#/components/tabs` |
| Breadcrumbs | Navigation | `#/components/breadcrumbs` |
| Pagination | Navigation | `#/components/pagination` |
| Accordion | Navigation | `#/components/accordion` |
| Link | Navigation | `#/components/link` |
| Steps | Navigation | `#/components/steps` |
| Modal | Overlays | `#/components/modal` |
| Drawer | Overlays | `#/components/drawer` |
| ConfirmDialog | Overlays | `#/components/confirm-dialog` |
| Popover | Overlays | `#/components/popover` |
| Dropdown | Overlays | `#/components/dropdown` |
| Tooltip | Overlays | `#/components/tooltip` |
| CommandPalette | Overlays | `#/components/command-palette` |
| DataTable | Collections | `#/components/data-table` |
| DataGrid | Collections | `#/components/data-grid` |
| ListBox | Collections | `#/components/list-box` |
| Tree | Collections | `#/components/tree` |
| Alert | Feedback | `#/components/alert` |
| Badge | Feedback | `#/components/badge` |
| ProgressBar | Feedback | `#/components/progress-bar` |
| Meter | Feedback | `#/components/meter` |
| Spinner | Feedback | `#/components/spinner` |
| Skeleton | Feedback | `#/components/skeleton` |
| EmptyState | Feedback | `#/components/empty-state` |
| Avatar | Feedback | `#/components/avatar` |
| AvatarGroup | Feedback | `#/components/avatar-group` |
| TagGroup | Feedback | `#/components/tag-group` |
| NotificationCenter | Feedback | `#/components/notification-center` |
| CodeBlock | Feedback | `#/components/code-block` |
| Kbd | Feedback | `#/components/kbd` |
| Separator | Feedback | `#/components/separator` |
| Card | Layout | `#/components/card` |
| Stack | Layout | `#/components/stack` |
| Inline | Layout | `#/components/inline` |
| PageHeader | Layout | `#/components/page-header` |
| Toolbar | Layout | `#/components/toolbar` |
| FormSection | Layout | `#/components/form-section` |
| Navbar | Layout | `#/components/navbar` |
| AppShell | Layout | `#/components/app-shell` |
| WardrobeProvider | Foundation | `#/components/wardrobe-provider` |
| NotificationProvider | Foundation | `#/components/notification-provider` |
| Form | Foundation | `#/components/form` |

## Scope boundaries

This release covers the application component families agreed for Wardrobe. It is not a one-to-one replacement for every React Aria primitive. Color editing, drag-and-drop collection reordering, virtualized collections and resizable table columns remain upstream capabilities without Wardrobe wrappers. Domain schedulers, rich-text editing, charts, server transport and backend persistence are separate integrations. FileUpload selects and validates files; it does not upload them.
