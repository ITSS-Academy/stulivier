import { createAction, props } from '@ngrx/store';
import { CreateVideoDto, VideoModel } from '../../models/video.model';

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
  props<{ categoryId: string }>()
);


export const getVideoByCategoryIdSuccess = createAction(
  '[Video] Get Video By Category Id Success',
  props<{ videos: VideoModel[] }>(),
);

export const getVideoByCategoryIdFailure = createAction(
  '[Video] Get Video By Category Id Failure',
  props<{ error: string }>(),
);

export const clearState = createAction('[Video] Clear State');
