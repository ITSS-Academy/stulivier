export interface PlaylistModel {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  is_public: boolean;
  user_id: string;
  video_id: string[];
}

export interface CreatePlaylistModel {
  title: string;
  description: string;
  user_id: string;
  is_public: boolean;
}
