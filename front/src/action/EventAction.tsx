import {
  DELETE_EVENT_SERVICE,
  FETCH_EVENT_DATE_LIST,
} from '../action/EventActionType';

export const fetchEventDateList = () => {
  return {
    type: FETCH_EVENT_DATE_LIST,
  };
};

export const deleteEventAction = () => {
  return {
    type: DELETE_EVENT_SERVICE,
  };
};
