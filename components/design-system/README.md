# macOS Design System Documentation

## Overview
This design system implements Apple's macOS Human Interface Guidelines in a React-based component library. It follows Apple's core design principles: Clarity, Deference, Depth, Minimalism, and Harmony.

## Core Components

### 1. Color System
The color system uses semantic colors that adapt to light/dark mode:

- **Content Colors**: Label, Secondary Label, Tertiary Label, Quaternary Label, Link Color, Placeholder Text
- **Background Colors**: Window Background, Content Background, Under Window Background, etc.
- **System Accents**: Blue, Purple, Pink, Red, Orange, Yellow, Green, Graphite
- **System Fills**: Primary, Secondary, Tertiary, Quaternary Fills
- **Separators**: Separator and Opaque Separator

### 2. Typography
Uses SF Pro font family with proper hierarchy:
- Title 1, Title 2, Title 3
- Headline
- Body, Callout, Subhead
- Footnote
- Caption 1, Caption 2

### 3. Layout System
Based on 8pt grid system with spacing scale: 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64

### 4. Window Components
- `Titlebar`: With traffic light buttons
- `Toolbar`: For tool grouping
- `Sidebar`: With vibrant blur effect
- `Window`: Complete window container

### 5. Material Components
- `Material`: For blurred backgrounds (titlebar, sidebar, popover, menu, hud, etc.)
- `VibrantView`: Advanced blur effects
- `BackgroundMaterial`: For overlays

### 6. Controls
- `Button`: Push, Bezel, Text, Icon, Rounded variants
- `TextInput`: Standard text input
- `SearchInput`: Search with icon
- `Checkbox` and `RadioButton`
- `PopupButton`: Select component
- `Stepper`: Number increment/decrement
- `DatePicker`: Date selection

### 7. Motion Components
- `Modal`: Slide-in modal dialogs
- `Sheet`: Bottom-up panels
- `Popover`: Positioned overlays
- `Tooltip`: Informative tooltips
- Animation presets for various interactions

## Usage Examples

### Basic Setup
```tsx
import { ThemeProvider } from './design-system/utils';
import DesignSystemDemo from './design-system/DesignSystemDemo';

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <DesignSystemDemo />
    </ThemeProvider>
  );
}
```

### Using Components
```tsx
import { Button, Material, Window } from './design-system';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <Window theme={theme} title="My App">
      <Material material="sheet" theme={theme}>
        <Button theme={theme} variant="push">
          Click Me
        </Button>
      </Material>
    </Window>
  );
}
```

## Design Principles

This design system follows Apple's core values:

1. **Clarity**: Everything must look readable & understandable
2. **Deference**: UI stays out of the way — content is king
3. **Depth**: Use translucency, layers, and motion to create hierarchy
4. **Minimalism**: Don't overload — keep UI simple and focused
5. **Harmony**: Everything aligns, matches, and feels balanced

## Theming
The system supports both light and dark themes. Components automatically adapt to the current theme context.

## Best Practices

- Use semantic color functions instead of hardcoded colors
- Follow the 8pt grid system for spacing
- Use appropriate material types for different UI elements
- Implement motion subtly and purposefully
- Maintain visual hierarchy through typography
- Respect window anatomy (titlebar, toolbar, content area)

## Accessibility
- Ensure proper contrast ratios in both light and dark modes
- Use semantic typography for proper text hierarchy
- Implement keyboard navigation for all interactive elements
- Support dynamic type where appropriate