/*
  # News Widget Schema Setup

  1. New Tables
    - `news_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `url` (text)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
  2. Security
    - Enable RLS on `news_items` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  url text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

-- Allow users to read all news items
CREATE POLICY "Anyone can read news items"
  ON news_items
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create news items
CREATE POLICY "Authenticated users can create news items"
  ON news_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own news items
CREATE POLICY "Users can update own news items"
  ON news_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own news items
CREATE POLICY "Users can delete own news items"
  ON news_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);