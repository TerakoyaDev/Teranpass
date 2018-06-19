import { fork } from 'redux-saga/effects';
import createNewUserService from './CreateUser';
import {
  createEventService,
  deleteEventService,
  fetchEventListDataService,
} from './EventSagas';
import signinUserService from './SigninUser';
import signoutUserService from './SignoutUser';

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
  yield fork(fetchEventListDataService);
  yield fork(createEventService);
  yield fork(deleteEventService);
  yield fork(signoutUserService);
}

export default mySaga;
