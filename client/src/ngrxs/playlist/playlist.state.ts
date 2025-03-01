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
}
