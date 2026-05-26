'use client';

import { CI, FONT } from '@/lib/design-tokens';
import { Icon } from '@/components/ui/Icon';
import { PostType } from './ThumbnailPreview';

interface TypeToggleProps {
  value: PostType;
  onChange: (value: PostType) => void;
}

const options: { id: PostType; label: string; icon: 'podcast' | 'sparkle' }[] = [
  { id: 'podcast', label: 'Podcast-Post', icon: 'podcast' },
  { id: 'value', label: 'Value-Post', icon: 'sparkle' },
];

export function TypeToggle({ value, onChange }: TypeToggleProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 4,
        background: CI.bgSoft,
        borderRadius: 11,
        border: `1px solid ${CI.border}`,
        gap: 2,
      }}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 16px',
              borderRadius: 8,
              background: active ? CI.white : 'transparent',
              color: active ? CI.primary : CI.textDim,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: FONT.body,
              cursor: 'pointer',
              boxShadow: active
                ? '0 1px 2px rgba(52,81,104,0.10), 0 0 0 1px rgba(52,81,104,0.06)'
                : 'none',
              transition: 'all .18s ease',
            }}
          >
            <Icon name={opt.icon} size={14} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
