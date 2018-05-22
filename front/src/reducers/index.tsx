import { combineReducers } from 'redux';
import EventReducer from './EventReducer';
import ReducersForUserAction from './ReducersForUserAction';

const reducers = combineReducers({
  EventReducer,
  ReducersForUserAction,
});

export default reducers;
