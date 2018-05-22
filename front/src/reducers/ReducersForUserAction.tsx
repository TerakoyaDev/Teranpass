import {
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE_FAILED,
  FETCH_USER_INFO_FROM_SESSION_STORAGE_SUCCESS,
} from '../action/ActionOfUserType';

const initialState = {
  displayName: '',
  email: '',
  photoURL: '',
  uid: '',
};

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
    case FETCH_USER_INFO_FROM_SESSION_STORAGE_SUCCESS:
      return {
        ...state,
        isSigned: true,
        userInfo: { ...action.filteredUser },
      };
    case FETCH_USER_INFO_FROM_SESSION_STORAGE_FAILED:
      return {
        ...state,
        isSigned: false,
      };
    default:
      return state;
  }
};

export default reducersForUserAction;
