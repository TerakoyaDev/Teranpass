import { fork } from 'redux-saga/effects';
import { fetchEventListDataService } from './EventSagas';
import {
  createNewUserService,
  signinUserService,
  signoutUserService,
} from './UserSagas';

function* mySaga() {
  yield fork(createNewUserService);
  yield fork(signinUserService);
  yield fork(fetchEventListDataService);
  yield fork(signoutUserService);
}

export default mySaga;
