import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CreatePlaylistModel } from '../../models/playlist.model';

@Injectable()
export class PlaylistsService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  async createPlaylist(createPlaylistModel: CreatePlaylistModel) {
    const { error } = await this.supabase.from('playlists').insert({
      title: createPlaylistModel.title,
      description: createPlaylistModel.description,
      is_public: createPlaylistModel.is_public,
      user_id: createPlaylistModel.user_id,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllPlaylists() {
    const { data, error } = await this.supabase
      .from('playlists')
      .select('*')
      .eq('is_public', true);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async getPlaylistById(id: string) {
    const { data, error } = await this.supabase.rpc('get_playlist_by_id', {
      p_playlist_id: id,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async getWatchLaterPlaylistByUserId(id: string) {
    const { data, error } = await this.supabase.rpc(
      'get_watch_later_playlist',
      {
        p_user_id: id,
      },
    );

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async getPlaylistByUserId(id: string) {
    const { data, error } = await this.supabase
      .from('playlists')
      .select('*')
      .eq('user_id', id);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async upsertPlaylist(playlistId: string, videoId: string) {
    const { error } = await this.supabase.rpc('upsert_video_in_playlist', {
      p_playlist_id: playlistId,
      p_video_id: videoId,
    });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async upsertWatchLaterPlaylist(userId: string, videoId: string) {
    try {
      const { error } = await this.supabase.rpc('upsert_watch_later_playlist', {
        p_user_id: userId,
        p_video_id: videoId,
      });

      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
