import { combineReducers } from 'redux';
import EventReducer from './EventReducer';
import UserReducer from './UserReducer';

const reducers = combineReducers({
  EventReducer,
  UserReducer,
});

export default reducers;
