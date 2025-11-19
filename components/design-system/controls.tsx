// macOS Design System - Control Components
// Buttons, inputs, pickers, and other interactive elements

import React, { useState } from 'react';
import { backgroundColors, contentColors, getColor, Theme } from './colors';
import { spacing, borderRadius } from './layout';
import { textStyles } from './typography';
import { Material } from './materials';

// Button variants
type ButtonVariant = 'push' | 'bezel' | 'text' | 'icon' | 'rounded';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  theme: Theme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  theme, 
  variant = 'push', 
  size = 'medium',
  onClick, 
  disabled = false,
  active = false,
  className = '',
  icon 
}) => {
  const isLight = theme === 'light';
  const labelColor = getColor(contentColors.label, theme);
  const secondaryLabelColor = getColor(contentColors.secondaryLabel, theme);
  const bg = getColor(backgroundColors.contentBackground, theme);
  
  // Size-specific styles
  let padding, fontSize, borderRadiusSize;
  switch(size) {
    case 'small':
      padding = `6px ${spacing[3]}`;
      fontSize = textStyles.footnote.fontSize;
      borderRadiusSize = borderRadius.sm;
      break;
    case 'large':
      padding = `10px ${spacing[5]}`;
      fontSize = textStyles.body.fontSize;
      borderRadiusSize = borderRadius.md;
      break;
    default: // medium
      padding = `8px ${spacing[4]}`;
      fontSize = textStyles.subhead.fontSize;
      borderRadiusSize = borderRadius.md;
  }
  
  // Variant-specific styles
  let buttonStyle: React.CSSProperties = {};
  let buttonClasses = '';
  
  switch(variant) {
    case 'push':
      buttonStyle = {
        backgroundColor: active 
          ? isLight ? '#007AFF' : '#0A84FF'  // Active blue
          : disabled 
            ? isLight ? '#f0f0f0' : '#3a3a3c'  // Disabled state
            : bg,
        color: active 
          ? '#ffffff'  // White text when active
          : disabled 
            ? isLight ? '#c0c0c0' : '#5a5a5c'  // Dimmed when disabled
            : labelColor,
        border: `1px solid ${isLight ? (active ? '#007AFF' : '#d2d2d7') : (active ? '#0A84FF' : '#545458')}`,
        padding,
        borderRadius: borderRadiusSize,
        fontSize,
        fontWeight: textStyles.subhead.fontWeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };
      buttonClasses = 'hover:bg-opacity-80 active:scale-[0.98]';
      break;
      
    case 'bezel':
      buttonStyle = {
        backgroundColor: 'transparent',
        color: disabled ? secondaryLabelColor : labelColor,
        border: `1px solid ${isLight ? '#d2d2d7' : '#545458'}`,
        padding,
        borderRadius: borderRadiusSize,
        fontSize,
        fontWeight: textStyles.subhead.fontWeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };
      buttonClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600';
      break;
      
    case 'text':
      buttonStyle = {
        backgroundColor: 'transparent',
        color: disabled ? secondaryLabelColor : (isLight ? '#007AFF' : '#0A84FF'),
        padding: `6px ${spacing[2]}`,
        borderRadius: borderRadius.md,
        fontSize,
        fontWeight: textStyles.subhead.fontWeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };
      buttonClasses = 'hover:underline';
      break;
      
    case 'icon':
      buttonStyle = {
        backgroundColor: 'transparent',
        color: disabled ? secondaryLabelColor : labelColor,
        width: size === 'small' ? '24px' : size === 'large' ? '36px' : '32px',
        height: size === 'small' ? '24px' : size === 'large' ? '36px' : '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };
      buttonClasses = 'hover:bg-gray-100 dark:hover:bg-gray-700';
      break;
      
    case 'rounded':
      buttonStyle = {
        backgroundColor: active 
          ? isLight ? '#007AFF' : '#0A84FF'  // Active blue
          : disabled 
            ? isLight ? '#f0f0f0' : '#3a3a3c'  // Disabled state
            : bg,
        color: active 
          ? '#ffffff'  // White text when active
          : disabled 
            ? isLight ? '#c0c0c0' : '#5a5a5c'  // Dimmed when disabled
            : labelColor,
        padding: `6px ${spacing[4]}`,
        borderRadius: borderRadius.full,
        fontSize,
        fontWeight: textStyles.subhead.fontWeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      };
      buttonClasses = 'hover:bg-opacity-80 active:scale-[0.98]';
      break;
  }
  
  return (
    <button
      className={`${buttonClasses} transition-all duration-150 ${className}`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Text input component
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  theme, 
  placeholder, 
  type = 'text',
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  const placeholderColor = getColor(contentColors.placeholderText, theme);
  
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`px-3 py-2 border rounded-md ${className}`}
      style={{
        backgroundColor: bg,
        color: labelColor,
        borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
        fontSize: textStyles.subhead.fontSize,
        opacity: disabled ? 0.6 : 1,
      }}
    />
  );
};

// Search input component
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  theme, 
  placeholder, 
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  const placeholderColor = getColor(contentColors.placeholderText, theme);
  
  return (
    <div className={`relative flex items-center ${className}`}>
      <span 
        className="absolute left-3"
        style={{ color: theme === 'light' ? '#8e8e93' : '#a0a0a0' }}
      >
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`pl-10 pr-3 py-2 border rounded-full w-full`}
        style={{
          backgroundColor: bg,
          color: labelColor,
          borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
          fontSize: textStyles.subhead.fontSize,
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </div>
  );
};

// Checkbox component
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme: Theme;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  theme, 
  label, 
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 mr-2 rounded text-blue-600 focus:ring-blue-500"
        style={{
          backgroundColor: bg,
          borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
          color: theme === 'light' ? '#007AFF' : '#0A84FF',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {label && (
        <span 
          style={{ 
            color: disabled ? getColor(contentColors.secondaryLabel, theme) : labelColor,
            ...textStyles.subhead 
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// Radio button component
interface RadioButtonProps {
  checked: boolean;
  onChange: () => void;
  theme: Theme;
  label?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ 
  checked, 
  onChange, 
  theme, 
  label, 
  disabled = false,
  name,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className="w-4 h-4 mr-2 text-blue-600 focus:ring-blue-500"
        style={{
          backgroundColor: bg,
          borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
          color: theme === 'light' ? '#007AFF' : '#0A84FF',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      {label && (
        <span 
          style={{ 
            color: disabled ? getColor(contentColors.secondaryLabel, theme) : labelColor,
            ...textStyles.subhead 
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

// Pop-up button component (Select)
interface PopupButtonProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  theme: Theme;
  disabled?: boolean;
  className?: string;
}

export const PopupButton: React.FC<PopupButtonProps> = ({ 
  value, 
  onChange, 
  options, 
  theme, 
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`px-3 py-2 border rounded-md appearance-none ${className}`}
      style={{
        backgroundColor: bg,
        color: labelColor,
        borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
        fontSize: textStyles.subhead.fontSize,
        opacity: disabled ? 0.6 : 1,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${theme === 'light' ? '%23000000' : '%23FFFFFF'}' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
        backgroundPosition: 'right 8px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '16px',
        paddingRight: '30px',
      }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value} style={{ backgroundColor: bg, color: labelColor }}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Stepper component (Number input with + and - buttons)
interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  theme: Theme;
  disabled?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  theme,
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  
  const increment = () => {
    if (!disabled && value + step <= max) {
      onChange(value + step);
    }
  };
  
  const decrement = () => {
    if (!disabled && value - step >= min) {
      onChange(value - step);
    }
  };
  
  return (
    <div className={`flex border rounded-md overflow-hidden ${className}`}>
      <button
        onClick={decrement}
        disabled={disabled || value <= min}
        className="px-3 py-2 border-r"
        style={{
          backgroundColor: bg,
          color: labelColor,
          borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
          opacity: (disabled || value <= min) ? 0.5 : 1,
          cursor: (disabled || value <= min) ? 'not-allowed' : 'pointer',
        }}
      >
        -
      </button>
      <span
        className="px-3 py-2 flex items-center justify-center"
        style={{
          backgroundColor: bg,
          color: labelColor,
          minWidth: '40px',
        }}
      >
        {value}
      </span>
      <button
        onClick={increment}
        disabled={disabled || value >= max}
        className="px-3 py-2 border-l"
        style={{
          backgroundColor: bg,
          color: labelColor,
          borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
          opacity: (disabled || value >= max) ? 0.5 : 1,
          cursor: (disabled || value >= max) ? 'not-allowed' : 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
};

// Date picker component
interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  disabled?: boolean;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  theme,
  disabled = false,
  className = '' 
}) => {
  const bg = getColor(backgroundColors.contentBackground, theme);
  const labelColor = getColor(contentColors.label, theme);
  
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`px-3 py-2 border rounded-md ${className}`}
      style={{
        backgroundColor: bg,
        color: labelColor,
        borderColor: theme === 'light' ? '#d2d2d7' : '#545458',
        fontSize: textStyles.subhead.fontSize,
        opacity: disabled ? 0.6 : 1,
      }}
    />
  );
};

// Export all control components
export const Controls = {
  Button,
  TextInput,
  SearchInput,
  Checkbox,
  RadioButton,
  PopupButton,
  Stepper,
  DatePicker,
};