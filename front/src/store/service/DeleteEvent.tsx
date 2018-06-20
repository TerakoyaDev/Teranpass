import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';
import { DELETE_EVENT } from '../../action/EventActionType';
import { firebaseAuth } from '../../firebase';
import { IEvent } from '../../types';
import { fetchDataFromGivenPass, update } from '../repository';

export default function* deleteEventService() {
  while (true) {
    const { payload } = yield take(DELETE_EVENT);
    const { eventId } = payload;
    const user = firebaseAuth.currentUser;
    if (user) {
      // update
      const updates = {};

      // fetch
      const joinEventList = yield call(
        fetchDataFromGivenPass,
        `users/${user.uid}/joinEventList`
      );
      const event: IEvent = yield call(
        fetchDataFromGivenPass,
        `events/${eventId}`
      );

      event.isDelete = true;

      // set updateData
      updates[`events/${eventId}`] = event;
      updates[`users/${user.uid}/joinEventList`] = joinEventList.filter(
        (n: IEvent) => n.eventId !== eventId
      );

      // check all users
      const users = yield call(fetchDataFromGivenPass, `users`);
      if (users) {
        Object.keys(users).map(
          (n: any) =>
            (updates[`users/${n}/joinEventList`] = joinEventList.filter(
              (m: IEvent) => m.eventId !== eventId
            ))
        );
      }

      yield call(update, updates);
      yield put(push('/'));
    }
  }
}
