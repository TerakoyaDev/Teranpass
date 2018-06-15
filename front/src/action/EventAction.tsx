import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT_DATE_LIST,
} from '../action/EventActionType';

export const fetchEventDateList = () => {
  return {
    type: FETCH_EVENT_DATE_LIST,
  };
};

export const createEventAction = (
  title: string,
  date: string,
  location: string,
  body: string
) => {
  return {
    payload: {
      body,
      date,
      location,
      title,
    },
    type: CREATE_EVENT,
  };
};

export const deleteEventAction = () => {
  return {
    type: DELETE_EVENT,
  };
};
