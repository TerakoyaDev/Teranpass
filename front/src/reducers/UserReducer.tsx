import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_DATABASE_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_FAILED,
  SIGNOUT_USER_SUCCESS,
  SNACKBAR_CLOSE,
  SNACKBAR_OPEN,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../action/UserActionType';

const initialState = {
  isAuth: false,
  isOpenSnackbar: false,
  isProcessingForUser: false,
  message: '',
  otherUserInfo: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
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
    case CREATE_NEW_USER:
      return {
        ...state,
        isProcessingForUser: true,
        message: '',
      };
    case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isProcessingForUser: false,
        message: '',
        userInfo: action.userInfo,
      };
    case CREATE_NEW_USER_FAILED:
      return {
        isAuth: false,
        isProcessingForUser: false,
        message: action.message,
        userInfo: {
          ...initialState,
        },
      };
    case UPDATE_USER:
      return {
        ...state,
        isProcessingForUser: true,
        message: '',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isProcessingForUser: false,
        message: '',
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isProcessingForUser: false,
        message: '',
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
        otherUserInfo: action.userInfo,
      };
    case SIGNIN_USER:
      return {
        ...state,
        isProcessingForUser: true,
        message: '',
      };
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isProcessingForUser: false,
        message: '',
      };
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        isAuth: false,
        isProcessingForUser: false,
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
