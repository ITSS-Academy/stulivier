import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentModel } from '../../models/comment.model';
import { Public } from '../../utils/custom_decorators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() comment: CommentModel) {
    return this.commentsService.createComment(comment);
  }

  @Public()
  @Get()
  async getCommentByVideoId(@Request() req: any) {
    const { videoId } = req.query;
    return this.commentsService.getCommentsByVideoId(videoId);
  }
}
