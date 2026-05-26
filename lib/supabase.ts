import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client only if credentials are available
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

export const STORAGE_BUCKET = 'eva-images';

// Database types — mirror supabase/migrations/001_initial_schema.sql
export interface LauraImage {
  id: string;
  name: string;
  description: string | null;
  storage_path: string;
  pose_type: 'speaking' | 'thinking' | 'presenting' | 'confident' | 'other';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InstagramPost {
  id: string;
  post_type: 'podcast' | 'value';
  title: string;
  keyword: string;
  laura_image_id: string | null;
  guest_image_storage_path: string | null;
  generated_image_storage_path: string | null;
  generated_image_url: string | null;
  prompt_used: string | null;
  status: 'draft' | 'generating' | 'ready' | 'published' | 'failed';
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

// Helper to get public URL for storage files
export function getStorageUrl(path: string): string {
  if (!path || !supabaseUrl) return '';
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

// Fetch all active Laura images
export async function fetchLauraImages(): Promise<LauraImage[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('laura_images')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching Laura images:', error);
    return [];
  }

  return data || [];
}

// Create a new Instagram post
export async function createInstagramPost(post: Partial<InstagramPost>): Promise<InstagramPost | null> {
  if (!supabase) {
    console.warn('Supabase not configured, simulating post creation');
    const now = new Date().toISOString();
    return {
      id: `demo_${Date.now()}`,
      post_type: post.post_type || 'value',
      title: post.title || '',
      keyword: post.keyword || '',
      laura_image_id: post.laura_image_id || null,
      guest_image_storage_path: post.guest_image_storage_path || null,
      generated_image_storage_path: null,
      generated_image_url: null,
      prompt_used: null,
      status: 'generating',
      error_message: null,
      created_at: now,
      updated_at: now,
    };
  }

  const { data, error } = await supabase
    .from('instagram_posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error('Error creating Instagram post:', error);
    return null;
  }

  return data;
}

// Update Instagram post status
export async function updatePostStatus(
  postId: string,
  status: InstagramPost['status'],
  generatedImagePath?: string,
  generatedImageUrl?: string
): Promise<boolean> {
  if (!supabase) {
    console.warn('Supabase not configured, simulating status update');
    return true;
  }

  const updates: Partial<InstagramPost> = { status };
  if (generatedImagePath) {
    updates.generated_image_storage_path = generatedImagePath;
  }
  if (generatedImageUrl) {
    updates.generated_image_url = generatedImageUrl;
  }

  const { error } = await supabase
    .from('instagram_posts')
    .update(updates)
    .eq('id', postId);

  if (error) {
    console.error('Error updating post status:', error);
    return false;
  }

  return true;
}

// Fetch recent posts for history
export async function fetchRecentPosts(limit = 4): Promise<InstagramPost[]> {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('instagram_posts')
    .select('*')
    .in('status', ['ready', 'published'])
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }

  return data || [];
}

// Upload guest image for podcast posts
export async function uploadGuestImage(file: File): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured, simulating upload');
    return `guests/demo_${Date.now()}.jpg`;
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `guest_${Date.now()}.${fileExt}`;
  const filePath = `guests/${fileName}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading guest image:', error);
    return null;
  }

  return filePath;
}
