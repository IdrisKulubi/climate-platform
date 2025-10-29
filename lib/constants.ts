/**
 * Color palette constants for the Africa Climate Platform
 * Based on KCIC and partner organization brand colors
 */

export const COLORS = {
  climate: {
    green: '#1E5631',
    greenLight: '#A7C957',
    greenDark: '#0F2B19',
    blue: '#2C5F7F',
    yellow: '#F3B229',
  },
  partner: {
    afdb: '#006633',
    ifc: '#003C70',
    unep: '#009EDB',
    wri: '#F3B229',
    agra: '#F15A22',
  },
  neutral: {
    offWhite: '#F5F9F6',
    brownGray: '#555B6E',
    white: '#FFFFFF',
    black: '#0A0A0A',
  },
} as const;

export const BREAKPOINTS = {
  mobile: '0px',      // 0-767px
  tablet: '768px',    // 768-1023px
  desktop: '1024px',  // 1024-1439px
  wide: '1440px',     // 1440px+
} as const;
