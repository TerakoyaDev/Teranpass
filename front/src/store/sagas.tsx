import { fork } from 'redux-saga/effects';
import createEventService from './service/CreateEvent';
import createNewUserService from './service/CreateUser';
import deleteEventService from './service/DeleteEvent';
import fetchEventListDataService from './service/FetchEventListData';
import signinUserService from './service/SigninUser';
import signoutUserService from './service/SignoutUser';
import updateEventService from './service/UpdateEvent';
import updateUserService from './service/UpdateUser';

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
  yield fork(fetchEventListDataService);
  yield fork(createEventService);
  yield fork(updateEventService);
  yield fork(deleteEventService);
  yield fork(signoutUserService);
  yield fork(updateUserService);
}

export default mySaga;
