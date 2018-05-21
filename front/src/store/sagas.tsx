import * as firebase from 'firebase';
import { push } from 'react-router-redux';
import { call, fork, put, take } from 'redux-saga/effects';
import { firebaseAuth, firebaseDb } from '../firebase';

function* createNewUserToFirebase(payload: {
  userName: string;
  email: string;
  password: string;
}) {
  const { userName, email, password } = payload;
  // set session mode of firebase
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

  // create account
  firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
    const user = firebaseAuth.currentUser;
    if (user) {
      // update user profile
      user.updateProfile({
        displayName: userName,
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/teranpass.appspot.com/o/account-circle.png?alt=media&token=2c34cb44-a79e-4315-9f26-f868dfc0c550',
      });

      // push data to database
      firebaseDb.ref(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
    }
  });
  // push '/' page
  yield put(push('/'));
}

function* createNewUserService() {
  while (true) {
    // fetch payload
    const { payload } = yield take('CREATE_NEW_USER');
    yield call(createNewUserToFirebase, payload);
  }
}

function* mySaga() {
  yield fork(createNewUserService);
}

export default mySaga;
