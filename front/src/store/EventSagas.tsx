import { call, put, take } from 'redux-saga/effects';
import { firebaseDb } from '../firebase';

import {
  FETCH_EVENT_DATE_LIST,
  FETCH_EVENT_DATE_LIST_FAILED,
  FETCH_EVENT_DATE_LIST_SUCCESS,
} from '../action/EventActionType';

async function fetchEventListData() {
  return await firebaseDb.ref(`events`).once('value');
}

function* parseEventListForEventDateList(val: any) {
  const dateList: Date[] = [];

  // collect date data
  JSON.parse(JSON.stringify(val), (key, value) => {
    if (key === 'date') {
      const dateObject = value.split(' ')[0].split('/');
      dateList.push(new Date(dateObject[0], dateObject[1] - 1, dateObject[2]));
    }
  });
  return dateList;
}

export function* fetchEventListDataService() {
  while (true) {
    yield take(FETCH_EVENT_DATE_LIST);
    const eventList = yield call(fetchEventListData);
    const dateList = yield call(parseEventListForEventDateList, eventList);
    if (dateList) {
      yield put({
        dateList,
        type: FETCH_EVENT_DATE_LIST_SUCCESS,
      });
    } else {
      yield put({
        type: FETCH_EVENT_DATE_LIST_FAILED,
      });
    }
  }
}
