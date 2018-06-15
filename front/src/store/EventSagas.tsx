import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT_DATE_LIST,
  FETCH_EVENT_DATE_LIST_FAILED,
  FETCH_EVENT_DATE_LIST_SUCCESS,
} from '../action/EventActionType';
import { IUserInfo } from '../App';
import { firebaseAuth, firebaseDb } from '../firebase';

async function fetchDataFromGivenPass(path: string) {
  return (await firebaseDb.ref(path).once('value')).val();
}

function* parseEventListForEventDateList(fetchedEventList: any) {
  let val = [];
  if (fetchedEventList) {
    val = fetchedEventList;
  }
  const filteredEvent = Object.keys(val).filter(
    n => !fetchedEventList[n].isDelete
  );
  const dateList = filteredEvent
    .filter(n => new Date(fetchedEventList[n].date) >= new Date())
    .map(n => new Date(fetchedEventList[n].date));
  const eventList = filteredEvent
    .filter(n => new Date(fetchedEventList[n].date) >= new Date())
    .map(n => fetchedEventList[n]);
  return { dateList, eventList };
}

export function* fetchEventListDataService() {
  while (true) {
    yield take(FETCH_EVENT_DATE_LIST);
    const fetchedEventList = yield call(fetchDataFromGivenPass, 'events');
    const { dateList, eventList } = yield call(
      parseEventListForEventDateList,
      fetchedEventList
    );
    if (dateList && eventList) {
      yield put({
        dateList,
        eventList,
        type: FETCH_EVENT_DATE_LIST_SUCCESS,
      });
    } else {
      yield put({
        type: FETCH_EVENT_DATE_LIST_FAILED,
      });
    }
  }
}

// createEvent
async function createEvent(
  payload: any,
  eventsList: any[],
  userInfo: IUserInfo,
  user: any
) {
  const { title, date, location, body } = payload;
  // get key
  const newPostKey = await firebaseDb.ref(`events`).push().key;

  // テーブル設計を見直す必要がある
  delete userInfo.joinEventList;
  // postEventData
  const postEventData = {
    body,
    date,
    eventId: newPostKey,
    isDelete: false,
    location,
    participants: [userInfo],
    sponsor: userInfo,
    title,
  };

  eventsList.push(postEventData);

  // update
  const updates = {};
  updates[`events/${newPostKey}`] = postEventData;
  updates[`users/${user.uid}/joinEventList`] = eventsList;

  return await firebaseDb.ref().update(updates);
}

export function* createEventService() {
  while (true) {
    const { payload } = yield take(CREATE_EVENT);
    const user = firebaseAuth.currentUser;
    if (user) {
      const fetchedUser = yield call(
        fetchDataFromGivenPass,
        `users/${user.uid}`
      );

      // assign eventsList
      let eventsList = [];
      if (fetchedUser.joinEventList) {
        eventsList = fetchedUser.joinEventList;
      }
      const userInfo = {
        description: fetchedUser.description,
        displayName: user.displayName,
        email: user.email,
        joinEventList: eventsList,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      yield call(createEvent, payload, eventsList, userInfo, user);

      yield put(push('/'));
    }
  }
}

export function* deleteEventService() {
  while (true) {
    yield take(DELETE_EVENT);
  }
}
