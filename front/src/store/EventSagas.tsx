import { call, put, take } from 'redux-saga/effects';
import { firebaseDb } from '../firebase';

import {
  FETCH_EVENT_DATE_LIST,
  FETCH_EVENT_DATE_LIST_FAILED,
  FETCH_EVENT_DATE_LIST_SUCCESS,
} from '../action/EventActionType';

function fetchEventListData() {
  return firebaseDb
    .ref(`events`)
    .once('value')
    .then(val => {
      const dateList: Date[] = [];
      JSON.parse(JSON.stringify(val), (key, value) => {
        if (key === 'date') {
          const dateObject = value.split(' ')[0].split('/');
          dateList.push(
            new Date(dateObject[0], dateObject[1] - 1, dateObject[2])
          );
        }
      });
      return dateList;
    });
}

export function* fetchEventListDataService() {
  while (true) {
    yield take(FETCH_EVENT_DATE_LIST);
    const dateList = yield call(fetchEventListData);
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
