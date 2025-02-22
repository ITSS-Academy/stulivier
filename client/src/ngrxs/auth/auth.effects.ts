import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { SessionStorageService } from '../../services/session-storage.service';

export const signInWithGoogle$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);
    return actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return authService.signInWithGoogle().pipe(
          map((credential) => {
            if (!credential) {
              return AuthActions.signInWithGoogleFailure({
                error: 'Login failed',
              });
            }
            return AuthActions.signInWithGoogleSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.signInWithGoogleFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const signOut$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);
    const sessionStorageService = inject(SessionStorageService);
    return actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() => {
        return authService.logout().pipe(
          map(() => {
            sessionStorageService.removeTokenInSession();
            return AuthActions.signOutSuccess();
          }),
          catchError((error) => {
            return of(AuthActions.signOutFailure({ error: error }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
