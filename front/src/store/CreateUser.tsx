import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
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

export default function* createNewUserService() {
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
        'https://materialdesignicons.com/api/download/icon/png/1D7E8F31-998D-442A-80E6-EBB8DFA8CBA2/48'
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
