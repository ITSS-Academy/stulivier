import { UserModel } from '../../models/user.model';

export interface UserState {
  user: UserModel;
  userById: UserModel;

  isGettingUser: boolean;
  isGetUserSuccess: boolean;
  getUserErrorMessage: string;

  isGettingUserById: boolean;
  isGetUserByIdSuccess: boolean;
  getUserByIdErrorMessage: string;

  isCreatingUser: boolean;
  isCreateUserSuccess: boolean;
  createUserErrorMessage: string;

  isUpdatingChannelImage: boolean;
  isUpdateChannelImageSuccess: boolean;
  updateChannelImageErrorMessage: string;

  isUpdatingAvatar: boolean;
  isUpdateAvatarSuccess: boolean;
  updateAvatarErrorMessage: string;

  isUpdatingDescribe: boolean;
  isUpdateDescribeSuccess: boolean;
  updateDescribeErrorMessage: string;
}
