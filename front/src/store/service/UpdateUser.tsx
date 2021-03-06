import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../../action/UserActionType';
import { FETCH_USER_INFO_FROM_SESSION_STORAGE } from '../../action/UserActionType';
import { firebaseAuth } from '../../firebase';
import { changeDateFormat } from '../../utils/DateFormat';
import {
  fetchDataFromGivenPass,
  storeDataToGivenPass,
  update,
  updateProfile,
  updateUserImage,
} from '../repository';

export default function* updateUserService() {
  while (true) {
    const { payload } = yield take(UPDATE_USER);
    try {
      const { photoFileInstance, photoURL, userName } = payload;
      const user = firebaseAuth.currentUser;
      if (user) {
        // fetch download link
        const downloadLink = yield call(
          updateUserImage,
          user.uid,
          photoURL,
          photoFileInstance
        );

        yield call(updateProfile, user, userName, downloadLink);

        // fetch
        const joinEventList = yield call(
          fetchDataFromGivenPass,
          `users/${user.uid}/joinEventList`
        );

        // store
        yield call(storeDataToGivenPass, `users/${user.uid}`, {
          displayName: userName,
          email: user.email,
          joinEventList,
          photoURL: downloadLink,
          uid: user.uid,
        });

        // check all events
        const events = yield call(fetchDataFromGivenPass, 'events');
        const updates = {};
        if (events) {
          Object.keys(events).map((n: any) => {
            if (events[n].date >= changeDateFormat(new Date())) {
              updates[`events/${n}`] = {
                ...events[n],
                participants: events[n].participants.map(
                  (m: any) =>
                    m.uid === user.uid
                      ? {
                          displayName: userName,
                          email: user.email,
                          photoURL: downloadLink,
                          uid: user.uid,
                        }
                      : m
                ),
                sponsor:
                  user.uid === events[n].sponsor.uid
                    ? {
                        displayName: userName,
                        email: user.email,
                        photoURL: downloadLink,
                        uid: user.uid,
                      }
                    : events[n].sponsor,
              };
            }
          });
        }

        // check all users
        const users = yield call(fetchDataFromGivenPass, 'users');
        if (users) {
          Object.keys(users).map((n: any) => {
            if (
              users[n].joinEventList !== undefined &&
              users[n].joinEventList.date >= changeDateFormat(new Date())
            ) {
              updates[`users/${n}`] = {
                ...users[n],
                joinEventList: users[n].joinEventList.map((m: any) => {
                  return {
                    ...m,
                    sponsor:
                      m.sponsor.uid === user.uid
                        ? {
                            displayName: userName,
                            email: user.email,
                            photoURL: downloadLink,
                            uid: user.uid,
                          }
                        : m.sponsor,
                  };
                }),
              };
            }
          });
        }
        yield call(update, updates);
      }
      yield put({ type: FETCH_USER_INFO_FROM_SESSION_STORAGE });
      yield put({ type: UPDATE_USER_SUCCESS });
      yield put(push('/'));
    } catch {
      yield put({ type: UPDATE_USER_FAILED });
    }
  }
}
