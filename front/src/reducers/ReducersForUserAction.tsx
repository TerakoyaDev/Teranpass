import {
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
} from '../action/ActionOfUserType';

const initialState = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
};

function fetchUserInfoFromSessionStorage() {
  const storage = window.sessionStorage;
  console.log(storage);
  const filteredKeys = Object.keys(storage).filter(
    (n: string) =>
      JSON.parse(storage[n]).authDomain === 'teranpass.firebaseapp.com'
  );
  if (filteredKeys.length !== 0) {
    const filteredUser = JSON.parse(storage[filteredKeys[0]]);
    if (filteredUser) {
      return filteredUser;
    }
  }
  return initialState;
}

const reducersForUserAction = (
  state: any = {
    isSigned: false,
    message: '',
    userInfo: {
      ...initialState,
    },
  },
  action: any
): any => {
  switch (action.type) {
    case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        isSigned: true,
        message: '',
        userInfo: action.userInfo.userInfo,
      };
    case CREATE_NEW_USER_FAILED:
      return {
        isSigned: false,
        message: action.message,
        userInfo: {
          ...initialState,
        },
      };
    case FETCH_USER_INFO_FROM_SESSION_STORAGE:
      return {
        ...state,
        isSigned: true,
        message: '',
        userInfo: fetchUserInfoFromSessionStorage(),
      };
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isSigned: true,
        message: '',
      };
    case SIGNIN_USER_FAILED:
      return {
        ...state,
        isSigned: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default reducersForUserAction;
