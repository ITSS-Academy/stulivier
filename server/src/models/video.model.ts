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
  resume_position: number;
  reaction_type: string;
  category_id: string[];
  user: {
    username: string;
    avatar_url: string;
  };
}

export interface CreateVideoModel {
  title: string;
  description: string;
  category_id: string[];
  playlist_id: string[];
}
