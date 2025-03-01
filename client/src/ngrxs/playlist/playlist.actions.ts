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
