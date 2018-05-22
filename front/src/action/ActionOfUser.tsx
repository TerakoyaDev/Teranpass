import {
  CREATE_NEW_USER,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
} from './ActionOfUserType';

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
