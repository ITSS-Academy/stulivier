import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { inject } from '@angular/core';

export const createUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(() => {
        return userService.createUser().pipe(
          map(() => {
            return UserActions.createUserSuccess();
          }),
          catchError((error) => {
            return of(UserActions.createUserFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const getUserById$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(() => {
        return userService.getUserById().pipe(
          map((response) =>
            UserActions.getUserByIdSuccess({
              user: response as UserModel,
            }),
          ),
          catchError((obj) => {
            return of(
              UserActions.getUserByIdFailure({ error: obj.error.message }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateChannelImage$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.updateChannelImage),
      exhaustMap((action) => {
        return userService
          .updateChannelImage(action.channelImg, action.userId)
          .pipe(
            map(() => {
              return UserActions.updateChannelImageSuccess();
            }),
            catchError((error) => {
              return of(
                UserActions.updateChannelImageFailure({ error: error }),
              );
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const updateAvatar$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.updateAvatar),
      exhaustMap((action) => {
        return userService.updateAvatar(action.avatar, action.userId).pipe(
          map(() => {
            return UserActions.updateAvatarSuccess();
          }),
          catchError((error) => {
            return of(UserActions.updateAvatarFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateDescribe$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.updateDescribe),
      exhaustMap((action) => {
        return userService.updateDescribe(action.userId, action.describe).pipe(
          map(() => {
            return UserActions.updateDescribeSuccess();
          }),
          catchError((error) => {
            return of(UserActions.updateDescribeFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
