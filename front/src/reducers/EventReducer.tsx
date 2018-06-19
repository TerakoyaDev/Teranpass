import {
  FETCH_EVENT_DATE_LIST,
  FETCH_EVENT_DATE_LIST_FAILED,
  FETCH_EVENT_DATE_LIST_SUCCESS,
} from '../action/EventActionType';

const initialState = {
  dateList: [],
  eventList: [],
  isFetching: false,
};

const eventReducer = (
  state: any = {
    ...initialState,
  },
  action: any
): any => {
  switch (action.type) {
    case FETCH_EVENT_DATE_LIST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_EVENT_DATE_LIST_SUCCESS:
      return {
        ...state,
        dateList: action.dateList,
        eventList: action.eventList,
        isFetching: false,
      };
    case FETCH_EVENT_DATE_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default eventReducer;
