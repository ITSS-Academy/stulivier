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
