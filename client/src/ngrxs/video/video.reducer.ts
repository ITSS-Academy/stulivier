import { createReducer, on } from '@ngrx/store';
import { VideoState } from './video.state';
import * as VideoActions from './video.actions';
import { VideoModel } from '../../models/video.model';

const initialState: VideoState = {
  video: <VideoModel>{},
  videos: [],
  isMuteVolume: false,

  isCreatingVideo: false,
  isCreateVideoSuccess: false,
  createVideoErrorMessages: '',

  isGettingAllVideos: false,
  isGetAllVideosSuccess: false,
  getAllVideosErrorMessage: '',

  isGettingVideoById: false,
  isGetVideoByIdSuccess: false,
  getVideoByIdErrorMessage: '',

  isUpdatingWatchTime: false,
  isUpdateWatchTimeSuccess: false,
  updateWatchTimeErrorMessages: '',

  isIncreasingViewCount: false,
  isIncreaseViewCountSuccess: false,
  increaseViewCountErrorMessages: '',

  isGettingVideoByCategoryId: false,
  isGetVideoByCategoryIdSuccess: false,
  getVideoByCategoryIdErrorMessage: '',

  isToggleReaction: false,
  isToggleReactionSuccess: false,
  toggleReactionErrorMessages: '',

  isSearchingVideos: false,
  isSearchVideosSuccess: false,
  searchVideosErrorMessage: '',

  isGettingVideosByUserId: false,
  isGetVideosByUserIdSuccess: false,
  getVideosByUserIdErrorMessage: '',

  isGettingVideosLikedByUser: false,
  isGetVideosLikedByUserSuccess: false,
  getVideosLikedByUserErrorMessage: '',

  isUpdatingVideo: false,
  isUpdateVideoSuccess: false,
  updateVideoErrorMessages: '',

  isDeletingVideo: false,
  isDeleteVideoSuccess: false,
  deleteVideoErrorMessages: '',

  isAddingToHistory: false,
  isAddToHistorySuccess: false,
  addToHistoryErrorMessages: '',
};

