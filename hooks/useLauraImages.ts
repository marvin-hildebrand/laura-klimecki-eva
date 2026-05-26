'use client';

import { useState, useEffect } from 'react';
import { fetchLauraImages, getStorageUrl, LauraImage } from '@/lib/supabase';

// Map pose_type to German tags
const poseTypeToTag: Record<string, string> = {
  speaking: 'sprechend',
  thinking: 'nachdenklich',
  presenting: 'präsentierend',
  confident: 'selbstbewusst',
  other: 'andere',
};

export interface LauraImageWithUrl extends LauraImage {
  url: string;
  tag: string;
}

export function useLauraImages() {
  const [images, setImages] = useState<LauraImageWithUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        const data = await fetchLauraImages();

        const imagesWithUrls: LauraImageWithUrl[] = data.map((img) => ({
          ...img,
          url: getStorageUrl(img.storage_path),
          tag: poseTypeToTag[img.pose_type] || img.pose_type,
        }));

        setImages(imagesWithUrls);
        setError(null);
      } catch (err) {
        console.error('Failed to load Laura images:', err);
        setError('Fehler beim Laden der Bilder');
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  return { images, loading, error, refetch: () => {} };
}
