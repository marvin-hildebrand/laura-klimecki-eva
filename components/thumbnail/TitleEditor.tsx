'use client';

import { CI, FONT } from '@/lib/design-tokens';
import { FieldLabel } from './FieldLabel';
import { Icon } from '@/components/ui/Icon';

interface TitleEditorProps {
  title: string;
  setTitle: (title: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export function TitleEditor({ title, setTitle, keywords, setKeywords }: TitleEditorProps) {
  const words = title.split(/(\s+)/);
  const kwSet = new Set((keywords || []).map((k) => k.toUpperCase()));

  const toggle = (w: string) => {
    const u = w.toUpperCase();
    setKeywords(
      keywords.some((k) => k.toUpperCase() === u)
        ? keywords.filter((k) => k.toUpperCase() !== u)
        : [...keywords, w]
    );
  };

  return (
    <div>
      <FieldLabel
        label="Titel"
        hint={`${title.length} / 80 Zeichen · wird zu GROSSBUCHSTABEN`}
      />
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value.slice(0, 80))}
        placeholder="z.B. Closing in 3 Schritten"
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

      <div style={{ marginTop: 18 }}>
        <FieldLabel
          label={`Schlüsselwörter${keywords.length ? ` · ${keywords.length} markiert` : ''}`}
          hint="klick auf Wörter — werden im Thumbnail hellblau"
        />
        <div
          style={{
            padding: '12px 14px',
            background: CI.bgSofter,
            border: `1px dashed ${CI.border}`,
            borderRadius: 10,
            fontFamily: FONT.body,
            fontSize: 13.5,
            lineHeight: 1.7,
            letterSpacing: 0.3,
            textTransform: 'uppercase',
            fontWeight: 600,
            minHeight: 50,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {title ? (
            words.map((w, i) => {
              if (!w.trim()) return <span key={i}>{w}</span>;
              const isKW = kwSet.has(w.trim().toUpperCase());
              return (
                <button
                  key={i}
                  onClick={() => toggle(w.trim())}
                  style={{
                    background: isKW ? CI.thumbHL : 'transparent',
                    color: isKW ? '#fff' : CI.textDim,
                    border: 'none',
                    padding: '2px 6px',
                    borderRadius: 5,
                    cursor: 'pointer',
                    fontSize: 13.5,
                    fontFamily: 'inherit',
                    fontWeight: 600,
                    letterSpacing: 'inherit',
                    textTransform: 'inherit',
                    transition: 'all .15s ease',
                  }}
                >
                  {w}
                </button>
              );
            })
          ) : (
            <span
              style={{
                color: CI.textMuted,
                fontWeight: 400,
                textTransform: 'none',
                letterSpacing: 0,
              }}
            >
              Erst Titel eingeben — dann beliebig viele Wörter anklicken.
            </span>
          )}
          {keywords.length > 0 && (
            <button
              onClick={() => setKeywords([])}
              style={{
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: CI.textMuted,
                fontSize: 10.5,
                fontFamily: FONT.body,
                fontWeight: 500,
                letterSpacing: 0.3,
                textTransform: 'none',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: 5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Icon name="x" size={10} /> Alle löschen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
