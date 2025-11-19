// macOS Design System - Material/Blur Effects
// Components for vibrancy and glass effects

import React from 'react';
import { backgroundColors, contentColors, getColor, Theme } from './colors';
import { spacing } from './layout';

// Material types based on macOS visual effects
type MaterialType = 
  | 'titlebar' 
  | 'sidebar' 
  | 'popover' 
  | 'menu' 
  | 'hud'
  | 'headerView'
  | 'sheet'
  | 'tooltip';

// Material properties for different types
const materialProperties: Record<MaterialType, { light: string; dark: string; backdropBlur: string }> = {
  titlebar: {
    light: 'rgba(245, 245, 245, 0.7)',
    dark: 'rgba(40, 40, 40, 0.6)',
    backdropBlur: 'blur(20px)',
  },
  sidebar: {
    light: 'rgba(245, 245, 245, 0.6)',
    dark: 'rgba(40, 40, 40,  0.5)',
    backdropBlur: 'blur(20px)',
  },
  popover: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(55, 55, 55, 0.8)',
    backdropBlur: 'blur(24px)',
  },
  menu: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(55, 55, 55, 0.8)',
    backdropBlur: 'blur(18px)',
  },
  hud: {
    light: 'rgba(70, 70, 72, 0.8)',
    dark: 'rgba(70, 70, 72, 0.8)',
    backdropBlur: 'blur(16px)',
  },
  headerView: {
    light: 'rgba(245, 245, 245, 0.6)',
    dark: 'rgba(40, 40, 40, 0.5)',
    backdropBlur: 'blur(10px)',
  },
  sheet: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(55, 55, 55, 0.9)',
    backdropBlur: 'blur(22px)',
  },
  tooltip: {
    light: 'rgba(70, 70, 72, 0.9)',
    dark: 'rgba(70, 70, 72, 0.9)',
    backdropBlur: 'blur(12px)',
  },
};

// Material component props
interface MaterialProps {
  children: React.ReactNode;
  theme: Theme;
  material: MaterialType;
  className?: string;
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  borderRadius?: keyof typeof spacing;
}

// Material component with blur effect
export const Material: React.FC<MaterialProps> = ({ 
  children, 
  theme, 
  material = 'popover',
  className = '', 
  padding = '4',
  margin = '0',
  borderRadius = 'lg'
}) => {
  const currentMaterial = materialProperties[material];
  const backgroundColor = theme === 'light' ? currentMaterial.light : currentMaterial.dark;
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <div
      className={`backdrop-blur-md ${className}`}
      style={{
        backgroundColor,
        backdropFilter: currentMaterial.backdropBlur,
        WebkitBackdropFilter: currentMaterial.backdropBlur, // For Safari
        color: labelColor,
        padding: spacing[padding],
        margin: spacing[margin],
        borderRadius: spacing[borderRadius],
      }}
    >
      {children}
    </div>
  );
};

// Vibrant View component for more advanced blur effects
interface VibrantViewProps {
  children: React.ReactNode;
  theme: Theme;
  material: MaterialType;
  className?: string;
  intensity?: 'thin' | 'regular' | 'thick';
}

export const VibrantView: React.FC<VibrantViewProps> = ({ 
  children, 
  theme, 
  material = 'popover',
  className = '',
  intensity = 'regular'
}) => {
  const currentMaterial = materialProperties[material];
  const baseColor = theme === 'light' ? currentMaterial.light : currentMaterial.dark;
  
  // Adjust intensity based on type
  let adjustedColor = baseColor;
  switch(intensity) {
    case 'thin':
      // Reduce alpha for thinner appearance
      adjustedColor = baseColor.replace(/[\d.]+\)$/, '0.5)');
      break;
    case 'thick':
      // Increase alpha for thicker appearance
      adjustedColor = baseColor.replace(/[\d.]+\)$/, '0.9)');
      break;
    default:
      // Regular stays as is
      break;
  }
  
  // Adjust blur based on intensity
  let adjustedBlur = currentMaterial.backdropBlur;
  switch(intensity) {
    case 'thin':
      adjustedBlur = currentMaterial.backdropBlur.replace(/\d+px/, '10px');
      break;
    case 'thick':
      adjustedBlur = currentMaterial.backdropBlur.replace(/\d+px/, '30px');
      break;
    default:
      break;
  }
  
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <div
      className={`backdrop-blur ${className}`}
      style={{
        backgroundColor: adjustedColor,
        backdropFilter: adjustedBlur,
        WebkitBackdropFilter: adjustedBlur, // For Safari
        color: labelColor,
      }}
    >
      {children}
    </div>
  );
};

// Background material component for full-screen overlays
interface BackgroundMaterialProps {
  theme: Theme;
  material: MaterialType;
  onClick?: () => void;
  className?: string;
}

export const BackgroundMaterial: React.FC<BackgroundMaterialProps> = ({ 
  theme, 
  material = 'popover',
  onClick,
  className = ''
}) => {
  const currentMaterial = materialProperties[material];
  const backgroundColor = theme === 'light' ? currentMaterial.light : currentMaterial.dark;
  
  return (
    <div
      className={`fixed inset-0 backdrop-blur-md flex items-center justify-center ${className}`}
      style={{
        backgroundColor,
        backdropFilter: currentMaterial.backdropBlur,
        WebkitBackdropFilter: currentMaterial.backdropBlur, // For Safari
      }}
      onClick={onClick}
    />
  );
};

// Export all material components
export const Materials = {
  Material,
  VibrantView,
  BackgroundMaterial,
  materialProperties,
};