import { createAction, props } from '@ngrx/store';

export const storeIdToken = createAction(
  '[Auth] Store Id Token',
  props<{ idToken: string }>(),
);

export const signInWithGoogle = createAction('[Auth] Sign In With Google');
export const signInWithGoogleSuccess = createAction(
  '[Auth] Sign In With Google Success',
);
export const signInWithGoogleFailure = createAction(
  '[Auth] Sign In With Google Failure',
  props<{ error: any }>(),
);
export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');
export const signOutFailure = createAction(
  '[Auth] Sign Out Failure',
  props<{ error: any }>(),
);
