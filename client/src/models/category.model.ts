import { VideoModel } from './video.model';

export interface CategoryModel {
  id: string;
  img_url: string;
  name: string;
  number_of_videos: number;
}

export interface CategoryDetailModel {
  id: string;
  name: string;
  videos: VideoModel[];
}
