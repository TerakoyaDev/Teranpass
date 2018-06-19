import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { UPDATE_EVENT } from '../../action/EventActionType';
import { IEvent } from '../../components/EventPage';
import { firebaseAuth } from '../../firebase';
import { fetchDataFromGivenPass, update } from '../repository';

export default function* updateEventService() {
  while (true) {
    const { payload } = yield take(UPDATE_EVENT);
    const user = firebaseAuth.currentUser;
    if (user) {
      const updates = {};

      const { id, title, date, location, body } = payload;
      const targetEvent = yield call(fetchDataFromGivenPass, `events/${id}`);
      targetEvent.title = title;
      targetEvent.date = date;
      targetEvent.location = location;
      targetEvent.body = body;

      updates[`events/${id}`] = targetEvent;

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

      yield call(update, updates);
      yield put(push('/'));
    }
  }
}
