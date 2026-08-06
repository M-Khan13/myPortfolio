export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Applies a theme to <html>. Kept here so the inline boot script, the toggle
 * and the dev-remount repair all agree on exactly what "applying" means.
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
}

/**
 * Serialized into <head> and executed synchronously during HTML parsing, so the
 * stored preference is applied before the browser's first paint. Falls back to
 * the system preference the first time someone visits, and to the server-
 * rendered dark default if localStorage is unavailable (private mode, etc).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.setAttribute("data-theme",t)}catch(e){}})()`;
