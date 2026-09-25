import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Layout",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Card: Story = {
  render: () => catalogue.find((c) => c.name === "Card")!.render(),
};
export const Stack: Story = {
  render: () => catalogue.find((c) => c.name === "Stack")!.render(),
};
export const Inline: Story = {
  render: () => catalogue.find((c) => c.name === "Inline")!.render(),
};
export const PageHeader: Story = {
  render: () => catalogue.find((c) => c.name === "PageHeader")!.render(),
};
export const Toolbar: Story = {
  render: () => catalogue.find((c) => c.name === "Toolbar")!.render(),
};
export const FormSection: Story = {
  render: () => catalogue.find((c) => c.name === "FormSection")!.render(),
};
export const Navbar: Story = {
  render: () => catalogue.find((c) => c.name === "Navbar")!.render(),
};
export const AppShell: Story = {
  render: () => catalogue.find((c) => c.name === "AppShell")!.render(),
};
