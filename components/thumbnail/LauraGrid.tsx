'use client';

import { useState } from 'react';
import { CI, FONT } from '@/lib/design-tokens';
import { FieldLabel } from './FieldLabel';
import { Icon } from '@/components/ui/Icon';

export interface LauraImage {
  id: string;
  tag: string;
  hue: number;
  url?: string;
}

// Placeholder images (will be replaced with Supabase data)
export const LAURA_IMAGES: LauraImage[] = [
  { id: 'l1', tag: 'sprechend', hue: 200 },
  { id: 'l2', tag: 'erklärend', hue: 210 },
  { id: 'l3', tag: 'selbstbewusst', hue: 220 },
  { id: 'l4', tag: 'lachend', hue: 195 },
  { id: 'l5', tag: 'fokussiert', hue: 215 },
  { id: 'l6', tag: 'gestikulierend', hue: 205 },
];

// Placeholder gradient (since we don't have real photos yet)
export const imgGradient = (hue: number) => {
  const a = `hsl(${hue}, 32%, 38%)`;
  const b = `hsl(${hue}, 22%, 22%)`;
  return `linear-gradient(155deg, ${a} 0%, ${b} 100%)`;
};

interface LauraGridProps {
  selectedId: string;
  setSelectedId: (id: string) => void;
  images?: LauraImage[];
}

export function LauraGrid({
  selectedId,
  setSelectedId,
  images = LAURA_IMAGES,
}: LauraGridProps) {
  const [filter, setFilter] = useState('alle');
  const tags = ['alle', 'sprechend', 'erklärend', 'selbstbewusst', 'lachend'];
  const filtered = filter === 'alle' ? images : images.filter((l) => l.tag === filter);

  return (
    <div>
      <FieldLabel label="Laura-Bild wählen" hint={`${images.length} Bilder in der Datenbank`} />

      {/* Pose tags filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: '5px 11px',
              borderRadius: 999,
              background: filter === t ? CI.primary : CI.white,
              color: filter === t ? '#fff' : CI.textDim,
              border: `1px solid ${filter === t ? CI.primary : CI.border}`,
              fontSize: 11.5,
              fontFamily: FONT.body,
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: 0.2,
              transition: 'all .15s ease',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {filtered.map((l) => {
          const sel = selectedId === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setSelectedId(l.id)}
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                background: l.url || imgGradient(l.hue),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 10,
                overflow: 'hidden',
                border: `2px solid ${sel ? CI.primary : 'transparent'}`,
                cursor: 'pointer',
                padding: 0,
                transition: 'all .15s ease',
                boxShadow: sel ? '0 4px 12px rgba(52,81,104,0.18)' : 'none',
              }}
            >
              {/* Placeholder portrait silhouette */}
              {!l.url && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  <Icon name="user" size={56} />
                </div>
              )}

              {sel && (
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: CI.primary,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  <Icon name="check" size={13} />
                </div>
              )}

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '8px 10px 7px',
                  background: 'linear-gradient(to top, rgba(15,34,54,0.85), transparent)',
                  fontSize: 10.5,
                  fontFamily: FONT.body,
                  fontWeight: 500,
                  color: '#fff',
                  textAlign: 'left',
                  letterSpacing: 0.4,
                  textTransform: 'lowercase',
                }}
              >
                {l.tag}
              </div>
            </button>
          );
        })}
      </div>

      <button
        style={{
          marginTop: 10,
          width: '100%',
          padding: '10px',
          borderRadius: 9,
          background: 'transparent',
          border: `1px dashed ${CI.border}`,
          color: CI.textDim,
          fontFamily: FONT.body,
          fontSize: 12.5,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <Icon name="grid" size={13} /> Alle Bilder anzeigen
      </button>
    </div>
  );
}
