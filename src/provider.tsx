import { createContext, useContext, type ReactNode } from "react";
import { I18nProvider, isRTL, useLocale } from "react-aria-components";
import { cx } from "./utils";

export type Theme = "light" | "dark";
export type Accent = "amber" | "sage" | "iris";
export interface WardrobeProviderProps {
  children: ReactNode;
  theme?: Theme;
  accent?: Accent;
  density?: "comfortable" | "compact";
  locale?: string;
  className?: string;
}
const ThemeContext = createContext({
  theme: "light" as Theme,
  accent: "amber" as Accent,
  density: "comfortable",
});
export function WardrobeProvider({
  children,
  theme = "light",
  accent = "amber",
  density = "comfortable",
  locale = "en-IN",
  className,
}: WardrobeProviderProps) {
  return (
    <ThemeContext.Provider value={{ theme, accent, density }}>
      <I18nProvider locale={locale}>
        <div
          className={cx("rw-root", className)}
          dir={isRTL(locale) ? "rtl" : "ltr"}
          data-theme={theme}
          data-accent={accent}
          data-density={density}
        >
          {children}
        </div>
      </I18nProvider>
    </ThemeContext.Provider>
  );
}
// Portalled overlays must receive the same tokens as the app subtree.
export function useThemeAttributes() {
  const { theme, accent, density } = useContext(ThemeContext);
  const { direction } = useLocale();
  return {
    dir: direction,
    "data-theme": theme,
    "data-accent": accent,
    "data-density": density,
  };
}
