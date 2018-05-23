import {
  CREATE_NEW_USER,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNOUT_USER,
  SNACKBAR_CLOSE,
  SNACKBAR_OPEN,
} from './UserActionType';

export const createNewUser = (
  userName: string,
  email: string,
  password: string
) => {
  return {
    payload: {
      email,
      password,
      userName,
    },
    type: CREATE_NEW_USER,
  };
};

export const fetchUserInfoFromSessionStorage = () => {
  return {
    type: FETCH_USER_INFO_FROM_SESSION_STORAGE,
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
