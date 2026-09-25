import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Date & time",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Calendar: Story = {
  render: () => catalogue.find((c) => c.name === "Calendar")!.render(),
};
export const DatePicker: Story = {
  render: () => catalogue.find((c) => c.name === "DatePicker")!.render(),
};
export const DateField: Story = {
  render: () => catalogue.find((c) => c.name === "DateField")!.render(),
};
export const TimeField: Story = {
  render: () => catalogue.find((c) => c.name === "TimeField")!.render(),
};
export const RangeCalendar: Story = {
  render: () => catalogue.find((c) => c.name === "RangeCalendar")!.render(),
};
export const DateRangePicker: Story = {
  render: () => catalogue.find((c) => c.name === "DateRangePicker")!.render(),
};
