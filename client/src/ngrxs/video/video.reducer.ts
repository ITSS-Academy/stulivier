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
};

export const videoReducer = createReducer(
  initialState,
  on(VideoActions.createVideo, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isCreatingVideo: true,
      isCreateVideoSuccess: false,
    };
  }),

  on(VideoActions.createVideoSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isCreatingVideo: false,
      isCreateVideoSuccess: true,
    };
  }),

  on(VideoActions.createVideoFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isCreatingVideo: false,
      createVideoErrorMessages: action.error,
    };
  }),

  on(VideoActions.getAllVideos, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingAllVideos: true,
      isGetAllVideosSuccess: false,
    };
  }),

  on(VideoActions.getAllVideosSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingAllVideos: false,
      isGetAllVideosSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getAllVideosFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingAllVideos: false,
      getAllVideosErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideoByCategoryId, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: true,
    };
  }),

  on(VideoActions.getVideoByCategoryIdSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: false,
      isGetVideoByCategoryIdSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideoByCategoryIdFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoByCategoryId: false,
      getVideoByCategoryIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.toggleMuteVolume, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isMuteVolume: !state.isMuteVolume,
    };
  }),

  on(VideoActions.getVideoById, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoById: true,
      isGetVideoByIdSuccess: false,
    };
  }),

  on(VideoActions.getVideoByIdSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoById: false,
      isGetVideoByIdSuccess: true,
      video: action.video,
    };
  }),

  on(VideoActions.getVideoByIdFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideoById: false,
      getVideoByIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.updateWatchTime, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: true,
      isUpdateWatchTimeSuccess: false,
    };
  }),

  on(VideoActions.updateWatchTimeSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: false,
      isUpdateWatchTimeSuccess: true,
    };
  }),

  on(VideoActions.updateWatchTimeFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isUpdatingWatchTime: false,
      updateWatchTimeErrorMessages: action.error,
    };
  }),

  on(VideoActions.increaseViewCount, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isIncreasingViewCount: true,
      isIncreaseViewCountSuccess: false,
    };
  }),

  on(VideoActions.increaseViewCountSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isIncreasingViewCount: false,
      isIncreaseViewCountSuccess: true,
    };
  }),

  on(VideoActions.increaseViewCountFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isIncreasingViewCount: false,
      increaseViewCountErrorMessages: action.error,
    };
  }),

  on(VideoActions.toggleReaction, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isToggleReaction: true,
      isToggleReactionSuccess: false,
    };
  }),

  on(VideoActions.toggleReactionSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isToggleReaction: false,
      isToggleReactionSuccess: true,
    };
  }),

  on(VideoActions.toggleReactionFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isToggleReaction: false,
      toggleReactionErrorMessages: action.error,
    };
  }),

  on(VideoActions.searchVideos, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isSearchingVideos: true,
      isSearchVideosSuccess: false,
    };
  }),

  on(VideoActions.searchVideosSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isSearchingVideos: false,
      isSearchVideosSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.searchVideosFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isSearchingVideos: false,
      searchVideosErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideosByUserId, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: true,
      isGetVideosByUserIdSuccess: false,
    };
  }),

  on(VideoActions.getVideosByUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: false,
      isGetVideosByUserIdSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideosByUserIdFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosByUserId: false,
      getVideosByUserIdErrorMessage: action.error,
    };
  }),

  on(VideoActions.getVideosLikedByUser, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: true,
      isGetVideosLikedByUserSuccess: false,
    };
  }),

  on(VideoActions.getVideosLikedByUserSuccess, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: false,
      isGetVideosLikedByUserSuccess: true,
      videos: action.videos,
    };
  }),

  on(VideoActions.getVideosLikedByUserFailure, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...state,
      isGettingVideosLikedByUser: false,
      getVideosLikedByUserErrorMessage: action.error,
    };
  }),

  on(VideoActions.clearState, (state, action) => {
    console.log(action.type);
    return <VideoState>{
      ...initialState,
    };
  }),
);
