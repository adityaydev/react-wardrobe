import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  root: mode === "showcase" ? "." : undefined,
  build:
    mode === "showcase"
      ? { outDir: "showcase-dist" }
      : {
          lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
            cssFileName: "styles",
          },
          rolldownOptions: {
            external: [
              /^react($|\/)/,
              /^react-dom($|\/)/,
              /^react-aria-components($|\/)/,
              /^@internationalized\/date/,
              /^lucide-react/,
            ],
          },
        },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.tsx"],
    globals: true,
  },
}));
