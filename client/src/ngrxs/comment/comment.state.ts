import { CommentModel } from '../../models/comment.model';

export interface CommentState {
  comments: CommentModel[];

  isCreatingComment: boolean;
  isCreateCommentSuccess: boolean;
  createCommentErrorMessage: string;

  isGettingCommentByVideoId: boolean;
  isGetCommentByVideoIdSuccess: boolean;
  getCommentByVideoIdErrorMessage: string;
}
