import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { UPDATE_EVENT } from '../../action/EventActionType';
import { firebaseAuth } from '../../firebase';
import { IEvent } from '../../types';
import { fetchDataFromGivenPass, update } from '../repository';

export default function* updateEventService() {
  while (true) {
    const { payload } = yield take(UPDATE_EVENT);
    const user = firebaseAuth.currentUser;
    if (user) {
      const updates = {};

      const { id, title, date, location, body } = payload;

      // fetch
      const targetEvent = yield call(fetchDataFromGivenPass, `events/${id}`);

      // set each value
      targetEvent.title = title;
      targetEvent.date = date;
      targetEvent.location = location;
      targetEvent.body = body;

      updates[`events/${id}`] = targetEvent;

      // check all participants and change joinEventList
      for (const val of targetEvent.participants) {
        const targetUser = yield call(
          fetchDataFromGivenPass,
          `users/${val.uid}`
        );
        const newJoinEventList = targetUser.joinEventList.map((ev: IEvent) => {
          return ev.eventId === id
            ? {
                ...ev,
                body,
                date,
                location,
                title,
              }
            : {
                ...ev,
              };
        });
        updates[`users/${val.uid}`] = {
          ...targetUser,
          joinEventList: newJoinEventList,
        };
      }

      // update
      yield call(update, updates);

      // history push
      yield put(push('/'));
    }
  }
}
