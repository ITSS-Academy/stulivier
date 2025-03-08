import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { CreatePlaylistDto, UpdatePlaylistDto } from '../models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClientAuth) {}

  createPlaylist(playlist: CreatePlaylistDto) {
    return this.http.post('playlists', playlist);
  }

  getAllPlaylists() {
    return this.http.get('playlists/all');
  }

  getPlaylistByUserId(userId: string) {
    return this.http.get('playlists/user', { params: { userId } });
  }

  getPlaylistById(id: string) {
    return this.http.get('playlists', { params: { id } });
  }

  getWatchLaterPlaylistByUserId(userId: string) {
    return this.http.get('playlists/watch-later', { params: { userId } });
  }

  upsertPlaylist(playlistId: string, videoId: string) {
    return this.http.post('playlists/upsert', null, {
      params: { playlistId, videoId },
    });
  }

  upsertWatchLaterPlaylist(userId: string, videoId: string) {
    return this.http.post('playlists/watch-later', null, {
      params: { userId, videoId },
    });
  }

  removeVideoInWatchLaterPlaylist(userId: string, videoId: string) {
    return this.http.delete('playlists/watch-later', {
      params: { userId, videoId },
    });
  }

  removeVideoInPlaylist(playlistId: string, videoId: string) {
    return this.http.delete('playlists/playlist', {
      params: { playlistId, videoId },
    });
  }

  deletePlaylistById(playlistId: string) {
    return this.http.delete('playlists', { params: { playlistId } });
  }

  updatePlaylistById(playlistId: string, playlist: UpdatePlaylistDto) {
    return this.http.put('playlists', playlist, { params: { playlistId } });
  }
}
