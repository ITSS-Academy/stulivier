import { createAction, props } from '@ngrx/store';
import {
  CreatePlaylistDto,
  PlaylistDetailModel,
  PlaylistModel,
  UpdatePlaylistDto,
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

export const removeVideoInPlaylist = createAction(
  '[Playlist] Remove Video In Playlist',
  props<{ playlistId: string; videoId: string }>(),
);

export const removeVideoInPlaylistSuccess = createAction(
  '[Playlist] Remove Video In Playlist Success',
);

export const removeVideoInPlaylistFailure = createAction(
  '[Playlist] Remove Video In Playlist Failure',
  props<{ error: string }>(),
);

export const deletePlaylistById = createAction(
  '[Playlist] Delete Playlist By Id',
  props<{ playlistId: string }>(),
);

export const deletePlaylistByIdSuccess = createAction(
  '[Playlist] Delete Playlist By Id Success',
);

export const deletePlaylistByIdFailure = createAction(
  '[Playlist] Delete Playlist By Id Failure',
  props<{ error: string }>(),
);

export const upsertPlaylistById = createAction(
  '[Playlist] Upsert Playlist By Id',
  props<{ playlistId: string; updatePlaylistDto: UpdatePlaylistDto }>(),
);

export const upsertPlaylistByIdSuccess = createAction(
  '[Playlist] Upsert Playlist By Id Success',
);

export const upsertPlaylistByIdFailure = createAction(
  '[Playlist] Upsert Playlist By Id Failure',
  props<{ error: string }>(),
);
export const clearPlaylistState = createAction('[Playlist] Clear State');

export const clearAllPlaylistState = createAction('[Playlist] Clear All State');
