import { createAction, props } from '@ngrx/store';
import { CommentModel, CreateCommentDto } from '../../models/comment.model';

export const createComment = createAction(
  '[Comment] Create',
  props<{ comment: CreateCommentDto }>(),
);

export const createCommentSuccess = createAction('[Comment] Create Success');

export const createCommentFailure = createAction(
  '[Comment] Create Failure',
  props<{ error: string }>(),
);

export const getCommentsByVideoId = createAction(
  '[Comment] Get By Video Id',
  props<{ videoId: string }>(),
);

export const getCommentsByVideoIdSuccess = createAction(
  '[Comment] Get By Video Id Success',
  props<{ comments: CommentModel[] }>(),
);

export const getCommentsByVideoIdFailure = createAction(
  '[Comment] Get By Video Id Failure',
  props<{ error: string }>(),
);

export const clearCommentState = createAction('[Comment] Clear State');
