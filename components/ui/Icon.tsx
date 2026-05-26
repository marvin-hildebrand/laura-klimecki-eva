'use client';

import { CSSProperties } from 'react';

export type IconName =
  | 'mic'
  | 'image'
  | 'upload'
  | 'download'
  | 'send'
  | 'sparkle'
  | 'check'
  | 'x'
  | 'plus'
  | 'edit'
  | 'search'
  | 'arrow-right'
  | 'arrow-left'
  | 'instagram'
  | 'podcast'
  | 'user'
  | 'history'
  | 'undo'
  | 'wand'
  | 'grid'
  | 'info'
  | 'chevron-down';

interface IconProps {
  name: IconName;
  size?: number;
  style?: CSSProperties;
  className?: string;
}

export function Icon({ name, size = 16, style = {}, className }: IconProps) {
  const svgStyle: CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    verticalAlign: '-2px',
    ...style,
  };

  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: svgStyle,
    className,
  };

  switch (name) {
    case 'mic':
      return (
        <svg {...props}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case 'image':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="m3 18 6-6 5 5 3-3 4 4" />
        </svg>
      );
    case 'upload':
      return (
        <svg {...props}>
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M4 20h16" />
        </svg>
      );
    case 'download':
      return (
        <svg {...props}>
          <path d="M12 4v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M4 20h16" />
        </svg>
      );
    case 'send':
      return (
        <svg {...props}>
          <path d="M4 12 21 4l-7 17-3-7z" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 3 13.6 9 19.6 10.6 13.6 12.2 12 18 10.4 12.2 4.4 10.6 10.4 9z" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="m5 12 4 4 10-10" />
        </svg>
      );
    case 'x':
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...props}>
          <path d="M14 4l6 6L9 21H3v-6z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...props}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...props}>
          <path d="M19 12H5M11 5l-7 7 7 7" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
        </svg>
      );
    case 'podcast':
      return (
        <svg {...props}>
          <circle cx="12" cy="11" r="3.5" />
          <path d="M7 11a5 5 0 0 1 10 0" />
          <path d="M5 11a7 7 0 0 1 14 0" />
          <path d="M10 19h4M12 14v5" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case 'history':
      return (
        <svg {...props}>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    case 'undo':
      return (
        <svg {...props}>
          <path d="M9 14H4V9" />
          <path d="M4 14a8 8 0 0 1 14-4" />
        </svg>
      );
    case 'wand':
      return (
        <svg {...props}>
          <path d="m3 21 11-11" />
          <path d="M14 6h.01M18 10h.01M20 6h.01M16 4h.01" />
          <path d="m13 7 4 4" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'info':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v.5M11 12h1v5" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...props}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}
