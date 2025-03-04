export interface UserModel {
  id: string;
  username: string;
  email: string;
  describe: string;
  background_url: string;
  avatar_url: string;
  joined_date: string;
}

export interface FirebaseUserModel {
  uid: string;
  email: string;
  name: string;
  picture: string;
}

export interface CreateUserModel {
  id: string;
  userName: string;
  email: string;
  describe: string;
  background_url: string;
  avatarURL: string;
  joinedDate: string;
}
