export interface VideoModel {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  dislikes: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  resume_position: number;
  reaction_type: string;
}

export interface CreateVideoModel {
  title: string;
  description: string;
}
