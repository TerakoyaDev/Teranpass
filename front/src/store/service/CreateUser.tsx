import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_FAILED,
  CREATE_NEW_USER_SUCCESS,
} from '../../action/UserActionType';
import { firebaseAuth } from '../../firebase';
import { storeDataToGivenPass, updateUserImage } from '../repository';

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

export default function* createNewUserService() {
  while (true) {
    // fetch payload
    const { payload } = yield take(CREATE_NEW_USER);

    const { userName, email, password, photoFile, photoFileInstance } = payload;

    // create new user
    const { isCreated, message } = yield call(
      createNewUserToDB,
      email,
      password
    );

    if (isCreated) {
      const user = firebaseAuth.currentUser;
      if (user) {
        // fetch downloadLink
        const downloadLink = yield call(
          updateUserImage,
          user.uid,
          photoFile,
          photoFileInstance
        );

        // update user profile
        const userInfo = yield call(updateUserProfile, userName, downloadLink);

        // store
        yield call(storeDataToGivenPass, `users/${userInfo.uid}`, {
          ...userInfo,
        });

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
}
