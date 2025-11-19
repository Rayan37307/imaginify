// macOS Design System - Utility Functions
// Helper functions for common design system operations

import { Theme, getColor, semanticColors } from './colors';
import { layout } from './layout';

// Utility to get color based on theme and semantic role
export const getSemanticColor = (
  category: keyof typeof semanticColors,
  role: string, // keyof typeof semanticColors[typeof category],
  theme: Theme
): string => {
  const colorSet = semanticColors[category];
  
  // Handle nested object access
  if (category === 'accent') {
    return colorSet[role as keyof typeof semanticColors.accent] || '#000000';
  }
  
  const colorRole = colorSet[role as keyof typeof colorSet];
  if (colorRole && typeof colorRole === 'object' && 'light' in colorRole && 'dark' in colorRole) {
    return getColor(colorRole as { light: string; dark: string }, theme);
  }
  
  return '#000000'; // fallback
};

// Utility to check if a theme is dark
export const isDarkTheme = (theme: Theme): boolean => {
  return theme === 'dark';
};

// Utility to convert rem to px (for consistent sizing)
export const remToPx = (rem: number): number => {
  // Assuming base font size of 16px
  return rem * 16;
};

// Utility to get spacing value
export const getSpacing = (key: keyof typeof layout.spacing): string => {
  return layout.spacing[key] || '0px';
};

// Utility to get breakpoint value
export const getBreakpoint = (key: keyof typeof layout.breakpoints): string => {
  return layout.breakpoints[key] || '0px';
};

// Utility to generate responsive styles
export const responsiveStyle = (
  base: string,
  md?: string,
  lg?: string
): React.CSSProperties => {
  const style: React.CSSProperties = { width: base };
  
  if (md) {
    (style as any)['@media (min-width: 768px)'] = { width: md };
  }
  
  if (lg) {
    (style as any)['@media (min-width: 1024px)'] = { width: lg };
  }
  
  return style;
};

// Utility to create a theme context provider
import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ 
  children: React.ReactNode, 
  initialTheme?: Theme 
}> = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Utility to create a media query hook
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Utility to generate a gradient based on theme
export const getThemeGradient = (theme: Theme): string => {
  if (theme === 'light') {
    return `linear-gradient(135deg, ${getSemanticColor('background', 'windowBackground', theme)} 0%, ${getSemanticColor('background', 'contentBackground', theme)} 100%)`;
  } else {
    return `linear-gradient(135deg, ${getSemanticColor('background', 'windowBackground', theme)} 0%, ${getSemanticColor('background', 'contentBackground', theme)} 100%)`;
  }
};

// Utility to format a number with appropriate decimal places for UI
export const formatNumber = (num: number, decimals = 2): string => {
  return num.toFixed(decimals);
};

// Utility to capitalize first letter of a string
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Utility to generate a random ID for components that need unique identifiers
export const generateId = (prefix = 'macos'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Utility to check if a color is light or dark for appropriate text color
export const isLightColor = (color: string): boolean => {
  // Convert hex color to RGB
  let r, g, b;
  
  // Handle hex format
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } 
  // Handle rgba format
  else if (color.startsWith('rgba')) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    } else {
      return true; // Default to light for unknown formats
    }
  }
  else {
    // For other formats, default to light
    return true;
  }
  
  // Calculate brightness using luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
};

// Utility to get appropriate text color based on background
export const getTextColorForBackground = (bgColor: string): string => {
  return isLightColor(bgColor) ? '#000000' : '#FFFFFF';
};

// Export all utility functions
export const DesignSystemUtils = {
  getSemanticColor,
  isDarkTheme,
  remToPx,
  getSpacing,
  getBreakpoint,
  responsiveStyle,
  useMediaQuery,
  getThemeGradient,
  formatNumber,
  capitalize,
  generateId,
  isLightColor,
  getTextColorForBackground,
};