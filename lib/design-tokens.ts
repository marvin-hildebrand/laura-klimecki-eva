// EVA Design System — Laura Klimecki CI

export const CI = {
  // Laura Klimecki CI Colors
  primary: '#345168',
  primaryHover: '#2A4356',
  midBlue: '#6688A4',
  bgSoft: '#F2F5F7',
  bgSofter: '#F8FAFB',
  white: '#FFFFFF',
  gray: '#F4F4F4',
  border: '#E4E9EE',
  borderSoft: '#EEF1F4',
  beige: '#BEB8AF',
  beigeSoft: '#D8D3CC',
  text: '#1F2D3A',
  textDim: '#5B6B7B',
  textMuted: '#8A98A6',

  // Instagram Thumbnail Palette
  thumbBg: '#1E3A5F',
  thumbBgAlt: '#1a2744',
  thumbHL: '#5BA4D4',
  thumbWhite: '#FFFFFF',
} as const;

export const FONT = {
  head: '"Lato", system-ui, sans-serif',
  body: '"Open Sans", system-ui, sans-serif',
  dec: '"Cormorant Garamond", serif',
  buzz: '"Playfair Display SC", serif',
} as const;

// Type exports
export type CIColor = keyof typeof CI;
export type FontFamily = keyof typeof FONT;
