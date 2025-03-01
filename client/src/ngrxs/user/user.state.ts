import { UserModel } from '../../models/user.model';

export interface UserState {
  user: UserModel;
  isGettingUser: boolean;
  isGetUserSuccess: boolean;
  getUserErrorMessage: string;

  isCreatingUser: boolean;
  isCreateUserSuccess: boolean;
  createUserErrorMessage: string;

  isUpdatingUser: boolean;
  isUpdateUserSuccess: boolean;
  updateUserErrorMessage: string;
}
