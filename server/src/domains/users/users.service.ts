import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseUserModel } from '../../models/user.model';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  async create(createUserModel: FirebaseUserModel) {
    try {
      // create user in supabase
      const { error } = await this.supabase.from('users').upsert({
        id: createUserModel.uid,
        username: createUserModel.name,
        email: createUserModel.email,
        avatar_url: createUserModel.picture,
      });
      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      // create default watch later playlist
      const { error: errorPlaylist } = await this.supabase
        .from('playlists')
        .insert({
          user_id: createUserModel.uid,
          name: 'Watch later',
          is_public: false,
        });
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      // get user from supabase
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      if (!data || data.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
