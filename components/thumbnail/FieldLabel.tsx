'use client';

import { CI, FONT } from '@/lib/design-tokens';

interface FieldLabelProps {
  label: string;
  hint?: string;
}

export function FieldLabel({ label, hint }: FieldLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
    >
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: CI.text,
          fontFamily: FONT.body,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {hint && (
        <span
          style={{
            fontSize: 11,
            color: CI.textMuted,
            fontFamily: FONT.body,
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
