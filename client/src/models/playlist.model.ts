import { VideoModel } from './video.model';

export interface PlaylistModel {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  is_public: boolean;
  user_id: string;
  video_id: string[];
}

export interface PlaylistDetailModel {
  playlist: PlaylistModel;
  videos: VideoModel[];
}

export interface CreatePlaylistDto {
  title: string;
  description: string;
  is_public: boolean;
  user_id: string;
}
