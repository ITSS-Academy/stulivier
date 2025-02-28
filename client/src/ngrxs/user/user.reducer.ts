import { UserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserModel } from '../../models/user.model';

const initialState: UserState = {
  user: <UserModel>{},
  isGettingUser: false,
  isGetUserSuccess: false,
  getUserErrorMessage: '',

  isCreatingUser: false,
  isCreateUserSuccess: false,
  createUserErrorMessage: '',

  isUpdatingUser: false,
  isUpdateUserSuccess: false,
  updateUserErrorMessage: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.createUser, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreatingUser: true,
    };
  }),
  on(UserActions.createUserSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreatingUser: false,
      isCreateUserSuccess: true,
    };
  }),
  on(UserActions.createUserFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isCreatingUser: false,
      createUserErrorMessage: action.error,
    };
  }),

  on(UserActions.getUserById, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isGettingUser: true,
    };
  }),
  on(UserActions.getUserByIdSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      user: action.user,
      isGettingUser: false,
      isGetUserSuccess: true,
    };
  }),
  on(UserActions.getUserByIdFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isGettingUser: false,
      getUserErrorMessage: action.error,
    };
  }),
  on(UserActions.updateUser, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdatingUser: true,
    };
  }),
  on(UserActions.updateUserSuccess, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdatingUser: false,
      isUpdateUserSuccess: true,
    };
  }),
  on(UserActions.updateUserFailure, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...state,
      isUpdatingUser: false,
      updateUserErrorMessage: action.error,
    };
  }),
  on(UserActions.clearState, (state, action) => {
    console.log(action.type);
    return <UserState>{
      ...initialState,
    };
  }),
);
