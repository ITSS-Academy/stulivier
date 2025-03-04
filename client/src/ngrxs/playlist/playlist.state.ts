import {
  PlaylistDetailModel,
  PlaylistModel,
} from '../../models/playlist.model';

export interface PlaylistState {
  playlists: PlaylistModel[];
  playlistDetail: PlaylistDetailModel;
  playlist: PlaylistModel;

  isCreatingPlaylist: boolean;
  isCreatePlaylistSuccess: boolean;
  createPlaylistErrorMessage: string;

  isGettingAllPlaylists: boolean;
  isGetAllPlaylistsSuccess: boolean;
  getAllPlaylistsErrorMessages: '';

  isGettingPlaylistByUserId: boolean;
  isGetPlaylistByUserIdSuccess: boolean;
  getPlaylistByUserIdErrorMessage: string;

  isGettingPlaylistById: boolean;
  isGetPlaylistByIdSuccess: boolean;
  getPlaylistByIdErrorMessage: string;

  isGettingWatchLaterPlaylistByUserId: boolean;
  isGetWatchLaterPlaylistByUserIdSuccess: boolean;
  getWatchLaterPlaylistByUserIdErrorMessage: string;

  isUpdatingPlaylist: boolean;
  isUpdatePlaylistSuccess: boolean;
  updatePlaylistErrorMessage: string;

  isUpdatingWatchLaterPlaylist: boolean;
  isUpdateWatchLaterPlaylistSuccess: boolean;
  updateWatchLaterPlaylistErrorMessage: string;

  isDeletingWatchLaterPlaylist: boolean;
  isDeleteWatchLaterPlaylistSuccess: boolean;
  deleteWatchLaterPlaylistErrorMessage: string;
}
