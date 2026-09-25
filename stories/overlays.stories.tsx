import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Overlays",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Modal: Story = {
  render: () => catalogue.find((c) => c.name === "Modal")!.render(),
};
export const Drawer: Story = {
  render: () => catalogue.find((c) => c.name === "Drawer")!.render(),
};
export const ConfirmDialog: Story = {
  render: () => catalogue.find((c) => c.name === "ConfirmDialog")!.render(),
};
export const Popover: Story = {
  render: () => catalogue.find((c) => c.name === "Popover")!.render(),
};
export const Dropdown: Story = {
  render: () => catalogue.find((c) => c.name === "Dropdown")!.render(),
};
export const Tooltip: Story = {
  render: () => catalogue.find((c) => c.name === "Tooltip")!.render(),
};
export const CommandPalette: Story = {
  render: () => catalogue.find((c) => c.name === "CommandPalette")!.render(),
};