export const videoReducer = createReducer(
  initialState,
  on(VideoActions.createVideo, (state, action) => {
    return <VideoState>{
      ...state,
      isCreatingVideo: true,
      isCreateVideoSuccess: false,
    };
  }),

  on(VideoActions.createVideoSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isCreatingVideo: false,
      isCreateVideoSuccess: true,
    };
  }),

  on(VideoActions.createVideoFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isCreatingVideo: false,
      createVideoErrorMessages: action.error,
    };
  }),

  on(VideoActions.getAllVideos, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingAllVideos: true,
      isGetAllVideosSuccess: false,
    };
  }),

  on(VideoActions.getAllVideosSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingAllVideos: false,
      isGetAllVideosSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getAllVideosFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingAllVideos: false,
      getAllVideosErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideoByCategoryId, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: true,
    };
  }),

  on(VideoActions.getVideoByCategoryIdSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: false,
      isGetVideoByCategoryIdSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideoByCategoryIdFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: false,
      getVideoByCategoryIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.toggleMuteVolume, (state, action) => {
    return <VideoState>{
      ...state,
      isMuteVolume: !state.isMuteVolume,
    };
  }),

  on(VideoActions.getVideoById, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoById: true,
      isGetVideoByIdSuccess: false,
    };
  }),

  on(VideoActions.getVideoByIdSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoById: false,
      isGetVideoByIdSuccess: true,
      video: action.video,
    };
  }),

  on(VideoActions.getVideoByIdFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideoById: false,
      getVideoByIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.updateWatchTime, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: true,
      isUpdateWatchTimeSuccess: false,
    };
  }),

  on(VideoActions.updateWatchTimeSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: false,
      isUpdateWatchTimeSuccess: true,
    };
  }),

  on(VideoActions.updateWatchTimeFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: false,
      updateWatchTimeErrorMessages: action.error,
    };
  }),

  on(VideoActions.increaseViewCount, (state, action) => {
    return <VideoState>{
      ...state,
      isIncreasingViewCount: true,
      isIncreaseViewCountSuccess: false,
    };
  }),

  on(VideoActions.increaseViewCountSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isIncreasingViewCount: false,
      isIncreaseViewCountSuccess: true,
    };
  }),

  on(VideoActions.increaseViewCountFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isIncreasingViewCount: false,
      increaseViewCountErrorMessages: action.error,
    };
  }),

  on(VideoActions.toggleReaction, (state, action) => {
    return <VideoState>{
      ...state,
      isToggleReaction: true,
      isToggleReactionSuccess: false,
    };
  }),

  on(VideoActions.toggleReactionSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isToggleReaction: false,
      isToggleReactionSuccess: true,
    };
  }),

  on(VideoActions.toggleReactionFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isToggleReaction: false,
      toggleReactionErrorMessages: action.error,
    };
  }),

  on(VideoActions.searchVideos, (state, action) => {
    return <VideoState>{
      ...state,
      isSearchingVideos: true,
      isSearchVideosSuccess: false,
    };
  }),

  on(VideoActions.searchVideosSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isSearchingVideos: false,
      isSearchVideosSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.searchVideosFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isSearchingVideos: false,
      searchVideosErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideosByUserId, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: true,
      isGetVideosByUserIdSuccess: false,
    };
  }),

  on(VideoActions.getVideosByUserIdSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: false,
      isGetVideosByUserIdSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideosByUserIdFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: false,
      getVideosByUserIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideosLikedByUser, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: true,
      isGetVideosLikedByUserSuccess: false,
    };
  }),

  on(VideoActions.getVideosLikedByUserSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: false,
      isGetVideosLikedByUserSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideosLikedByUserFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: false,
      getVideosLikedByUserErrorMessage: action.error,
    };
  }),

  on(VideoActions.clearState, (state, action) => {
    return <VideoState>{
      ...state,
      isCreatingVideo: false,
      isCreateVideoSuccess: false,
      createVideoErrorMessages: '',

      isGettingAllVideos: false,
      isGetAllVideosSuccess: false,
      getAllVideosErrorMessage: '',

      isGettingVideoById: false,
      isGetVideoByIdSuccess: false,
      getVideoByIdErrorMessage: '',

      isUpdatingWatchTime: false,
      isUpdateWatchTimeSuccess: false,
      updateWatchTimeErrorMessages: '',

      isIncreasingViewCount: false,
      isIncreaseViewCountSuccess: false,
      increaseViewCountErrorMessages: '',

      isGettingVideoByCategoryId: false,
      isGetVideoByCategoryIdSuccess: false,
      getVideoByCategoryIdErrorMessage: '',

      isToggleReaction: false,
      isToggleReactionSuccess: false,
      toggleReactionErrorMessages: '',

      isSearchingVideos: false,
      isSearchVideosSuccess: false,
      searchVideosErrorMessage: '',

      isGettingVideosByUserId: false,
      isGetVideosByUserIdSuccess: false,
      getVideosByUserIdErrorMessage: '',

      isGettingVideosLikedByUser: false,
      isGetVideosLikedByUserSuccess: false,
      getVideosLikedByUserErrorMessage: '',

      isUpdatingVideo: false,
      isUpdateVideoSuccess: false,
      updateVideoErrorMessages: '',

      isDeletingVideo: false,
      isDeleteVideoSuccess: false,
      deleteVideoErrorMessages: '',

      isAddingToHistory: false,
      isAddToHistorySuccess: false,
      addToHistoryErrorMessages: '',
    };
  }),

  on(VideoActions.updateVideo, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingVideo: true,
      isUpdateVideoSuccess: false,
    };
  }),

  on(VideoActions.updateVideoSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingVideo: false,
      isUpdateVideoSuccess: true,
      video: { ...state.video, ...action.video },
    };
  }),

  on(VideoActions.updateVideoFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isUpdatingVideo: false,
      updateVideoErrorMessages: action.error,
    };
  }),

  on(VideoActions.deleteVideo, (state, action) => {
    return <VideoState>{
      ...state,
      isDeletingVideo: true,
      isDeleteVideoSuccess: false,
    };
  }),

  on(VideoActions.deleteVideoSuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isDeletingVideo: false,
      isDeleteVideoSuccess: true,
    };
  }),

  on(VideoActions.deleteVideoFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isDeletingVideo: false,
      deleteVideoErrorMessages: action.error,
    };
  }),

  on(VideoActions.addToHistory, (state, action) => {
    return <VideoState>{
      ...state,
      isAddingToHistory: true,
      isAddToHistorySuccess: false,
    };
  }),

  on(VideoActions.addToHistorySuccess, (state, action) => {
    return <VideoState>{
      ...state,
      isAddingToHistory: false,
      isAddToHistorySuccess: true,
    };
  }),

  on(VideoActions.addToHistoryFailure, (state, action) => {
    return <VideoState>{
      ...state,
      isAddingToHistory: false,
      addToHistoryErrorMessages: action.error,
    };
  }),
);
