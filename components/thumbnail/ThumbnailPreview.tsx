'use client';

import { CSSProperties, ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { CI, FONT } from '@/lib/design-tokens';

export type PostType = 'podcast' | 'value';

interface ThumbnailPreviewProps {
  type: PostType;
  title: string;
  keywords?: string[];
  scale?: number;
  podcastImg?: string | null;
  lauraImg?: string | null;
}

export function ThumbnailPreview({
  type,
  title,
  keywords = [],
  scale = 1,
  podcastImg,
  lauraImg,
}: ThumbnailPreviewProps) {
  // 1080x1350 logical, scaled for preview
  const W = 432 * scale;
  const H = 540 * scale;

  const kwSet = new Set((keywords || []).map((k) => k.toUpperCase()));

  const renderTitle = () => {
    const words = (title || '').toUpperCase().split(/(\s+)/);
    return words.map((w, i) => {
      const isKW = w.trim() && kwSet.has(w.trim());
      return (
        <span key={i} style={{ color: isKW ? CI.thumbHL : CI.thumbWhite }}>
          {w}
        </span>
      );
    });
  };

  const containerStyle: CSSProperties = {
    width: W,
    height: H,
    borderRadius: 14 * scale,
    background: CI.thumbBg,
    position: 'relative',
    overflow: 'hidden',
    boxShadow:
      '0 24px 48px -20px rgba(30,58,95,0.35), 0 8px 24px -12px rgba(30,58,95,0.20)',
    fontFamily: FONT.head,
    color: CI.thumbWhite,
  };

  const gradientOverlay: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(ellipse at 20% 0%, rgba(91,164,212,0.18) 0%, transparent 55%),
                 radial-gradient(ellipse at 100% 100%, rgba(190,184,175,0.08) 0%, transparent 55%)`,
  };

  return (
    <div style={containerStyle}>
      <div style={gradientOverlay} />

      {type === 'podcast' ? (
        <PodcastLayout
          title={title}
          renderTitle={renderTitle}
          scale={scale}
          podcastImg={podcastImg}
          lauraImg={lauraImg}
        />
      ) : (
        <ValueLayout
          title={title}
          renderTitle={renderTitle}
          scale={scale}
          lauraImg={lauraImg}
        />
      )}
    </div>
  );
}

// Podcast Layout Component
function PodcastLayout({
  renderTitle,
  scale,
  podcastImg,
  lauraImg,
}: {
  title: string;
  renderTitle: () => ReactNode;
  scale: number;
  podcastImg?: string | null;
  lauraImg?: string | null;
}) {
  return (
    <>
      {/* Mic icon top-left */}
      <div
        style={{
          position: 'absolute',
          top: 28 * scale,
          left: 28 * scale,
          width: 44 * scale,
          height: 44 * scale,
          borderRadius: 999,
          background: 'rgba(91,164,212,0.15)',
          border: `1.5px solid ${CI.thumbHL}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: CI.thumbHL,
        }}
      >
        <Icon name="mic" size={22 * scale} />
      </div>

      {/* "PODCAST" eyebrow */}
      <div
        style={{
          position: 'absolute',
          top: 38 * scale,
          left: 88 * scale,
          fontFamily: FONT.dec,
          fontSize: 14 * scale,
          letterSpacing: 4 * scale,
          color: CI.thumbHL,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        Podcast
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 100 * scale,
          left: 28 * scale,
          right: 28 * scale,
          fontFamily: FONT.head,
          fontWeight: 900,
          fontSize: 38 * scale,
          lineHeight: 1.05,
          letterSpacing: -0.5 * scale,
        }}
      >
        {renderTitle()}
      </div>

      {/* Two-person row at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 220 * scale,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
          padding: `0 ${24 * scale}px ${24 * scale}px`,
        }}
      >
        <PersonTile label="Laura K." sub="Sales-Coach" img={lauraImg} scale={scale} />
        <PersonTile
          label="Gast"
          sub="Podcast-Screenshot"
          img={podcastImg}
          scale={scale}
          dashed={!podcastImg}
        />
      </div>

      {/* Decorative dot row */}
      <div
        style={{
          position: 'absolute',
          bottom: 14 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6 * scale,
        }}
      >
        <span
          style={{
            width: 4 * scale,
            height: 4 * scale,
            borderRadius: 999,
            background: CI.thumbHL,
          }}
        />
        <span
          style={{
            width: 4 * scale,
            height: 4 * scale,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.4)',
          }}
        />
        <span
          style={{
            width: 4 * scale,
            height: 4 * scale,
            borderRadius: 999,
            background: 'rgba(255,255,255,0.4)',
          }}
        />
      </div>
    </>
  );
}

