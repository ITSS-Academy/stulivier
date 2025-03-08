export interface VideoModel {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  views: number;
  created_at: string;
  is_liked: boolean;
  user_id: string;
  resume_position: number;
  user_data: {
    username: string;
    avatar_url: string;
  };
}

export interface CreateVideoDto {
  title: string;
  description: string;
  category_id: string[];
  playlist_id: string[];
}
