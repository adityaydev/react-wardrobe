import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Actions",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Button: Story = {
  render: () => catalogue.find((c) => c.name === "Button")!.render(),
};
export const ToggleButton: Story = {
  render: () => catalogue.find((c) => c.name === "ToggleButton")!.render(),
};
export const SegmentedControl: Story = {
  render: () => catalogue.find((c) => c.name === "SegmentedControl")!.render(),
};
