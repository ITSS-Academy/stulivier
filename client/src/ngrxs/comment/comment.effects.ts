import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as CommentActions from './comment.actions';
import { CommentModel, CreateCommentDto } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';

export const getCommentsByVideoId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const commentService = inject(CommentService);
    return actions$.pipe(
      ofType(CommentActions.getCommentsByVideoId),
      exhaustMap((action) => {
        return commentService.getCommentsByVideoId(action.videoId).pipe(
          map((response) =>
            CommentActions.getCommentsByVideoIdSuccess({
              comments: response as CommentModel[],
            }),
          ),
          catchError((obj) => {
            return of(
              CommentActions.getCommentsByVideoIdFailure({
                error: obj.error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const createComment$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const commentService = inject(CommentService);
    return actions$.pipe(
      ofType(CommentActions.createComment),
      exhaustMap((action) => {
        return commentService.createComment(action.comment).pipe(
          map(() => CommentActions.createCommentSuccess()),
          catchError((obj) => {
            return of(
              CommentActions.createCommentFailure({
                error: obj.error.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
