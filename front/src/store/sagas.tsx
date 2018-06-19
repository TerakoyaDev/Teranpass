import { fork } from 'redux-saga/effects';
import {
  createEventService,
  deleteEventService,
  fetchEventListDataService,
  updateEventService,
} from './EventSagas';
import createNewUserService from './service/CreateUser';
import signinUserService from './service/SigninUser';
import signoutUserService from './service/SignoutUser';

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
  yield fork(fetchEventListDataService);
  yield fork(createEventService);
  yield fork(updateEventService);
  yield fork(deleteEventService);
  yield fork(signoutUserService);
}

export default mySaga;
