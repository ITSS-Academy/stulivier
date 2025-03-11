import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as VideoActions from './video.actions';
import { VideoService } from '../../services/video.service';
import { inject } from '@angular/core';
import {updateVideo, updateVideoFailure, updateVideoSuccess} from './video.actions';
import { UpdateVideoModel } from '../../models/video.model';

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

export const updateVideo$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);

    return actions$.pipe(
      ofType(updateVideo),
      exhaustMap(({ video }) => {
        if (!video.id) {
          return of(updateVideoFailure({ error: 'Missing videoId' }));
        }

        return videoService.updateVideo(video).pipe(
          map((updatedVideo) => updateVideoSuccess({ video: updatedVideo })),
          catchError((error) => of(updateVideoFailure({ error })))
        );
      })
    );
  },
  { functional: true }
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
            return of(
              VideoActions.getVideoByCategoryIdFailure({ error: error }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const toggleReaction$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.toggleReaction),
      exhaustMap((action) => {
        return videoService.toggleReaction(action.videoId, action.userId).pipe(
          map(() => {
            return VideoActions.toggleReactionSuccess();
          }),
          catchError((error) => {
            return of(VideoActions.toggleReactionFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const searchVideos$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.searchVideos),
      exhaustMap((action) => {
        return videoService.searchVideos(action.searchQuery).pipe(
          map((videos) => {
            return VideoActions.searchVideosSuccess({ videos });
          }),
          catchError((error) => {
            return of(VideoActions.searchVideosFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getVideosByUserId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.getVideosByUserId),
      exhaustMap((action) => {
        return videoService.getVideosByUserId(action.userId).pipe(
          map((videos) => {
            return VideoActions.getVideosByUserIdSuccess({ videos });
          }),
          catchError((error) => {
            return of(VideoActions.getVideosByUserIdFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getVideosLikedByUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const videoService = inject(VideoService);
    return actions$.pipe(
      ofType(VideoActions.getVideosLikedByUser),
      exhaustMap((action) => {
        return videoService.getVideoLikedByUserId(action.userId).pipe(
          map((videos) => {
            return VideoActions.getVideosLikedByUserSuccess({ videos });
          }),
          catchError((error) => {
            return of(
              VideoActions.getVideosLikedByUserFailure({ error: error }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
