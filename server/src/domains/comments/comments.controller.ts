import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentModel } from '../../models/comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() comment: CommentModel) {
    console.log(comment);
    return this.commentsService.createComment(comment);
  }

  @Get()
  async getCommentByVideoId(@Request() req: any) {
    const { videoId } = req.query;
    return this.commentsService.getCommentsByVideoId(videoId);
  }
}
