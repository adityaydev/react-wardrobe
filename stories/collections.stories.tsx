import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Collections",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const DataTable: Story = {
  render: () => catalogue.find((c) => c.name === "DataTable")!.render(),
};
export const DataGrid: Story = {
  render: () => catalogue.find((c) => c.name === "DataGrid")!.render(),
};
export const ListBox: Story = {
  render: () => catalogue.find((c) => c.name === "ListBox")!.render(),
};
export const Tree: Story = {
  render: () => catalogue.find((c) => c.name === "Tree")!.render(),
};
