import { UserState } from './user.state';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserModel } from '../../models/user.model';

const initialState: UserState = {
  user: <UserModel>{},
  userById: <UserModel>{},

  isGettingUser: false,
  isGetUserSuccess: false,
  getUserErrorMessage: '',

  isGettingUserById: false,
  isGetUserByIdSuccess: false,
  getUserByIdErrorMessage: '',

  isCreatingUser: false,
  isCreateUserSuccess: false,
  createUserErrorMessage: '',

  isUpdatingChannelImage: false,
  isUpdateChannelImageSuccess: false,
  updateChannelImageErrorMessage: '',

  isUpdatingAvatar: false,
  isUpdateAvatarSuccess: false,
  updateAvatarErrorMessage: '',

  isUpdatingDescribe: false,
  isUpdateDescribeSuccess: false,
  updateDescribeErrorMessage: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.createUser, (state, action) => {
    return <UserState>{
      ...state,
      isCreatingUser: true,
    };
  }),
  on(UserActions.createUserSuccess, (state, action) => {
    return <UserState>{
      ...state,
      isCreatingUser: false,
      isCreateUserSuccess: true,
    };
  }),
  on(UserActions.createUserFailure, (state, action) => {
    return <UserState>{
      ...state,
      isCreatingUser: false,
      createUserErrorMessage: action.error,
    };
  }),

  on(UserActions.getUser, (state, action) => {
    return <UserState>{
      ...state,
      isGettingUser: true,
    };
  }),
  on(UserActions.getUserSuccess, (state, action) => {
    return <UserState>{
      ...state,
      user: action.user,
      isGettingUser: false,
      isGetUserSuccess: true,
    };
  }),
  on(UserActions.getUserFailure, (state, action) => {
    return <UserState>{
      ...state,
      isGettingUser: false,
      getUserErrorMessage: action.error,
    };
  }),

  on(UserActions.getUserById, (state, action) => {
    return <UserState>{
      ...state,
      isGettingUserById: true,
    };
  }),
  on(UserActions.getUserByIdSuccess, (state, action) => {
    return <UserState>{
      ...state,
      userById: action.userById,
      isGettingUserById: false,
      isGetUserByIdSuccess: true,
    };
  }),
  on(UserActions.getUserByIdFailure, (state, action) => {
    return <UserState>{
      ...state,
      isGettingUserById: false,
      getUserByIdErrorMessage: action.error,
    };
  }),

  on(UserActions.updateChannelImage, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingChannelImage: true,
    };
  }),

  on(UserActions.updateChannelImageSuccess, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingChannelImage: false,
      isUpdateChannelImageSuccess: true,
    };
  }),

  on(UserActions.updateChannelImageFailure, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingChannelImage: false,
      updateChannelImageErrorMessage: action.error,
    };
  }),

  on(UserActions.updateAvatar, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingAvatar: true,
    };
  }),

  on(UserActions.updateAvatarSuccess, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingAvatar: false,
      isUpdateAvatarSuccess: true,
    };
  }),

  on(UserActions.updateAvatarFailure, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingAvatar: false,
      updateAvatarErrorMessage: action.error,
    };
  }),

  on(UserActions.updateDescribe, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingDescribe: true,
    };
  }),

  on(UserActions.updateDescribeSuccess, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingDescribe: false,
      isUpdateDescribeSuccess: true,
    };
  }),

  on(UserActions.updateDescribeFailure, (state, action) => {
    return <UserState>{
      ...state,
      isUpdatingDescribe: false,
      updateDescribeErrorMessage: action.error,
    };
  }),

  on(UserActions.clearState, (state, action) => {
    return <UserState>{
      ...initialState,
    };
  }),

  on(UserActions.clearUserById, (state, action) => {
    return <UserState>{
      ...state,
      userById: <UserModel>{},

      isGettingUserById: false,
      isGetUserByIdSuccess: false,
      getUserByIdErrorMessage: '',

      isCreatingUser: false,
      isCreateUserSuccess: false,
      createUserErrorMessage: '',

      isUpdatingChannelImage: false,
      isUpdateChannelImageSuccess: false,
      updateChannelImageErrorMessage: '',

      isUpdatingAvatar: false,
      isUpdateAvatarSuccess: false,
      updateAvatarErrorMessage: '',

      isUpdatingDescribe: false,
      isUpdateDescribeSuccess: false,
      updateDescribeErrorMessage: '',
    };
  }),
);
