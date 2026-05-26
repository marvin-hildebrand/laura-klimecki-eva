'use client';

import { CI, FONT } from '@/lib/design-tokens';
import { FieldLabel } from './FieldLabel';

interface TitleEditorProps {
  title: string;
  setTitle: (title: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export function TitleEditor({ title, setTitle }: TitleEditorProps) {
  return (
    <div>
      <FieldLabel
        label="Titel"
        hint={`${title.length} / 80 Zeichen · wird zu GROSSBUCHSTABEN`}
      />
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, 80))}
        placeholder="z.B. CLOSING IN 3 SCHRITTEN"
        rows={2}
        style={{
          width: '100%',
          padding: '14px 16px',
          background: CI.white,
          border: `1px solid ${CI.border}`,
          borderRadius: 10,
          fontSize: 14.5,
          fontFamily: FONT.body,
          color: CI.text,
          resize: 'none',
          outline: 'none',
          lineHeight: 1.5,
          letterSpacing: 0.2,
          textTransform: 'uppercase',
          fontWeight: 600,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
