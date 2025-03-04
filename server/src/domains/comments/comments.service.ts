import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { CommentModel } from '../../models/comment.model';

@Injectable()
export class CommentsService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  async createComment(comment: CommentModel) {
    const { data, error } = await this.supabase
      .from('comments')
      .insert(comment);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  async getCommentsByVideoId(videoId: string) {
    const { data, error } = await this.supabase
      .from('comments')
      .select('*')
      .eq('video_id', videoId);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
