import { call, put, take } from 'redux-saga/effects';
import {
  FETCH_EVENT_DATE_LIST,
  FETCH_EVENT_DATE_LIST_FAILED,
  FETCH_EVENT_DATE_LIST_SUCCESS,
} from '../../action/EventActionType';
import { fetchDataFromGivenPass } from '../repository';

function* parseEventListForEventDateList(fetchedEventList: any) {
  // isEmpty
  let val = [];
  if (fetchedEventList) {
    val = fetchedEventList;
  }

  // filter deleted event
  const filteredEvent = Object.keys(val).filter(
    n => !fetchedEventList[n].isDelete
  );

  // filter past event
  const dateList = filteredEvent
    .filter(n => new Date(fetchedEventList[n].date) >= new Date())
    .map(n => new Date(fetchedEventList[n].date));
  const eventList = filteredEvent
    .filter(n => new Date(fetchedEventList[n].date) >= new Date())
    .map(n => fetchedEventList[n]);

  return { dateList, eventList };
}

export default function* fetchEventListDataService() {
  while (true) {
    yield take(FETCH_EVENT_DATE_LIST);

    // fetch
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
