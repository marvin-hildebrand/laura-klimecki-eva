'use client';

import { useState, useCallback, useEffect } from 'react';
import { CI, FONT } from '@/lib/design-tokens';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ThumbnailPreview, PostType } from '@/components/thumbnail/ThumbnailPreview';
import { TypeToggle } from '@/components/thumbnail/TypeToggle';
import { TitleEditor } from '@/components/thumbnail/TitleEditor';
import { FieldLabel } from '@/components/thumbnail/FieldLabel';
import { LauraGrid, LAURA_IMAGES, imgGradient } from '@/components/thumbnail/LauraGrid';
import { UploadZone } from '@/components/thumbnail/UploadZone';
import { useThumbnailGenerator } from '@/hooks/useThumbnailGenerator';
import { fetchRecentPosts } from '@/lib/supabase';

// Fallback history for when Supabase is not connected
const FALLBACK_HISTORY = [
  { id: 'h1', type: 'value' as const, title: 'Closing in 3 Schritten', keywords: ['3'] },
  { id: 'h2', type: 'podcast' as const, title: 'Mindset im Sales', keywords: ['Mindset'] },
  { id: 'h3', type: 'value' as const, title: 'Einwand-Behandlung 101', keywords: ['101'] },
  { id: 'h4', type: 'podcast' as const, title: 'Team-Performance', keywords: ['Performance'] },
];

