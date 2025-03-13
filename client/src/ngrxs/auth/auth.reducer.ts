import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  idToken: '',
  isCheckLoggedIn: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.signInWithGoogle, (state, action) => {
    return <AuthState>{
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(AuthActions.signInWithGoogleSuccess, (state, action) => {
    return <AuthState>{
      ...state,
      loading: false,
    };
  }),
  on(AuthActions.signInWithGoogleFailure, (state, action) => {
    return <AuthState>{
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(AuthActions.signOut, (state, action) => {
    return <AuthState>{
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(AuthActions.signOutSuccess, (state, action) => {
    return <AuthState>{
      ...state,
      idToken: '',
      isStaticUser: false,
      loading: false,
    };
  }),
  on(AuthActions.signOutFailure, (state, action) => {
    return <AuthState>{
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(AuthActions.storeIdToken, (state, action) => {
    return <AuthState>{
      ...state,
      idToken: action.idToken,
    };
  }),
  on(AuthActions.checkLoggedIn, (state, action) => {
    return <AuthState>{
      ...state,
      isCheckLoggedIn: true,
    };
  }),
);
