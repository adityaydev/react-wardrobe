import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Stack,
  Inline,
  TextField,
  NumberField,
  Select,
  DatePicker,
  Checkbox,
  Switch,
  Modal,
  NotificationCenter,
  Calendar,
  Alert,
} from "../src";
const meta = {
  title: "Wardrobe/Collection",
  component: Button,
  args: { children: "Save changes" },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Actions: Story = {
  render: () => (
    <Inline>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Delete</Button>
      <Button loading>Saving</Button>
      <Button isDisabled>Disabled</Button>
    </Inline>
  ),
};
export const Inputs: Story = {
  render: () => (
    <Stack>
      <TextField label="Name" />
      <TextField label="Email" errorMessage="Enter a valid email" />
      <NumberField label="Quantity" minValue={1} defaultValue={1} />
      <Select
        label="Priority"
        options={[
          { id: "low", label: "Low" },
          { id: "high", label: "High" },
        ]}
      />
      <DatePicker label="Due date" />
      <Checkbox>Send reminder</Checkbox>
      <Switch>Available</Switch>
    </Stack>
  ),
};
export const Dialog: Story = {
  render: () => (
    <Modal trigger={<Button>Open dialog</Button>} title="Project settings">
      <TextField label="Project name" />
    </Modal>
  ),
};
export const Dates: Story = {
  render: () => <Calendar aria-label="Choose date" />,
};
export const Feedback: Story = {
  render: () => (
    <Stack>
      <Alert title="Everything is ready" tone="success">
        You can continue.
      </Alert>
      <NotificationCenter />
    </Stack>
  ),
};