export default function InstagramThumbnailCreator() {
  // Form state
  const [type, setType] = useState<PostType>('value');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [lauraId, setLauraId] = useState('l3');

  // Podcast upload state
  const [guestFile, setGuestFile] = useState<File | null>(null);
  const [guestPreview, setGuestPreview] = useState<string | null>(null);

  // Generated image state
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // History state
  const [historyPosts, setHistoryPosts] = useState(FALLBACK_HISTORY);

  // Thumbnail generator hook
  const { generate, isGenerating, progress, result } = useThumbnailGenerator();

  // Load history posts on mount
  useEffect(() => {
    fetchRecentPosts(4).then((posts) => {
      if (posts.length > 0) {
        const mappedHistory = posts.map((post) => ({
          id: post.id,
          type: post.post_type,
          title: post.title,
          keywords: post.keyword.split(',').map((k) => k.trim()),
          imageUrl: post.generated_image_url,
        }));
        setHistoryPosts(mappedHistory as any);
      }
    });
  }, []);

  // Handle file selection for podcast
  const handleFileSelect = useCallback((file: File | null, preview: string | null) => {
    setGuestFile(file);
    setGuestPreview(preview);
  }, []);

  // Handle generate button click
  const handleGenerate = async () => {
    const generateResult = await generate({
      postType: type,
      title,
      keywords,
      lauraImageId: type === 'value' ? lauraId : undefined,
      guestImageFile: type === 'podcast' ? guestFile || undefined : undefined,
    });

    if (generateResult.success && generateResult.imageUrl) {
      setGeneratedImageUrl(generateResult.imageUrl);
    }
  };

  // Handle reset
  const handleReset = () => {
    setTitle('');
    setKeywords([]);
    setGuestFile(null);
    setGuestPreview(null);
    setGeneratedImageUrl(null);
  };

  // Handle download
  const handleDownload = async () => {
    if (!generatedImageUrl) return;

    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const fileName = `${title.replace(/\s+/g, '-').toLowerCase()}_${Date.now()}.jpg`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Handle Instagram post
  const handleInstagramPost = () => {
    window.open('https://www.instagram.com/', '_blank');
  };

  // Compute preview images
  const lauraImg = imgGradient(LAURA_IMAGES.find((l) => l.id === lauraId)?.hue || 210);
  const podcastImg = guestPreview || (guestFile ? imgGradient(195) : null);

  // Validation
  const isValid = title.trim().length > 0 && keywords.length > 0 &&
    (type === 'value' || (type === 'podcast' && guestFile));

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: CI.bgSoft,
        color: CI.text,
        fontFamily: FONT.body,
        fontSize: 13.5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PageHeader />

      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '40px 48px 64px',
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {/* Page heading */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontFamily: FONT.dec,
                fontSize: 14,
                color: CI.midBlue,
                letterSpacing: 4,
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Content · Instagram
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: FONT.head,
                fontSize: 36,
                fontWeight: 800,
                color: CI.text,
                letterSpacing: -0.5,
                lineHeight: 1.1,
              }}
            >
              Thumbnail in 30 Sekunden.
            </h1>
            <p
              style={{
                margin: '10px 0 0',
                fontSize: 14,
                color: CI.textDim,
                fontFamily: FONT.body,
                lineHeight: 1.6,
                maxWidth: 620,
              }}
            >
              Wähle einen Post-Typ, gib einen Titel ein, markiere das Schlüsselwort. EVA generiert
              das fertige 1080 × 1350 Instagram-Format — bereit zum Posten.
            </p>
          </div>

          {/* Two columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 28,
              alignItems: 'flex-start',
            }}
          >
            {/* LEFT — Input panel */}
            <div
              style={{
                background: CI.white,
                border: `1px solid ${CI.border}`,
                borderRadius: 16,
                padding: 32,
                boxShadow:
                  '0 1px 0 rgba(52,81,104,0.02), 0 8px 24px -16px rgba(52,81,104,0.12)',
              }}
            >
              <div style={{ marginBottom: 24 }}>
                <FieldLabel label="Post-Typ" />
                <TypeToggle value={type} onChange={setType} />
              </div>

              <TitleEditor
                title={title}
                setTitle={setTitle}
                keywords={keywords}
                setKeywords={setKeywords}
              />

              <div style={{ marginTop: 28 }}>
                {type === 'podcast' ? (
                  <UploadZone
                    file={guestFile}
                    preview={guestPreview}
                    onFileSelect={handleFileSelect}
                  />
                ) : (
                  <LauraGrid selectedId={lauraId} setSelectedId={setLauraId} />
                )}
              </div>

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: `1px solid ${CI.borderSoft}`,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <Button
                  kind="primary"
                  size="lg"
                  icon={isGenerating ? undefined : 'wand'}
                  style={{ flex: 1 }}
                  onClick={handleGenerate}
                  disabled={!isValid || isGenerating}
                >
                  {isGenerating ? progress || 'Generiere...' : 'Thumbnail generieren'}
                </Button>
                <Button kind="secondary" size="lg" icon="undo" onClick={handleReset} />
              </div>

              {/* Error message */}
              {result && !result.success && (
                <div
                  style={{
                    marginTop: 16,
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: 'rgba(184, 90, 90, 0.1)',
                    border: '1px solid rgba(184, 90, 90, 0.3)',
                    color: '#B85A5A',
                    fontSize: 13,
                    fontFamily: FONT.body,
                  }}
                >
                  {result.error}
                </div>
              )}
            </div>

            {/* RIGHT — Preview panel */}
            <div style={{ position: 'sticky', top: 24 }}>
              <div
                style={{
                  background: CI.white,
                  border: `1px solid ${CI.border}`,
                  borderRadius: 16,
                  padding: 32,
                  boxShadow:
                    '0 1px 0 rgba(52,81,104,0.02), 0 8px 24px -16px rgba(52,81,104,0.12)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
                  <FieldLabel label="Live Preview" />
                  <div style={{ flex: 1 }} />
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(91,164,212,0.10)',
                      border: `1px solid rgba(91,164,212,0.30)`,
                      color: '#3D7BA8',
                      fontSize: 11,
                      fontWeight: 600,
                      fontFamily: FONT.body,
                      letterSpacing: 0.3,
                      textTransform: 'uppercase',
                    }}
                  >
                    <Icon name="instagram" size={11} />
                    1080 × 1350
                  </div>
                </div>

                {/* The thumbnail preview, loading state, or generated image */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px 0 16px',
                    minHeight: 440,
                  }}
                >
                  {isGenerating ? (
                    <div
                      style={{
                        width: 337,
                        height: 421,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #345168 0%, #2A4356 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                        boxShadow:
                          '0 24px 48px -20px rgba(30,58,95,0.35), 0 8px 24px -12px rgba(30,58,95,0.20)',
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          border: '3px solid rgba(255,255,255,0.2)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      <div
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontFamily: FONT.body,
                          fontWeight: 500,
                        }}
                      >
                        {progress || 'Generiere Thumbnail...'}
                      </div>
                    </div>
                  ) : generatedImageUrl ? (
                    <img
                      src={generatedImageUrl}
                      alt="Generated Thumbnail"
                      style={{
                        width: 337,
                        height: 421,
                        borderRadius: 14,
                        objectFit: 'cover',
                        boxShadow:
                          '0 24px 48px -20px rgba(30,58,95,0.35), 0 8px 24px -12px rgba(30,58,95,0.20)',
                      }}
                    />
                  ) : (
                    <ThumbnailPreview
                      type={type}
                      title={title}
                      keywords={keywords}
                      podcastImg={podcastImg}
                      lauraImg={lauraImg}
                      scale={0.78}
                    />
                  )}
                </div>

                <style jsx>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>

                <div
                  style={{
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: `1px solid ${CI.borderSoft}`,
                    display: 'flex',
                    gap: 10,
                  }}
                >
                  <Button
                    kind="outline"
                    icon="download"
                    style={{ flex: 1 }}
                    onClick={handleDownload}
                    disabled={!generatedImageUrl || isGenerating}
                  >
                    Download JPG
                  </Button>
                  <Button
                    kind="primary"
                    icon="instagram"
                    style={{ flex: 1 }}
                    onClick={handleInstagramPost}
                    disabled={!generatedImageUrl || isGenerating}
                  >
                    Auf Instagram posten
                  </Button>
                </div>
              </div>

              {/* History strip */}
              <div
                style={{
                  marginTop: 18,
                  background: CI.white,
                  border: `1px solid ${CI.border}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: CI.text,
                      fontFamily: FONT.body,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                    }}
                  >
                    Zuletzt erstellt
                  </div>
                  <div style={{ flex: 1 }} />
                  <button
                    style={{
                      fontSize: 11.5,
                      color: CI.midBlue,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: FONT.body,
                      fontWeight: 600,
                    }}
                  >
                    Alle ansehen →
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 10,
                  }}
                >
                  {historyPosts.map((h: any) => (
                    <div
                      key={h.id}
                      style={{
                        aspectRatio: '4/5',
                        borderRadius: 8,
                        background: h.imageUrl ? 'transparent' : CI.thumbBg,
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: `1px solid ${CI.borderSoft}`,
                      }}
                    >
                      {h.imageUrl ? (
                        <img
                          src={h.imageUrl}
                          alt={h.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <>
                          <div
                            style={{
                              padding: '10px 10px 0',
                              fontFamily: FONT.head,
                              fontWeight: 800,
                              fontSize: 9.5,
                              lineHeight: 1.15,
                              color: '#fff',
                              textTransform: 'uppercase',
                              letterSpacing: -0.1,
                            }}
                          >
                            {h.title.split(' ').map((w: string, i: number) => {
                              const hit = h.keywords.some(
                                (k: string) => k.toLowerCase() === w.toLowerCase()
                              );
                              return (
                                <span key={i} style={{ color: hit ? CI.thumbHL : '#fff' }}>
                                  {w}{' '}
                                </span>
                              );
                            })}
                          </div>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 6,
                              left: 8,
                              fontSize: 8,
                              color: 'rgba(255,255,255,0.6)',
                              fontFamily: FONT.body,
                              letterSpacing: 1,
                              textTransform: 'uppercase',
                            }}
                          >
                            {h.type}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
