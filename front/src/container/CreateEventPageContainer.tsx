import { connect } from 'react-redux';
import CreateEventPage from '../components/CreateEventPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    dateList: store.getState().reducers.EventReducer.dateList,
    eventList: store.getState().reducers.EventReducer.eventList,
    isFetching: store.getState().reducers.EventReducer.isFetching,
  };
};

export default connect(mapStateToProps)(CreateEventPage);
