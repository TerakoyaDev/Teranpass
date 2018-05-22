import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, fork, put, take } from 'redux-saga/effects';
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  FETCH_USER_INFO_FROM_SESSION_STORAGE_FAILED,
  FETCH_USER_INFO_FROM_SESSION_STORAGE_SUCCESS,
} from '../action/ActionOfUserType';
import { firebaseAuth, firebaseDb } from '../firebase';

function createNewUserToFirebase(payload: {
  userName: string;
  email: string;
  password: string;
}) {
  const { userName, email, password } = payload;
  // set session mode of firebase
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

  // create account
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then((): any => {
      const user = firebaseAuth.currentUser;
      if (user) {
        // update user profile
        const defaultURL =
          'https://firebasestorage.googleapis.com/v0/b/teranpass.appspot.com/o/account-circle.png?alt=media&token=2c34cb44-a79e-4315-9f26-f868dfc0c550';

        user.updateProfile({
          displayName: userName,
          photoURL: defaultURL,
        });

        const userInfo = {
          displayName: userName,
          email: user.email,
          photoURL: defaultURL,
          uid: user.uid,
        };

        // push data to database
        firebaseDb.ref(`users/${user.uid}`).set({
          userInfo,
        });
        return { isCreated: true, userInfo: { userInfo }, message: '' };
      }
    })
    .catch(e => {
      return { isCreated: false, message: e.message };
    });
}

function* createNewUserService() {
  while (true) {
    // fetch payload
    const { payload } = yield take(CREATE_NEW_USER);
    const { isCreated, userInfo, message } = yield call(
      createNewUserToFirebase,
      payload
    );
    if (isCreated) {
      yield put({
        type: CREATE_NEW_USER_SUCCESS,
        userInfo,
      });
      yield put(push('/'));
    } else {
      yield put({
        message,
        type: CREATE_NEW_USER_FAILED,
      });
    }
  }
}

async function fetchUserInfoFromSessionStorage() {
  const storage = await window.sessionStorage;
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
}

function* fetchUserInfoFromSessionStorageService() {
  while (true) {
    yield take(FETCH_USER_INFO_FROM_SESSION_STORAGE);
    const { filteredUser } = yield call(fetchUserInfoFromSessionStorage);
    if (filteredUser) {
      yield put({
        payload: filteredUser,
        type: FETCH_USER_INFO_FROM_SESSION_STORAGE_SUCCESS,
      });
    } else {
      yield put({
        type: FETCH_USER_INFO_FROM_SESSION_STORAGE_FAILED,
      });
    }
  }
}

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(fetchUserInfoFromSessionStorageService);
}

export default mySaga;
