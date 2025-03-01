import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as VideoActions from './video.actions';
import { VideoService } from '../../services/video.service';
import { inject } from '@angular/core';

export const createVideo$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.createVideo),
      exhaustMap((action) => {
        return videoService
          .create(action.createVideoDto, action.videoFile, action.imageFile)
          .pipe(
            map(() => {
              return VideoActions.createVideoSuccess();
            }),
            catchError((error) => {
              return of(VideoActions.createVideoFailure({ error: error }));
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const getAllVideos$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.getAllVideos),
      exhaustMap(() => {
        return videoService.getAllVideos().pipe(
          map((videos) => {
            return VideoActions.getAllVideosSuccess({ videos });
          }),
          catchError((error) => {
            return of(VideoActions.getAllVideosFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getVideoById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.getVideoById),
      exhaustMap((action) => {
        return videoService.getVideoById(action.videoId, action.userId).pipe(
          map((video) => {
            return VideoActions.getVideoByIdSuccess({ video });
          }),
          catchError((error) => {
            return of(VideoActions.getVideoByIdFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const increaseViewCount$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.increaseViewCount),
      exhaustMap((action) => {
        return videoService.increaseViewCount(action.id).pipe(
          map(() => {
            return VideoActions.increaseViewCountSuccess();
          }),
          catchError((error) => {
            return of(VideoActions.increaseViewCountFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateWatchTime$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.updateWatchTime),
      exhaustMap((action) => {
        return videoService
          .updateWatchTime(action.videoId, action.userId, action.watchTime)
          .pipe(
            map(() => {
              return VideoActions.updateWatchTimeSuccess();
            }),
            catchError((error) => {
              return of(VideoActions.updateWatchTimeFailure({ error: error }));
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const getVideosByCategoryId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.getVideoByCategoryId),
      exhaustMap((action) => {
        return videoService.getVideosByCategoryId(action.categoryId).pipe(
          map((videos) => {
            return VideoActions.getVideoByCategoryIdSuccess({ videos });
          }),
          catchError((error) => {
            return of(VideoActions.getVideoByCategoryIdFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
