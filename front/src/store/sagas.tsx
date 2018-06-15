import { fork } from 'redux-saga/effects';
import {
  createEventService,
  deleteEventService,
  fetchEventListDataService,
} from './EventSagas';
import {
  createNewUserService,
  signinUserService,
  signoutUserService,
} from './UserSagas';

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
  yield fork(fetchEventListDataService);
  yield fork(createEventService);
  yield fork(deleteEventService);
  yield fork(signoutUserService);
}

export default mySaga;
