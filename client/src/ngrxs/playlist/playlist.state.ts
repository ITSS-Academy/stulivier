import {
  PlaylistDetailModel,
  PlaylistModel,
  PlaylistResponseModel,
} from '../../models/playlist.model';

export interface PlaylistState {
  playlists: PlaylistModel[];
  playlistDetail: PlaylistDetailModel;
  playlist: PlaylistModel;
  playlistWithVideos: PlaylistResponseModel[];

  isCreatingPlaylist: boolean;
  isCreatePlaylistSuccess: boolean;
  createPlaylistErrorMessage: string;

  isGettingAllPlaylists: boolean;
  isGetAllPlaylistsSuccess: boolean;
  getAllPlaylistsErrorMessages: string;

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

  isRemovingVideoInPlaylist: boolean;
  isRemoveVideoInPlaylistSuccess: boolean;
  removeVideoInPlaylistErrorMessage: string;

  isDeletingPlaylistById: boolean;
  isDeletePlaylistByIdSuccess: boolean;
  deletePlaylistByIdErrorMessage: string;

  isUpsertingPlaylistById: boolean;
  isUpsertPlaylistByIdSuccess: boolean;
  upsertPlaylistByIdErrorMessage: string;

  isGettingPlaylistWithVideos: boolean;
  isGetPlaylistWithVideosSuccess: boolean;
  getPlaylistWithVideosErrorMessage: string;
}
