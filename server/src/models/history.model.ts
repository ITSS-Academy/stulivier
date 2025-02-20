import { VideoModel } from './video.model';

export interface HistoryModel {
  watched_at: string;
  videos: {
    video_details: VideoModel;
    resume_position: number;
  }[];
}
