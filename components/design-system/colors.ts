// macOS Design System - Color System
// Semantic Colors that adapt to light/dark mode

// Content Colors
export const contentColors = {
  label: {
    light: '#000000',           // Primary text
    dark: '#ffffff',
  },
  secondaryLabel: {
    light: '#3c3c4399',        // Lighter text (70% opacity)
    dark: '#ffffff99',
  },
  tertiaryLabel: {
    light: '#3c3c434d',        // Even lighter text (30% opacity)
    dark: '#ffffff4d',
  },
  quaternaryLabel: {
    light: '#3c3c432e',        // Lowest contrast text (18% opacity)
    dark: '#ffffff2e',
  },
  link: {
    light: '#007AFF',          // System blue
    dark: '#0A84FF',
  },
  placeholderText: {
    light: '#8e8e93',          // Gray placeholder
    dark: '#8e8e93',
  },
};

// Background Colors
export const backgroundColors = {
  windowBackground: {
    light: '#ffffff',          // Base surface
    dark: '#1d1d1f',
  },
  contentBackground: {
    light: '#ffffff',          // Layered surfaces
    dark: '#2c2c2e',
  },
  underWindowBackground: {
    light: '#f2f2f7',          // Behind windows
    dark: '#121214',
  },
  alternatingContentBackground: {
    light: '#ffffff',          // Table rows
    dark: '#1e1e1f',
  },
  sidebarBackground: {
    light: '#f2f2f7',          // Vibrant & blurred
    dark: '#2c2c2e',
  },
  menuBackground: {
    light: '#ffffffcc',        // Slight blur (80% opacity)
    dark: '#2c2c2ecc',
  },
};

// System Accents (user-customizable)
export const accentColors = {
  blue: '#007AFF',
  purple: '#AF52DE',
  pink: '#FF375F',
  red: '#FF453A',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#30D158',
  graphite: '#8E8E93',
};

// System Fills (soft-layer colors for cards/controls)
export const systemFills = {
  primaryFill: {
    light: '#78788033',        // Subtle backgrounds (20% opacity)
    dark: '#78788033',
  },
  secondaryFill: {
    light: '#78788029',        // 16% opacity
    dark: '#78788029',
  },
  tertiaryFill: {
    light: '#7878801a',        // 10% opacity
    dark: '#7878801a',
  },
  quaternaryFill: {
    light: '#7878800f',        // 6% opacity
    dark: '#7878800f',
  },
};

// Separators
export const separatorColors = {
  separator: {
    light: '#c6c6c833',        // Thin subtle line (20% opacity)
    dark: '#54545880',
  },
  opaqueSeparator: {
    light: '#c6c6c8',          // Stronger separator
    dark: '#545458',
  },
};

// Theme context
export type Theme = 'light' | 'dark';

// Helper function to get color based on theme
export const getColor = (colorSet: { light: string; dark: string }, theme: Theme): string => {
  return theme === 'light' ? colorSet.light : colorSet.dark;
};

// Expose all color categories as a single object for easy access
export const semanticColors = {
  content: contentColors,
  background: backgroundColors,
  accent: accentColors,
  fill: systemFills,
  separator: separatorColors,
};

// Default theme
export const defaultTheme: Theme = 'light';