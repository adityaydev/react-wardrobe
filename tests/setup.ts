import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
afterEach(cleanup);
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
