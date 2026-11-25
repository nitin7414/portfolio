export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

export const THEME_STORAGE_KEY = "portfolio-theme-mode";

/**
 * Returns the system's preferred color scheme.
 */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/**
 * Resolves the given mode into an actual "dark" or "light" theme.
 */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "system") {
    return getSystemTheme();
  }
  return mode;
}

/**
 * Reads the current saved theme mode. Defaults to "dark" on first visit.
 */
export function getSavedThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  } catch {
    // localStorage might be unavailable or disabled
  }
  return "dark"; // Default dark by requirement
}

/**
 * Reads the currently applied theme from the <html> attribute.
 */
export function getActiveResolvedTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  const current = document.documentElement.getAttribute("data-theme");
  return current === "light" ? "light" : "dark";
}

/**
 * Updates DOM attributes, meta tags, and storage for the new theme.
 */
export function applyThemeDirectly(mode: ThemeMode): ResolvedTheme {
  const resolved = resolveTheme(mode);
  const root = document.documentElement;

  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;

  // Update theme-color meta tag for mobile browsers and PWA chrome
  const metaThemeColor = document.getElementById("theme-color-meta");
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", resolved === "light" ? "#FFFFFF" : "#0A0A0B");
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Ignore storage errors
  }

  // Dispatch custom event for reactive listeners
  window.dispatchEvent(
    new CustomEvent("theme-change", {
      detail: { mode, resolved },
    })
  );

  return resolved;
}

interface TransitionOrigin {
  x?: number;
  y?: number;
}

/**
 * Executes a theme switch. Uses circular reveal View Transitions if supported,
 * a clean surface-property CSS transition fallback, or an instant switch under prefers-reduced-motion.
 */
export function setThemeWithTransition(
  newMode: ThemeMode,
  origin?: TransitionOrigin
): Promise<ResolvedTheme> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve("dark");
  }

  const resolved = resolveTheme(newMode);
  const current = getActiveResolvedTheme();

  // If already at the desired theme and mode hasn't changed, just ensure it's saved
  if (resolved === current && getSavedThemeMode() === newMode) {
    return Promise.resolve(resolved);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // If user prefers reduced motion, skip all animations and apply instantly
  if (prefersReducedMotion) {
    applyThemeDirectly(newMode);
    return Promise.resolve(resolved);
  }

  // Determine transition origin coordinates
  let originX = origin?.x;
  let originY = origin?.y;

  if (originX === undefined || originY === undefined) {
    // Try finding the theme toggle button in the DOM
    const toggleButton = document.querySelector<HTMLElement>("[data-theme-toggle]");
    if (toggleButton) {
      const rect = toggleButton.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    } else {
      // Fallback to top-right corner
      originX = window.innerWidth - 32;
      originY = 32;
    }
  }

  // Check for document.startViewTransition support
  const docWithTransition = document as unknown as {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      ready: Promise<void>;
      finished: Promise<void>;
    };
  };

  if (typeof docWithTransition.startViewTransition === "function") {
    const transition = docWithTransition.startViewTransition(() => {
      applyThemeDirectly(newMode);
    });

    const radius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${originX}px ${originY}px)`,
            `circle(${radius}px at ${originX}px ${originY}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    }).catch(() => {
      // View transition aborted or superseded
    });

    return transition.finished.then(() => resolved).catch(() => resolved);
  }

  // Fallback when View Transitions API is not available:
  // Apply a 280ms transition class restricted to main surface properties
  const root = document.documentElement;
  root.classList.add("theme-transitioning");
  applyThemeDirectly(newMode);

  return new Promise((resolve) => {
    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
      resolve(resolved);
    }, 280);
  });
}
