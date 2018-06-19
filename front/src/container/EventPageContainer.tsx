import { connect } from 'react-redux';
import EventPage from '../components/EventPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    eventList: store.getState().reducers.EventReducer.eventList,
    isFetching: store.getState().reducers.EventReducer.isFetching,
  };
};

export default connect(mapStateToProps)(EventPage);
