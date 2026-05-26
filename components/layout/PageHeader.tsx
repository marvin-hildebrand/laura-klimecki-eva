'use client';

import { CI, FONT } from '@/lib/design-tokens';
import { Icon } from '@/components/ui/Icon';

export function PageHeader() {
  return (
    <div
      style={{
        height: 64,
        flex: 'none',
        borderBottom: `1px solid ${CI.border}`,
        background: CI.white,
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        gap: 16,
      }}
    >
      {/* Logo and breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: CI.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: FONT.buzz,
            fontSize: 15,
            letterSpacing: 1,
          }}
        >
          e
        </div>
        <div
          style={{
            fontFamily: FONT.head,
            fontSize: 15,
            fontWeight: 700,
            color: CI.text,
            letterSpacing: 0.3,
          }}
        >
          EVA
        </div>
        <span style={{ color: CI.textMuted, fontSize: 13 }}>/</span>
        <span style={{ fontSize: 13, color: CI.textDim, fontFamily: FONT.body }}>
          Content
        </span>
        <span style={{ color: CI.textMuted, fontSize: 13 }}>/</span>
        <span
          style={{
            fontSize: 13,
            color: CI.text,
            fontWeight: 600,
            fontFamily: FONT.body,
          }}
        >
          Instagram Thumbnails
        </span>
      </div>

      <div style={{ flex: 1 }} />

      {/* History button */}
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 12px',
          borderRadius: 9,
          background: CI.bgSoft,
          border: `1px solid ${CI.border}`,
          color: CI.textDim,
          fontSize: 12.5,
          fontFamily: FONT.body,
          cursor: 'pointer',
        }}
      >
        <Icon name="history" size={14} /> Verlauf
      </button>

      {/* User avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 999,
            background: 'linear-gradient(135deg, #8e6cb8, #6e54a0)',
            color: '#fff',
            fontFamily: FONT.head,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          LK
        </div>
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: CI.text,
            fontFamily: FONT.body,
          }}
        >
          Laura Klimecki
        </span>
      </div>
    </div>
  );
}
