import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => ({
    ...config,
    build: { ...config.build, lib: undefined },
  }),
};
export default config;
