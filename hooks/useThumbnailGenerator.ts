'use client';

import { useState, useCallback } from 'react';
import { createInstagramPost, updatePostStatus, uploadGuestImage } from '@/lib/supabase';

interface GenerateOptions {
  postType: 'podcast' | 'value';
  title: string;
  keywords: string[];
  lauraImageId?: string;
  guestImageFile?: File;
}

interface GenerateResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  postId?: string;
}

export function useThumbnailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [result, setResult] = useState<GenerateResult | null>(null);

  const generate = useCallback(async (options: GenerateOptions): Promise<GenerateResult> => {
    setIsGenerating(true);
    setProgress('Erstelle Post...');
    setResult(null);

    try {
      // Upload guest image if podcast type
      let guestImagePath: string | null = null;
      if (options.postType === 'podcast' && options.guestImageFile) {
        setProgress('Lade Gast-Bild hoch...');
        guestImagePath = await uploadGuestImage(options.guestImageFile);
        if (!guestImagePath) {
          throw new Error('Fehler beim Hochladen des Gast-Bildes');
        }
      }

      // Create post record in database
      setProgress('Speichere in Datenbank...');
      const post = await createInstagramPost({
        post_type: options.postType,
        title: options.title,
        keyword: options.keywords.join(', '),
        laura_image_id: options.lauraImageId || null,
        guest_image_storage_path: guestImagePath,
        status: 'generating',
      });

      if (!post) {
        throw new Error('Fehler beim Erstellen des Posts');
      }

      // Call n8n webhook
      setProgress('Generiere Thumbnail...');
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        // Fallback: simulate generation for development
        console.warn('N8N Webhook URL not configured, simulating...');
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const successResult: GenerateResult = {
          success: true,
          postId: post.id,
          imageUrl: undefined, // No actual image in dev mode
        };
        setResult(successResult);
        return successResult;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          postType: options.postType,
          title: options.title,
          keywords: options.keywords,
          lauraImageId: options.lauraImageId,
          guestImagePath: guestImagePath,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook Fehler: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.imageUrl) {
        // Update post with generated image URL
        await updatePostStatus(post.id, 'ready', undefined, data.imageUrl);

        const successResult: GenerateResult = {
          success: true,
          postId: post.id,
          imageUrl: data.imageUrl,
        };
        setResult(successResult);
        return successResult;
      } else {
        await updatePostStatus(post.id, 'failed');
        throw new Error(data.error || 'Unbekannter Fehler bei der Generierung');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      const errorResult: GenerateResult = {
        success: false,
        error: errorMessage,
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsGenerating(false);
      setProgress('');
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setProgress('');
  }, []);

  return {
    generate,
    isGenerating,
    progress,
    result,
    reset,
  };
}
