import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseUserModel } from '../../models/user.model';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { Multer } from 'multer';

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

  async updateChannelImage(userId: string, img: Multer.File) {
    try {
      const uuid = randomUUID();
      const { data, error } = await this.supabase.storage
        .from('background_url')
        .upload(`backgrounds/${userId}/${uuid}`, img.buffer, {
          contentType: img.mimetype, // Ensure the correct MIME type is set
        });

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      // get the public url of the image
      const { publicURL } = this.supabase.storage
        .from('background_url')
        .getPublicUrl(`backgrounds/${userId}/${uuid}`);

      // update the user avatar
      await this.supabase
        .from('users')
        .update({ background_url: publicURL })
        .eq('id', userId);

      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAvatar(userId: string, img: Multer.File) {
    try {
      const uuid = randomUUID();
      const { data, error } = await this.supabase.storage
        .from('background_url')
        .upload(`avatars/${userId}/${uuid}`, img.buffer, {
          contentType: img.mimetype, // Ensure the correct MIME type is set
        });

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      // get the public url of the image
      const { publicURL } = this.supabase.storage
        .from('background_url')
        .getPublicUrl(`avatars/${userId}/${uuid}`);

      // update the user avatar
      await this.supabase
        .from('users')
        .update({ avatar_url: publicURL })
        .eq('id', userId);

      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateDescribe(userId: string, description: string) {
    try {
      await this.supabase
        .from('users')
        .update({ describe: description })
        .eq('id', userId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
