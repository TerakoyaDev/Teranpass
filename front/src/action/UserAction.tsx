import {
  CREATE_NEW_USER,
  FETCH_USER_INFO_FROM_DATABASE,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNOUT_USER,
  SNACKBAR_CLOSE,
  SNACKBAR_OPEN,
  UPDATE_USER,
} from './UserActionType';

export const createNewUser = (
  userName: string,
  email: string,
  password: string,
  photoFileInstance: {},
  photoFile: string
) => {
  return {
    payload: {
      email,
      password,
      photoFile,
      photoFileInstance,
      userName,
    },
    type: CREATE_NEW_USER,
  };
};

export const updateUser = (
  userName: string,
  photoFileInstance: {},
  photoURL: string
) => {
  return {
    payload: {
      photoFileInstance,
      photoURL,
      userName,
    },
    type: UPDATE_USER,
  };
};

export const fetchUserInfoFromSessionStorage = () => {
  return {
    type: FETCH_USER_INFO_FROM_SESSION_STORAGE,
  };
};

export const fetchUserInfoFromDatabase = (userId: string) => {
  return {
    payload: {
      userId,
    },
    type: FETCH_USER_INFO_FROM_DATABASE,
  };
};

export const signinUser = (email: string, password: string) => {
  return {
    payload: {
      email,
      password,
    },
    type: SIGNIN_USER,
  };
};

export const signoutUser = () => {
  return {
    type: SIGNOUT_USER,
  };
};

export const snackbarOpen = () => {
  return {
    type: SNACKBAR_OPEN,
  };
};

export const snackbarClose = () => {
  return {
    type: SNACKBAR_CLOSE,
  };
};
