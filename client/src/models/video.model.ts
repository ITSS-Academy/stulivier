export interface VideoModel {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  likes: number;
  dislikes: number;
  created_at: string;
  user_id: string;
  reaction_type: string;
  resume_position: number;
  category_id: string;
}

export interface CreateVideoDto {
  title: string;
  description: string;
}
