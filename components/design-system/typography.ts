// macOS Design System - Typography System
// SF Pro Font Family with proper hierarchy

// Font families
export const fontFamily = {
  text: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  display: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'SF Mono', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace",
  serif: "'New York', 'Times New Roman', serif",
};

// Typography hierarchy with proper sizing and weights
export const typography = {
  title1: {
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    letterSpacing: '-0.005em',
  },
  title2: {
    fontSize: '22px',
    fontWeight: '500',
    lineHeight: '1.2',
    letterSpacing: '0.008em',
  },
  title3: {
    fontSize: '20px',
    fontWeight: '500',
    lineHeight: '1.2',
    letterSpacing: '0.006em',
  },
  headline: {
    fontSize: '17px',
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '0.003em',
  },
  body: {
    fontSize: '17px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '0.003em',
  },
  callout: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '0.003em',
  },
  subhead: {
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '0.003em',
  },
  footnote: {
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '-0.001em',
  },
  caption1: {
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.3',
    letterSpacing: '0.008em',
  },
  caption2: {
    fontSize: '11px',
    fontWeight: '400',
    lineHeight: '1.2',
    letterSpacing: '0.01em',
  },
};

// Text styles combining font family and typography
export const textStyles = {
  title1: {
    ...typography.title1,
    fontFamily: fontFamily.display,
  },
  title2: {
    ...typography.title2,
    fontFamily: fontFamily.display,
  },
  title3: {
    ...typography.title3,
    fontFamily: fontFamily.display,
  },
  headline: {
    ...typography.headline,
    fontFamily: fontFamily.text,
  },
  body: {
    ...typography.body,
    fontFamily: fontFamily.text,
  },
  callout: {
    ...typography.callout,
    fontFamily: fontFamily.text,
  },
  subhead: {
    ...typography.subhead,
    fontFamily: fontFamily.text,
  },
  footnote: {
    ...typography.footnote,
    fontFamily: fontFamily.text,
  },
  caption1: {
    ...typography.caption1,
    fontFamily: fontFamily.text,
  },
  caption2: {
    ...typography.caption2,
    fontFamily: fontFamily.text,
  },
  code: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.4',
    fontFamily: fontFamily.mono,
  },
};

// Utility function to get text style
export const getTextStyle = (styleName: keyof typeof textStyles) => {
  return textStyles[styleName];
};

// Export all typography-related constants
export const Typography = {
  fontFamily,
  typography,
  textStyles,
};