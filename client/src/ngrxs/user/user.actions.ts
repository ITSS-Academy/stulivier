import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const createUser = createAction('[User] Create');
export const createUserSuccess = createAction('[User] Create Success');
export const createUserFailure = createAction(
  '[User] Create Failure',
  props<{ error: any }>(),
);

export const getUserById = createAction('[User] Get By Id');
export const getUserByIdSuccess = createAction(
  '[User] Get By Id Success',
  props<{ user: UserModel }>(),
);
export const getUserByIdFailure = createAction(
  '[User] Get By Id Failure',
  props<{ error: any }>(),
);

export const updateChannelImage = createAction(
  '[User] Update Channel Image',
  props<{
    channelImg: File;
    userId: string;
  }>(),
);
export const updateChannelImageSuccess = createAction(
  '[User] Update Channel Image Success',
);
export const updateChannelImageFailure = createAction(
  '[User] Update Channel Image Failure',
  props<{ error: any }>(),
);

export const updateAvatar = createAction(
  '[User] Update Avatar',
  props<{
    avatar: File;
    userId: string;
  }>(),
);

export const updateAvatarSuccess = createAction('[User] Update Avatar Success');

export const updateAvatarFailure = createAction(
  '[User] Update Avatar Failure',
  props<{ error: any }>(),
);

export const updateDescribe = createAction(
  '[User] Update Describe',
  props<{ userId: string; describe: string }>(),
);

export const updateDescribeSuccess = createAction(
  '[User] Update Describe Success',
);

export const updateDescribeFailure = createAction(
  '[User] Update Describe Failure',
  props<{ error: any }>(),
);

export const clearState = createAction('[User] Clear State');
