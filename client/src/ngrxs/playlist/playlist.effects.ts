import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as PlaylistActions from './playlist.actions';
import {
  PlaylistDetailModel,
  PlaylistModel,
} from '../../models/playlist.model';
import { PlaylistService } from '../../services/playlist.service';

export const getAllPlaylists$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.getAllPlaylist),
      exhaustMap(() => {
        return playlistService.getAllPlaylists().pipe(
          map((response) =>
            PlaylistActions.getAllPlaylistSuccess({
              playlists: response as PlaylistModel[],
            }),
          ),
          catchError((obj) => {
            return of(
              PlaylistActions.getAllPlaylistFailure({
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

export const createPlaylist$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      exhaustMap((action) => {
        return playlistService.createPlaylist(action.createPlaylistDto).pipe(
          map((response) => PlaylistActions.createPlaylistSuccess()),
          catchError((obj) => {
            return of(
              PlaylistActions.createPlaylistFailure({
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

export const getPlaylistByUserId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylistByUserId),
      exhaustMap((action) => {
        return playlistService.getPlaylistByUserId(action.id).pipe(
          map((response) =>
            PlaylistActions.getPlaylistByUserIdSuccess({
              playlists: response as PlaylistModel[],
            }),
          ),
          catchError((obj) => {
            return of(
              PlaylistActions.getPlaylistByUserIdFailure({
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

export const getPlaylistById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.getPlaylistById),
      exhaustMap((action) => {
        return playlistService.getPlaylistById(action.id).pipe(
          map((response) =>
            PlaylistActions.getPlaylistByIdSuccess({
              playlist: response as PlaylistDetailModel,
            }),
          ),
          catchError((obj) => {
            return of(
              PlaylistActions.getPlaylistByIdFailure({
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

export const getWatchLaterPlaylistByUserId$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.getWatchLaterPlaylistByUserId),
      exhaustMap((action) => {
        return playlistService
          .getWatchLaterPlaylistByUserId(action.userId)
          .pipe(
            map((response) =>
              PlaylistActions.getWatchLaterPlaylistByUserIdSuccess({
                playlist: response,
              }),
            ),
            catchError((obj) => {
              return of(
                PlaylistActions.getWatchLaterPlaylistByUserIdFailure({
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

export const upsertPlaylist$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.updatePlaylist),
      exhaustMap((action) => {
        return playlistService
          .upsertPlaylist(action.playlistId, action.videoId)
          .pipe(
            map(() => PlaylistActions.updatePlaylistSuccess()),
            catchError((obj) => {
              return of(
                PlaylistActions.updatePlaylistFailure({
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

export const upsertWatchLaterPlaylist$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.updateWatchLaterPlaylist),
      exhaustMap((action) => {
        return playlistService
          .upsertWatchLaterPlaylist(action.userId, action.videoId)
          .pipe(
            map(() => PlaylistActions.updateWatchLaterPlaylistSuccess()),
            catchError((obj) => {
              return of(
                PlaylistActions.updateWatchLaterPlaylistFailure({
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

export const removeVideoInPlaylist$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.removeVideoInPlaylist),
      exhaustMap((action) => {
        return playlistService
          .removeVideoInPlaylist(action.playlistId, action.videoId)
          .pipe(
            map(() => PlaylistActions.removeVideoInPlaylistSuccess()),
            catchError((obj) => {
              return of(
                PlaylistActions.removeVideoInPlaylistFailure({
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

export const deletePlaylistById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.deletePlaylistById),
      exhaustMap((action) => {
        return playlistService.deletePlaylistById(action.playlistId).pipe(
          map(() => PlaylistActions.deletePlaylistByIdSuccess()),
          catchError((obj) => {
            return of(
              PlaylistActions.deletePlaylistByIdFailure({
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

export const upsertPlaylistById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.upsertPlaylistById),
      exhaustMap((action) => {
        return playlistService
          .updatePlaylistById(action.playlistId, action.updatePlaylistDto)
          .pipe(
            map(() => PlaylistActions.upsertPlaylistByIdSuccess()),
            catchError((obj) => {
              return of(
                PlaylistActions.upsertPlaylistByIdFailure({
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

export const deleteWatchLaterPlaylist$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const playlistService = inject(PlaylistService);
    return actions$.pipe(
      ofType(PlaylistActions.deleteWatchLaterPlaylist),
      exhaustMap((action) => {
        return playlistService
          .removeVideoInWatchLaterPlaylist(action.userId, action.videoId)
          .pipe(
            map(() => PlaylistActions.deleteWatchLaterPlaylistSuccess()),
            catchError((obj) => {
              return of(
                PlaylistActions.deleteWatchLaterPlaylistFailure({
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
