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

export const updateUser$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const userService = inject(UserService);
    return actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap((action) => {
        return userService.updateUser(action.user).pipe(
          map(() => UserActions.updateUserSuccess()),
          catchError((error) => {
            return of(UserActions.updateUserFailure({ error: error }));
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
