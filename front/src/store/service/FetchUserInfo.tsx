import { call, put, take } from 'redux-saga/effects';
import {
  FETCH_USER_INFO_FROM_DATABASE,
  FETCH_USER_INFO_FROM_DATABASE_SUCCESS,
} from '../../action/UserActionType';
import { fetchDataFromGivenPass } from '../repository';

export default function* fetchUserInfoService() {
  while (true) {
    // fetch payload
    const { payload } = yield take(FETCH_USER_INFO_FROM_DATABASE);

    const { userId } = payload;

    // fetch
    const userInfo = yield call(fetchDataFromGivenPass, `users/${userId}`);

    if (userInfo) {
      yield put({
        type: FETCH_USER_INFO_FROM_DATABASE_SUCCESS,
        userInfo,
      });
    }
  }
}
