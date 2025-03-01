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

export const updateUser = createAction(
  '[User] Update',
  props<{ user: UserModel }>(),
);
export const updateUserSuccess = createAction('[User] Update Success');
export const updateUserFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>(),
);

export const clearState = createAction('[User] Clear State');
