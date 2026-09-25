import type { Meta, StoryObj } from "@storybook/react-vite";
import { catalogue } from "../showcase/catalogue";
const meta = {
  title: "Components/Inputs",
  parameters: { layout: "padded" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const TextField: Story = {
  render: () => catalogue.find((c) => c.name === "TextField")!.render(),
};
export const NumberField: Story = {
  render: () => catalogue.find((c) => c.name === "NumberField")!.render(),
};
export const Select: Story = {
  render: () => catalogue.find((c) => c.name === "Select")!.render(),
};
export const ComboBox: Story = {
  render: () => catalogue.find((c) => c.name === "ComboBox")!.render(),
};
export const MultiSelect: Story = {
  render: () => catalogue.find((c) => c.name === "MultiSelect")!.render(),
};
export const SearchField: Story = {
  render: () => catalogue.find((c) => c.name === "SearchField")!.render(),
};
export const Checkbox: Story = {
  render: () => catalogue.find((c) => c.name === "Checkbox")!.render(),
};
export const CheckboxGroup: Story = {
  render: () => catalogue.find((c) => c.name === "CheckboxGroup")!.render(),
};
export const RadioGroup: Story = {
  render: () => catalogue.find((c) => c.name === "RadioGroup")!.render(),
};
export const Switch: Story = {
  render: () => catalogue.find((c) => c.name === "Switch")!.render(),
};
export const Slider: Story = {
  render: () => catalogue.find((c) => c.name === "Slider")!.render(),
};
export const FileUpload: Story = {
  render: () => catalogue.find((c) => c.name === "FileUpload")!.render(),
};
