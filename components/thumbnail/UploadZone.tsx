'use client';

import { useState, useRef, useCallback } from 'react';
import { CI, FONT } from '@/lib/design-tokens';
import { FieldLabel } from './FieldLabel';
import { Icon } from '@/components/ui/Icon';

interface UploadZoneProps {
  file: File | null;
  preview: string | null;
  onFileSelect: (file: File | null, preview: string | null) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function UploadZone({ file, preview, onFileSelect }: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (selectedFile: File) => {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        alert('Bitte nur Bilder hochladen (PNG, JPG)');
        return;
      }

      // Validate file size (10 MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('Datei ist zu groß (max. 10 MB)');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(selectedFile, reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        processFile(droppedFile);
      }
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        processFile(selectedFile);
      }
    },
    [processFile]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null, null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const hasFile = file && preview;

  return (
    <div>
      <FieldLabel label="Screenshot vom Podcast-Call" hint="PNG, JPG · bis 10 MB" />
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{
          padding: hasFile ? 16 : '38px 20px',
          background: dragOver
            ? 'rgba(91,164,212,0.06)'
            : hasFile
              ? CI.white
              : CI.bgSofter,
          border: `1.5px dashed ${dragOver ? CI.thumbHL : CI.border}`,
          borderRadius: 12,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all .15s ease',
          display: hasFile ? 'flex' : 'block',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {hasFile ? (
          <>
            <div
              style={{
                width: 72,
                height: 54,
                borderRadius: 7,
                flex: 'none',
                border: `1px solid ${CI.border}`,
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${preview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: CI.text,
                  fontFamily: FONT.body,
                }}
              >
                {file.name}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: CI.textMuted,
                  marginTop: 2,
                  fontFamily: FONT.body,
                }}
              >
                {formatFileSize(file.size)} · Gast erkannt
              </div>
            </div>
            <button
              onClick={handleRemove}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: CI.textMuted,
                padding: 6,
                borderRadius: 6,
              }}
            >
              <Icon name="x" size={16} />
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 999,
                background: CI.bgSoft,
                color: CI.midBlue,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
              }}
            >
              <Icon name="upload" size={20} />
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: CI.text,
                fontFamily: FONT.body,
              }}
            >
              Drag &amp; drop Screenshot hier rein
            </div>
            <div
              style={{
                fontSize: 12,
                color: CI.textMuted,
                marginTop: 6,
                fontFamily: FONT.body,
              }}
            >
              oder{' '}
              <span style={{ color: CI.primary, fontWeight: 600 }}>zum Hochladen klicken</span>
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 11,
                color: CI.textMuted,
                fontFamily: FONT.body,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                background: CI.bgSoft,
                borderRadius: 999,
              }}
            >
              <Icon name="info" size={11} />
              EVA schneidet den Gast automatisch frei
            </div>
          </>
        )}
      </div>
    </div>
  );
}
