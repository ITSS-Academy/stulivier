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

  isGettingWatchLaterPlaylistByUserId: false,
  isGetWatchLaterPlaylistByUserIdSuccess: false,
  getWatchLaterPlaylistByUserIdErrorMessage: '',

  isUpdatingPlaylist: false,
  isUpdatePlaylistSuccess: false,
  updatePlaylistErrorMessage: '',

  isUpdatingWatchLaterPlaylist: false,
  isUpdateWatchLaterPlaylistSuccess: false,
  updateWatchLaterPlaylistErrorMessage: '',

  isDeletingWatchLaterPlaylist: false,
  isDeleteWatchLaterPlaylistSuccess: false,
  deleteWatchLaterPlaylistErrorMessage: '',
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
      playlists: action.playlists,
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
      playlistDetail: action.playlist,
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

  on(PlaylistActions.getWatchLaterPlaylistByUserId, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingWatchLaterPlaylistByUserId: true,
      isGetWatchLaterPlaylistByUserIdSuccess: false,
    };
  }),

  on(PlaylistActions.getWatchLaterPlaylistByUserIdSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      playlistDetail: action.playlist,
      isGettingWatchLaterPlaylistByUserId: false,
      isGetWatchLaterPlaylistByUserIdSuccess: true,
    };
  }),

  on(PlaylistActions.getWatchLaterPlaylistByUserIdFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isGettingWatchLaterPlaylistByUserId: false,
      getWatchLaterPlaylistByUserIdErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.updatePlaylist, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingPlaylist: true,
      isUpdatePlaylistSuccess: false,
    };
  }),

  on(PlaylistActions.updatePlaylistSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingPlaylist: false,
      isUpdatePlaylistSuccess: true,
    };
  }),

  on(PlaylistActions.updatePlaylistFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingPlaylist: false,
      updatePlaylistErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.updateWatchLaterPlaylist, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingWatchLaterPlaylist: true,
      isUpdateWatchLaterPlaylistSuccess: false,
    };
  }),

  on(PlaylistActions.updateWatchLaterPlaylistSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingWatchLaterPlaylist: false,
      isUpdateWatchLaterPlaylistSuccess: true,
    };
  }),

  on(PlaylistActions.updateWatchLaterPlaylistFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isUpdatingWatchLaterPlaylist: false,
      updateWatchLaterPlaylistErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.deleteWatchLaterPlaylist, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isDeletingWatchLaterPlaylist: true,
      isDeleteWatchLaterPlaylistSuccess: false,
    };
  }),

  on(PlaylistActions.deleteWatchLaterPlaylistSuccess, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isDeletingWatchLaterPlaylist: false,
      isDeleteWatchLaterPlaylistSuccess: true,
    };
  }),

  on(PlaylistActions.deleteWatchLaterPlaylistFailure, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
      isDeletingWatchLaterPlaylist: false,
      deleteWatchLaterPlaylistErrorMessage: action.error,
    };
  }),

  on(PlaylistActions.clearPlaylistState, (state, action) => {
    console.log(action.type);
    return <PlaylistState>{
      ...state,
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

      isGettingWatchLaterPlaylistByUserId: false,
      isGetWatchLaterPlaylistByUserIdSuccess: false,
      getWatchLaterPlaylistByUserIdErrorMessage: '',

      isUpdatingPlaylist: false,
      isUpdatePlaylistSuccess: false,
      updatePlaylistErrorMessage: '',

      isUpdatingWatchLaterPlaylist: false,
      isUpdateWatchLaterPlaylistSuccess: false,
      updateWatchLaterPlaylistErrorMessage: '',

      isDeletingWatchLaterPlaylist: false,
      isDeleteWatchLaterPlaylistSuccess: false,
      deleteWatchLaterPlaylistErrorMessage: '',
    };
  }),
);
