import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Navigation",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Tabs: Story = {
  render: () => catalogue.find((c) => c.name === "Tabs")!.render(),
};
export const Breadcrumbs: Story = {
  render: () => catalogue.find((c) => c.name === "Breadcrumbs")!.render(),
};
export const Pagination: Story = {
  render: () => catalogue.find((c) => c.name === "Pagination")!.render(),
};
export const Accordion: Story = {
  render: () => catalogue.find((c) => c.name === "Accordion")!.render(),
};
export const Link: Story = {
  render: () => catalogue.find((c) => c.name === "Link")!.render(),
};
export const Steps: Story = {
  render: () => catalogue.find((c) => c.name === "Steps")!.render(),
};
