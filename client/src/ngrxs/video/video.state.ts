import { VideoModel } from '../../models/video.model';

export interface VideoState {
  video: VideoModel;
  videos: VideoModel[];
  isMuteVolume: boolean;

  isGettingAllVideos: boolean;
  isGetAllVideosSuccess: boolean;
  getAllVideosErrorMessage: string;

  isGettingVideoById: boolean;
  isGetVideoByIdSuccess: boolean;
  getVideoByIdErrorMessage: string;

  isGettingVideosByUserId: boolean;
  isGetVideosByUserIdSuccess: boolean;
  getVideosByUserIdErrorMessage: string;

  isGettingVideoByCategoryId: boolean;
  isGetVideoByCategoryIdSuccess: boolean;
  getVideoByCategoryIdErrorMessage: string;

  isCreatingVideo: boolean;
  isCreateVideoSuccess: boolean;
  createVideoErrorMessages: string;

  isUpdatingWatchTime: boolean;
  isUpdateWatchTimeSuccess: boolean;
  updateWatchTimeErrorMessages: string;

  isIncreasingViewCount: boolean;
  isIncreaseViewCountSuccess: boolean;
  increaseViewCountErrorMessages: string;

  isToggleReaction: boolean;
  isToggleReactionSuccess: boolean;
  toggleReactionErrorMessages: string;

  isSearchingVideos: boolean;
  isSearchVideosSuccess: boolean;
  searchVideosErrorMessage: string;

  isGettingVideosLikedByUser: boolean;
  isGetVideosLikedByUserSuccess: boolean;
  getVideosLikedByUserErrorMessage: string;

  isUpdatingVideo: boolean;
  isUpdateVideoSuccess: boolean;
  updateVideoErrorMessages: string;

  isDeletingVideo: boolean;
  isDeleteVideoSuccess: boolean;
  deleteVideoErrorMessages: string;

  isAddingToHistory: boolean;
  isAddToHistorySuccess: boolean;
  addToHistoryErrorMessages: string;
}
