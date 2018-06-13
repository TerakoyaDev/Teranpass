import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_FAILED,
  SIGNOUT_USER_SUCCESS,
} from '../action/UserActionType';
import { IUserInfo } from '../App';
import { firebaseAuth, firebaseDb } from '../firebase';

// create new user
function createNewUserToDB(email: string, password: string) {
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

  // create account
  return firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      return { isCreated: true, message: '' };
    })
    .catch(e => {
      return { isCreated: false, message: e.message };
    });
}

async function updateUserProfile(userName: string, photoURL: string) {
  const user = await firebaseAuth.currentUser;
  if (user) {
    await user.updateProfile({
      displayName: userName,
      photoURL,
    });

    const userInfo = {
      displayName: userName,
      email: user.email,
      photoURL,
      uid: user.uid,
    };
    return userInfo;
  } else {
    return {};
  }
}

async function postUserDataToDB(userInfo: IUserInfo) {
  // push data to database
  await firebaseDb.ref(`users/${userInfo.uid}`).set({
    ...userInfo,
    description: 'エンジニア',
  });
}

export function* createNewUserService() {
  while (true) {
    // fetch payload
    const { payload } = yield take(CREATE_NEW_USER);

    const { userName, email, password } = payload;

    // createNewUserToFirebase
    const { isCreated, message } = yield call(
      createNewUserToDB,
      email,
      password
    );
    // TODO transaction?
    if (isCreated) {
      const userInfo = yield call(
        updateUserProfile,
        userName,
        'https://firebasestorage.googleapis.com/v0/b/teranpass.appspot.com/o/account-circle.png?alt=media&token=2c34cb44-a79e-4315-9f26-f868dfc0c550'
      );
      yield call(postUserDataToDB, userInfo);
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

// signin user
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

export function* signinUserService() {
  while (true) {
    const { payload } = yield take(SIGNIN_USER);
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

// signout
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

export function* signoutUserService() {
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
