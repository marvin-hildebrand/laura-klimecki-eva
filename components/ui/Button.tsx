'use client';

import { CSSProperties, ReactNode } from 'react';
import { Icon, IconName } from './Icon';
import { CI, FONT } from '@/lib/design-tokens';

type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizes = {
  sm: { padding: '8px 14px', fontSize: 12.5, gap: 7, iconSize: 14 },
  md: { padding: '11px 18px', fontSize: 13.5, gap: 9, iconSize: 15 },
  lg: { padding: '14px 22px', fontSize: 14.5, gap: 10, iconSize: 17 },
};

const kinds = {
  primary: {
    bg: CI.primary,
    fg: '#fff',
    border: 'transparent',
    shadow: '0 1px 0 rgba(255,255,255,0.12) inset, 0 4px 12px rgba(52,81,104,0.18)',
  },
  secondary: {
    bg: '#fff',
    fg: CI.text,
    border: CI.border,
    shadow: 'none',
  },
  ghost: {
    bg: 'transparent',
    fg: CI.textDim,
    border: 'transparent',
    shadow: 'none',
  },
  outline: {
    bg: '#fff',
    fg: CI.primary,
    border: CI.primary,
    shadow: 'none',
  },
};

export function Button({
  children,
  kind = 'secondary',
  size = 'md',
  icon,
  iconRight,
  style,
  onClick,
  disabled,
  className,
  type = 'button',
}: ButtonProps) {
  const sz = sizes[size];
  const k = kinds[kind];

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sz.gap,
    padding: sz.padding,
    fontSize: sz.fontSize,
    fontWeight: 600,
    fontFamily: FONT.body,
    borderRadius: 10,
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: k.bg,
    color: k.fg,
    border: `1px solid ${k.border}`,
    boxShadow: k.shadow,
    letterSpacing: 0.1,
    opacity: disabled ? 0.5 : 1,
    transition: 'transform .12s ease, box-shadow .2s ease, background .2s ease',
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={buttonStyle}
    >
      {icon && <Icon name={icon} size={sz.iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={sz.iconSize} />}
    </button>
  );
}
