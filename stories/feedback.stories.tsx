import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Feedback",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Alert: Story = {
  render: () => catalogue.find((c) => c.name === "Alert")!.render(),
};
export const Badge: Story = {
  render: () => catalogue.find((c) => c.name === "Badge")!.render(),
};
export const ProgressBar: Story = {
  render: () => catalogue.find((c) => c.name === "ProgressBar")!.render(),
};
export const Meter: Story = {
  render: () => catalogue.find((c) => c.name === "Meter")!.render(),
};
export const Spinner: Story = {
  render: () => catalogue.find((c) => c.name === "Spinner")!.render(),
};
export const Skeleton: Story = {
  render: () => catalogue.find((c) => c.name === "Skeleton")!.render(),
};
export const EmptyState: Story = {
  render: () => catalogue.find((c) => c.name === "EmptyState")!.render(),
};
export const Avatar: Story = {
  render: () => catalogue.find((c) => c.name === "Avatar")!.render(),
};
export const AvatarGroup: Story = {
  render: () => catalogue.find((c) => c.name === "AvatarGroup")!.render(),
};
export const TagGroup: Story = {
  render: () => catalogue.find((c) => c.name === "TagGroup")!.render(),
};
export const NotificationCenter: Story = {
  render: () =>
    catalogue.find((c) => c.name === "NotificationCenter")!.render(),
};
export const CodeBlock: Story = {
  render: () => catalogue.find((c) => c.name === "CodeBlock")!.render(),
};
export const Kbd: Story = {
  render: () => catalogue.find((c) => c.name === "Kbd")!.render(),
};
export const Separator: Story = {
  render: () => catalogue.find((c) => c.name === "Separator")!.render(),
};
