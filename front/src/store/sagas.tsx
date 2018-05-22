import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, fork, put, take } from 'redux-saga/effects';
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
  FETCH_USER_INFO_FROM_SESSION_STORAGE,
  SIGNIN_USER,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
} from '../action/ActionOfUserType';
import { firebaseAuth, firebaseDb } from '../firebase';

// create new user
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
    .then(async () => {
      const user = firebaseAuth.currentUser;
      if (user) {
        // update user profile
        const defaultURL =
          'https://firebasestorage.googleapis.com/v0/b/teranpass.appspot.com/o/account-circle.png?alt=media&token=2c34cb44-a79e-4315-9f26-f868dfc0c550';

        await user.updateProfile({
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
        await firebaseDb.ref(`users/${user.uid}`).set({
          userInfo,
        });
        return { isCreated: true, userInfo: { userInfo }, message: '' };
      }
      return { isCreated: false, userInfo: {}, message: '' };
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
      yield put({ type: FETCH_USER_INFO_FROM_SESSION_STORAGE });
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
      const user = firebaseAuth.currentUser;
      if (user) {
        firebaseDb.ref(`users/${user.uid}`).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      }
      return { isSigned: true, message: '' };
    })
    .catch((error: { message: string }) => {
      return { isSigned: false, message: error.message };
    });
}

function* signinUserService() {
  while (true) {
    const { payload } = yield take(SIGNIN_USER);
    console.log(payload);
    const { isSigned, message } = yield call(signinUser, payload);
    if (isSigned) {
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

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
}

export default mySaga;