// Value Post Layout Component
function ValueLayout({
  renderTitle,
  scale,
  lauraImg,
}: {
  title: string;
  renderTitle: () => ReactNode;
  scale: number;
  lauraImg?: string | null;
}) {
  return (
    <>
      {/* "VALUE" eyebrow */}
      <div
        style={{
          position: 'absolute',
          top: 32 * scale,
          right: 28 * scale,
          fontFamily: FONT.dec,
          fontSize: 14 * scale,
          letterSpacing: 4 * scale,
          color: CI.thumbHL,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        Sales Insight
      </div>

      {/* Laura on left (portrait area) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          top: 90 * scale,
          width: '46%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <PersonPortrait img={lauraImg} scale={scale} />
      </div>

      {/* Title on the right */}
      <div
        style={{
          position: 'absolute',
          right: 28 * scale,
          top: 100 * scale,
          bottom: 100 * scale,
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontFamily: FONT.head,
          fontWeight: 900,
          fontSize: 36 * scale,
          lineHeight: 1.08,
          letterSpacing: -0.4 * scale,
          textAlign: 'right',
        }}
      >
        <div>{renderTitle()}</div>
      </div>

      {/* Bottom signature */}
      <div
        style={{
          position: 'absolute',
          bottom: 24 * scale,
          right: 28 * scale,
          fontFamily: FONT.body,
          fontSize: 11 * scale,
          letterSpacing: 2 * scale,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        laura klimecki
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24 * scale,
          left: 28 * scale,
          width: 28 * scale,
          height: 28 * scale,
          borderRadius: 999,
          background: CI.thumbHL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: FONT.buzz,
          fontSize: 12 * scale,
        }}
      >
        LK
      </div>
    </>
  );
}

// Person Tile Component (for podcast)
function PersonTile({
  label,
  sub,
  img,
  scale = 1,
  dashed,
}: {
  label: string;
  sub: string;
  img?: string | null;
  scale?: number;
  dashed?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: 10 * scale,
        overflow: 'hidden',
        border: dashed
          ? `1.5px dashed rgba(91,164,212,0.45)`
          : `1px solid rgba(255,255,255,0.10)`,
        background: img ? '#0F2236' : 'rgba(255,255,255,0.04)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {img ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: img,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.5)',
            flexDirection: 'column',
            gap: 4 * scale,
          }}
        >
          <Icon name="user" size={28 * scale} />
          <span
            style={{
              fontSize: 10 * scale,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontFamily: FONT.body,
            }}
          >
            {sub}
          </span>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: `${8 * scale}px ${10 * scale}px`,
          background: 'linear-gradient(to top, rgba(15,34,54,0.85), transparent)',
          fontFamily: FONT.body,
          fontSize: 13 * scale,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// Person Portrait Component (for value post)
function PersonPortrait({ img, scale = 1 }: { img?: string | null; scale?: number }) {
  return (
    <div
      style={{
        width: '90%',
        height: '92%',
        borderRadius: 0,
        background: img || 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        position: 'relative',
        display: img ? 'block' : 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {!img && (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(91,164,212,0.10), transparent 60%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            flexDirection: 'column',
            gap: 6 * scale,
          }}
        >
          <Icon name="user" size={56 * scale} />
          <span
            style={{
              fontSize: 11 * scale,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: FONT.body,
            }}
          >
            Laura
          </span>
        </div>
      )}
    </div>
  );
}
