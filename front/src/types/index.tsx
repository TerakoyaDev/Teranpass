export interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface IUserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  joinEventList: IUser[];
}
