import { createAction, props } from '@ngrx/store';
import {
  CreatePlaylistDto,
  PlaylistDetailModel,
  PlaylistModel,
} from '../../models/playlist.model';

export const createPlaylist = createAction(
  '[Playlist] Create',
  props<{ createPlaylistDto: CreatePlaylistDto }>(),
);

export const createPlaylistSuccess = createAction('[Playlist] Create Success');

export const createPlaylistFailure = createAction(
  '[Playlist] Create Failure',
  props<{ error: string }>(),
);

export const getAllPlaylist = createAction('[Playlist] Get All');

export const getAllPlaylistSuccess = createAction(
  '[Playlist] Get All Success',
  props<{ playlists: PlaylistModel[] }>(),
);

export const getAllPlaylistFailure = createAction(
  '[Playlist] Get All Failure',
  props<{ error: string }>(),
);

export const getPlaylistByUserId = createAction(
  '[Playlist] Get Playlist By User Id',
  props<{ id: string }>(),
);

export const getPlaylistByUserIdSuccess = createAction(
  '[Playlist] Get Playlist By User Id Success',
  props<{ playlists: PlaylistModel[] }>(),
);

export const getPlaylistByUserIdFailure = createAction(
  '[Playlist] Get Playlist By User Id Failure',
  props<{ error: string }>(),
);

export const getPlaylistById = createAction(
  '[Playlist] Get Playlist By Id',
  props<{ id: string }>(),
);

export const getPlaylistByIdSuccess = createAction(
  '[Playlist] Get Playlist By Id Success',
  props<{ playlist: PlaylistDetailModel }>(),
);

export const getPlaylistByIdFailure = createAction(
  '[Playlist] Get Playlist By Id Failure',
  props<{ error: string }>(),
);

export const getWatchLaterPlaylistByUserId = createAction(
  '[Playlist] Get Watch Later Playlist By User Id',
  props<{ userId: string }>(),
);

export const getWatchLaterPlaylistByUserIdSuccess = createAction(
  '[Playlist] Get Watch Later Playlist By User Id Success',
  props<{ playlist: PlaylistDetailModel }>(),
);

export const getWatchLaterPlaylistByUserIdFailure = createAction(
  '[Playlist] Get Watch Later Playlist By User Id Failure',
  props<{ error: string }>(),
);

export const updatePlaylist = createAction(
  '[Playlist] Update',
  props<{ playlistId: string; videoId: string }>(),
);

export const updatePlaylistSuccess = createAction('[Playlist] Update Success');

export const updatePlaylistFailure = createAction(
  '[Playlist] Update Failure',
  props<{ error: string }>(),
);

export const updateWatchLaterPlaylist = createAction(
  '[Playlist] Update Watch Later Playlist',
  props<{ userId: string; videoId: string }>(),
);

export const updateWatchLaterPlaylistSuccess = createAction(
  '[Playlist] Update Watch Later Playlist Success',
);

export const updateWatchLaterPlaylistFailure = createAction(
  '[Playlist] Update Watch Later Playlist Failure',
  props<{ error: string }>(),
);

export const deleteWatchLaterPlaylist = createAction(
  '[Playlist] Delete Watch Later Playlist',
  props<{ userId: string; videoId: string }>(),
);

export const deleteWatchLaterPlaylistSuccess = createAction(
  '[Playlist] Delete Watch Later Playlist Success',
);

export const deleteWatchLaterPlaylistFailure = createAction(
  '[Playlist] Delete Watch Later Playlist Failure',
  props<{ error: string }>(),
);
export const clearPlaylistState = createAction('[Playlist] Clear State');
