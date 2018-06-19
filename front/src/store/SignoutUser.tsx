import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  SIGNOUT_USER,
  SIGNOUT_USER_FAILED,
  SIGNOUT_USER_SUCCESS,
} from '../action/UserActionType';
import { firebaseAuth } from '../firebase';

function signoutUser() {
  return firebaseAuth
    .signOut()
    .then(() => {
      return { isSignout: true, message: '' };
    })
    .catch(e => {
      return { isSignout: false, message: e.message };
    });
}

export default function* signoutUserService() {
  while (true) {
    yield take(SIGNOUT_USER);
    const { isSignout, message } = yield call(signoutUser);
    if (isSignout) {
      yield put({
        type: SIGNOUT_USER_SUCCESS,
      });
      yield put(push('/'));
    } else {
      yield put({
        message,
        type: SIGNOUT_USER_FAILED,
      });
    }
  }
}
