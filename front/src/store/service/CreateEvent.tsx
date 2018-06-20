import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { CREATE_EVENT } from '../../action/EventActionType';
import { firebaseAuth } from '../../firebase';
import { IUserInfo } from '../../types';
import {
  fetchDataFromGivenPass,
  fetchNewKeyString,
  update,
} from '../repository';

async function createEvent(
  payload: any,
  eventsList: any[],
  userInfo: IUserInfo,
  user: any,
  newKey: string
) {
  const { title, date, location, body } = payload;

  // テーブル設計を見直す必要がある
  delete userInfo.joinEventList;

  // postEventData
  const postEventData = {
    body,
    date,
    eventId: newKey,
    isDelete: false,
    location,
    participants: [userInfo],
    sponsor: userInfo,
    title,
  };

  eventsList.push(postEventData);

  // set updateData
  const updateData = {};
  updateData[`events/${newKey}`] = postEventData;
  updateData[`users/${user.uid}/joinEventList`] = eventsList;

  return updateData;
}

export default function* createEventService() {
  while (true) {
    const { payload } = yield take(CREATE_EVENT);
    const user = firebaseAuth.currentUser;
    if (user) {
      // fetch
      const fetchedUser = yield call(
        fetchDataFromGivenPass,
        `users/${user.uid}`
      );

      // assign eventsList
      let eventsList = [];
      if (fetchedUser.joinEventList) {
        eventsList = fetchedUser.joinEventList;
      }

      // new userInfo
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        joinEventList: eventsList,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      const newKey = yield call(fetchNewKeyString);

      // fetch new updateData
      const updateData = yield call(
        createEvent,
        payload,
        eventsList,
        userInfo,
        user,
        newKey
      );

      yield call(update, updateData);
      yield put(push('/'));
    }
  }
}
