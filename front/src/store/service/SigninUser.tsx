import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
} from '../../action/UserActionType';
import { firebaseAuth } from '../../firebase';

function signinUser(payload: { email: string; password: string }) {
  const { email, password } = payload;
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

  return firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return { isAuth: true, message: '' };
    })
    .catch((error: { message: string }) => {
      return { isAuth: false, message: error.message };
    });
}

export default function* signinUserService() {
  while (true) {
    const { payload } = yield take(SIGNIN_USER);

    // signin
    const { isAuth, message } = yield call(signinUser, payload);

    if (isAuth) {
      yield put({
        type: SIGNIN_USER_SUCCESS,
      });
      yield put({ type: FETCH_USER_INFO_FROM_SESSION_STORAGE });
      yield put(push('/'));
    } else {
      yield put({
        message,
        type: SIGNIN_USER_FAILED,
      });
    }
  }
}
