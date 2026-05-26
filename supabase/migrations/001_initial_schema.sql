-- EVA Instagram Thumbnail Creator - Initial Schema
-- Run this in your Supabase SQL Editor

-- Laura's reference images for posts
CREATE TABLE IF NOT EXISTS laura_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  storage_path TEXT NOT NULL,  -- Path in Supabase Storage
  pose_type TEXT CHECK (pose_type IN ('speaking', 'thinking', 'presenting', 'confident', 'other')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Instagram posts
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_type TEXT NOT NULL CHECK (post_type IN ('podcast', 'value')),
  title TEXT NOT NULL,
  keyword TEXT NOT NULL,
  laura_image_id UUID REFERENCES laura_images(id),
  guest_image_storage_path TEXT,  -- For podcast posts
  generated_image_storage_path TEXT,
  generated_image_url TEXT,  -- Public URL after generation
  prompt_used TEXT,  -- The AI prompt that was used
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'ready', 'published', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE laura_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Policies (adjust based on your auth setup)
-- For now, allow all authenticated users
CREATE POLICY "Allow all for authenticated users" ON laura_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON instagram_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('eva-images', 'eva-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'eva-images');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'eva-images' AND auth.role() = 'authenticated');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER laura_images_updated_at
  BEFORE UPDATE ON laura_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insert some sample Laura images (placeholders)
INSERT INTO laura_images (name, description, storage_path, pose_type) VALUES
  ('Pose 1 - Sprechend', 'Hand zur Brust, erklärend', 'laura/pose1.jpg', 'speaking'),
  ('Pose 2 - Nachdenklich', 'Kinn auf Hand, nachdenklich', 'laura/pose2.jpg', 'thinking'),
  ('Pose 3 - Präsentierend', 'Offene Handhaltung', 'laura/pose3.jpg', 'presenting'),
  ('Pose 4 - Selbstbewusst', 'Verschränkte Arme', 'laura/pose4.jpg', 'confident')
ON CONFLICT DO NOTHING;
