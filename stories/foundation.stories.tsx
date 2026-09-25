import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Foundation",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const WardrobeProvider: Story = {
  render: () => catalogue.find((c) => c.name === "WardrobeProvider")!.render(),
};
export const NotificationProvider: Story = {
  render: () =>
    catalogue.find((c) => c.name === "NotificationProvider")!.render(),
};
export const Form: Story = {
  render: () => catalogue.find((c) => c.name === "Form")!.render(),
};
