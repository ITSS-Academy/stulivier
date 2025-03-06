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
          title: 'Watch later',
          is_public: false,
        });

      if (errorPlaylist) {
        throw new HttpException(errorPlaylist, HttpStatus.BAD_REQUEST);
      }
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

      if (!data || data.length === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(userId: string, updateData: any) {
    try {
      if (!userId) {
        throw new HttpException('User ID is missing', HttpStatus.BAD_REQUEST);
      }

      // Chỉ lấy các trường cần update, tránh gửi undefined lên Supabase
      const updateFields: any = {};
      if (updateData.username) updateFields.username = updateData.username;
      if (updateData.describe) updateFields.describe = updateData.describe;
      if (updateData.avatar_url) updateFields.avatar_url = updateData.avatar_url;
      if (updateData.background_url) updateFields.background_url = updateData.background_url;

      if (Object.keys(updateFields).length === 0) {
        throw new HttpException('No valid fields to update', HttpStatus.BAD_REQUEST);
      }

      const { error } = await this.supabase
        .from('users')
        .update(updateFields)
        .eq('id', userId);

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      return { message: 'User updated successfully' };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }


}
