import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT_DATE_LIST,
  UPDATE_EVENT,
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

export const updateEventAction = (
  id: string,
  title: string,
  date: string,
  location: string,
  body: string
) => {
  return {
    payload: {
      body,
      date,
      id,
      location,
      title,
    },
    type: UPDATE_EVENT,
  };
};

export const deleteEventAction = (eventId: string) => {
  return {
    payload: {
      eventId,
    },
    type: DELETE_EVENT,
  };
};
