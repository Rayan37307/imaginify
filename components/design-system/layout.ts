// macOS Design System - Layout System
// 8pt grid system with spacing rules

// Spacing scale based on 8pt grid system
export const spacing = {
  '0': '0px',        // No spacing
  '1': '2px',        // 1/4 of 8pt grid
  '2': '4px',        // 1/2 of 8pt grid
  '3': '6px',        // 3/4 of 8pt grid
  '4': '8px',        // 1x 8pt grid
  '5': '10px',       // 1.25x 8pt grid
  '6': '12px',       // 1.5x 8pt grid
  '7': '14px',       // 1.75x 8pt grid
  '8': '16px',       // 2x 8pt grid
  '10': '20px',      // 2.5x 8pt grid
  '12': '24px',      // 3x 8pt grid
  '14': '28px',      // 3.5x 8pt grid
  '16': '32px',      // 4x 8pt grid
  '20': '40px',      // 5x 8pt grid
  '24': '48px',      // 6x 8pt grid
  '32': '64px',      // 8x 8pt grid
  '40': '80px',      // 10x 8pt grid
  '48': '96px',      // 12x 8pt grid
  '56': '112px',     // 14x 8pt grid
  '64': '128px',     // 16x 8pt grid
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '0px',         // Extra small devices
  sm: '640px',       // Small devices (540px + 100px for scrollbar)
  md: '768px',       // Medium devices
  lg: '1024px',      // Large devices
  xl: '1280px',      // Extra large devices
  '2xl': '1536px',   // 2x extra large devices
};

// Container widths
export const container = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px',
  '2xl': '1320px',
};

// Border radius values
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',    // Pill shape
};

// Shadow values
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

// Z-index values
export const zIndex = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
  modal: '1000',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  overlay: '1300',
  drawer: '1400',
  modalOverlay: '1500',
  popover: '1600',
  skipLink: '1700',
  toast: '1800',
  tooltip: '1900',
};

// Layout helpers
export const layout = {
  spacing,
  breakpoints,
  container,
  borderRadius,
  shadows,
  zIndex,
};

// Safe area insets for macOS-style UI
export const safeArea = {
  top: 'env(titlebar-area-height, 28px)',  // Height of titlebar area
  left: '0px',
  right: '0px',
  bottom: '0px',
};

// Grid system
export const grid = {
  columns: 12,
  gap: spacing[4],       // Default 8px gap
  gapSm: spacing[2],    // Small 4px gap
  gapLg: spacing[8],    // Large 16px gap
};

export default layout;