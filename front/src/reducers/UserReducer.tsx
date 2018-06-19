import {
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_DATABASE_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_FAILED,
  SIGNOUT_USER_SUCCESS,
  SNACKBAR_CLOSE,
  SNACKBAR_OPEN,
} from '../action/UserActionType';

const initialState = {
  isAuth: false,
  isOpenSnackbar: false,
  message: '',
  userInfo: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
};

function fetchUserInfoFromSessionStorage() {
  const storage = window.sessionStorage;
  const filteredKeys = Object.keys(storage).filter(
    (n: string) =>
      JSON.parse(storage[n]).authDomain === 'teranpass.firebaseapp.com'
  );
  if (filteredKeys.length !== 0) {
    const filteredUser = JSON.parse(storage[filteredKeys[0]]);
    if (filteredUser) {
      return { isAuth: true, userInfo: filteredUser };
    }
  }
  return { isAuth: false, userInfo: initialState };
}

const userReducer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        message: '',
        userInfo: action.userInfo,
      };
    case CREATE_NEW_USER_FAILED:
      return {
        isAuth: false,
        message: action.message,
        userInfo: {
          ...initialState,
        },
      };
    case FETCH_USER_INFO_FROM_SESSION_STORAGE:
      const { isAuth, userInfo } = fetchUserInfoFromSessionStorage();
      return {
        ...state,
        isAuth,
        message: '',
        userInfo,
      };
    case FETCH_USER_INFO_FROM_DATABASE_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        message: '',
      };
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        isAuth: false,
        message: action.message,
      };
    case SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        isAuth: false,
      };
    case SIGNOUT_USER_FAILED:
      return {
        ...state,
      };
    case SNACKBAR_OPEN:
      return {
        ...state,
        isOpenSnackbar: true,
      };
    case SNACKBAR_CLOSE:
      return {
        ...state,
        isOpenSnackbar: false,
      };
    default:
      return state;
  }
};

export default userReducer;
