import "../src/styles.css";
import type { Preview } from "@storybook/react-vite";
import {
  WardrobeProvider,
  NotificationProvider,
  type Theme,
  type Accent,
} from "../src";
const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: { theme: "light", accent: "amber" },
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: { icon: "circlehollow", items: ["light", "dark"] },
    },
    accent: {
      description: "Accent palette",
      toolbar: { icon: "paintbrush", items: ["amber", "sage", "iris"] },
    },
  },
  decorators: [
    (Story, context) => (
      <WardrobeProvider
        theme={context.globals.theme as Theme}
        accent={context.globals.accent as Accent}
      >
        <NotificationProvider>
          <div
            style={{ padding: 24, background: "var(--rw-bg)", minHeight: 180 }}
          >
            <Story />
          </div>
        </NotificationProvider>
      </WardrobeProvider>
    ),
  ],
  parameters: { layout: "padded" },
};
export default preview;
