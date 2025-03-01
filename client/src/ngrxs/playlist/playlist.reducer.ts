import { createReducer, on } from '@ngrx/store';
import { PlaylistState } from './playlist.state';
import * as PlaylistActions from './playlist.actions';
import {
  PlaylistDetailModel,
  PlaylistModel,
} from '../../models/playlist.model';

const initialState: PlaylistState = {
  playlists: [],
  playlist: <PlaylistModel>{},
  playlistDetail: <PlaylistDetailModel>{},

  isGettingAllPlaylists: false,
  isGetAllPlaylistsSuccess: false,
  getAllPlaylistsErrorMessages: '',

  isCreatingPlaylist: false,
  isCreatePlaylistSuccess: false,
  createPlaylistErrorMessage: '',

  isGettingPlaylistByUserId: false,
  isGetPlaylistByUserIdSuccess: false,
  getPlaylistByUserIdErrorMessage: '',

  isGettingPlaylistById: false,
  isGetPlaylistByIdSuccess: false,
  getPlaylistByIdErrorMessage: '',
};

export const playlistReducer = createReducer(
  initialState,

  on(PlaylistActions.getAllPlaylist, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingAllPlaylists: true,
      isGetAllPlaylistsSuccess: false,
    };
  }),

  on(PlaylistActions.getAllPlaylistSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingAllPlaylists: false,
      isGetAllPlaylistsSuccess: true,
    };
  }),
  on(PlaylistActions.getAllPlaylistFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingAllPlaylists: false,
      getAllPlaylistsErrorMessages: action.error,
    };
  }),

  on(PlaylistActions.createPlaylist, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isCreatingPlaylist: true,
      isCreatePlaylistSuccess: false,
    };
  }),

  on(PlaylistActions.createPlaylistSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isCreatingPlaylist: false,
      isCreatePlaylistSuccess: true,
    };
  }),
  on(PlaylistActions.createPlaylistFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isCreatingPlaylist: false,
      createPlaylistErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.getPlaylistByUserId, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistByUserId: true,
      isGetPlaylistByUserIdSuccess: false,
    };
  }),

  on(PlaylistActions.getPlaylistByUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistByUserId: false,
      isGetPlaylistByUserIdSuccess: true,
    };
  }),
  on(PlaylistActions.getPlaylistByUserIdFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistByUserId: false,
      getPlaylistByUserIdErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.getPlaylistById, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistById: true,
      isGetPlaylistByIdSuccess: false,
    };
  }),

  on(PlaylistActions.getPlaylistByIdSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistById: false,
      isGetPlaylistByIdSuccess: true,
    };
  }),

  on(PlaylistActions.getPlaylistByIdFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingPlaylistById: false,
      getPlaylistByIdErrorMessage: action.error,
    };
  }),
);
