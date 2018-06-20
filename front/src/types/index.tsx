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
  joinEventList: IEvent[];
}

export interface IEvent {
  body: string;
  date: string;
  eventId: string;
  isDelete: boolean;
  location: string;
  participants: IUserInfo[];
  sponsor: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
  };
  title: string;
}
