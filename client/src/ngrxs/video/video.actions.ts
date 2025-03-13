import { createAction, props } from '@ngrx/store';
import {
  CreateVideoDto,
  UpdateVideoModel,
  VideoModel,
} from '../../models/video.model';

export const toggleMuteVolume = createAction('[Video] Toggle Mute Volume');

export const createVideo = createAction(
  '[Video] Create Video',
  props<{ createVideoDto: CreateVideoDto; videoFile: File; imageFile: File }>(),
);

export const createVideoSuccess = createAction('[Video] Create Video Success');

export const createVideoFailure = createAction(
  '[Video] Create Video Failure',
  props<{ error: string }>(),
);

export const getAllVideos = createAction('[Video] Get All Videos');

export const getAllVideosSuccess = createAction(
  '[Video] Get All Videos Success',
  props<{ videos: VideoModel[] }>(),
);

export const getAllVideosFailure = createAction(
  '[Video] Get All Videos Failure',
  props<{ error: string }>(),
);

export const getVideoById = createAction(
  '[Video] Get Video By Id',
  props<{ videoId: string; userId: string | null }>(),
);

export const getVideoByIdSuccess = createAction(
  '[Video] Get Video By Id Success',
  props<{ video: VideoModel }>(),
);

export const getVideoByIdFailure = createAction(
  '[Video] Get Video By Id Failure',
  props<{ error: string }>(),
);

export const getVideosByUserId = createAction(
  '[Video] Get Videos By User Id',
  props<{ userId: string }>(),
);

export const getVideosByUserIdSuccess = createAction(
  '[Video] Get Videos By User Id Success',
  props<{ videos: VideoModel[] }>(),
);

export const getVideosByUserIdFailure = createAction(
  '[Video] Get Videos By User Id Failure',
  props<{ error: string }>(),
);

export const increaseViewCount = createAction(
  '[Video] Increase View Count',
  props<{ id: string }>(),
);

export const increaseViewCountSuccess = createAction(
  '[Video] Increase View Count Success',
);

export const increaseViewCountFailure = createAction(
  '[Video] Increase View Count Failure',
  props<{ error: string }>(),
);

export const updateWatchTime = createAction(
  '[Video] Update Watch Time',
  props<{ videoId: string; userId: string; watchTime: number }>(),
);

export const updateWatchTimeSuccess = createAction(
  '[Video] Update Watch Time Success',
);

export const updateWatchTimeFailure = createAction(
  '[Video] Update Watch Time Failure',
  props<{ error: string }>(),
);

export const getVideoByCategoryId = createAction(
  '[Video] Get Video By Category Id',
  props<{ categoryId: string }>(),
);

export const getVideoByCategoryIdSuccess = createAction(
  '[Video] Get Video By Category Id Success',
  props<{ videos: VideoModel[] }>(),
);

export const getVideoByCategoryIdFailure = createAction(
  '[Video] Get Video By Category Id Failure',
  props<{ error: string }>(),
);

export const toggleReaction = createAction(
  '[Video] Toggle Reaction',
  props<{ videoId: string; userId: string }>(),
);

export const toggleReactionSuccess = createAction(
  '[Video] Toggle Reaction Success',
);

export const toggleReactionFailure = createAction(
  '[Video] Toggle Reaction Failure',
  props<{ error: string }>(),
);

export const searchVideos = createAction(
  '[Video] Search Videos',
  props<{ searchQuery: string }>(),
);

export const searchVideosSuccess = createAction(
  '[Video] Search Videos Success',
  props<{ videos: VideoModel[] }>(),
);

export const searchVideosFailure = createAction(
  '[Video] Search Videos Failure',
  props<{ error: string }>(),
);

export const getVideosLikedByUser = createAction(
  '[Video] Get Videos Liked By User',
  props<{ userId: string }>(),
);

export const getVideosLikedByUserSuccess = createAction(
  '[Video] Get Videos Liked By User Success',
  props<{ videos: VideoModel[] }>(),
);

export const getVideosLikedByUserFailure = createAction(
  '[Video] Get Videos Liked By User Failure',
  props<{ error: string }>(),
);

export const updateVideo = createAction(
  '[Video] Update Video',
  props<{ video: UpdateVideoModel }>(),
);

export const updateVideoSuccess = createAction(
  '[Video] Update Video Success',
  props<{ video: UpdateVideoModel }>(),
);

export const updateVideoFailure = createAction(
  '[Video] Update Video Failure',
  props<{ error: any }>(),
);

export const deleteVideo = createAction(
  '[Video] Delete Video',
  props<{ id: string }>(),
);

export const deleteVideoSuccess = createAction('[Video] Delete Video Success');

export const deleteVideoFailure = createAction(
  '[Video] Delete Video Failure',
  props<{ error: any }>(),
);

export const addToHistory = createAction(
  '[Video] Add To History',
  props<{ videoId: string; userId: string }>(),
);

export const addToHistorySuccess = createAction(
  '[Video] Add To History Success',
);

export const addToHistoryFailure = createAction(
  '[Video] Add To History Failure',
  props<{ error: any }>(),
);

export const clearState = createAction('[Video] Clear State');
