import { connect } from 'react-redux';
import TopPage from '../components/TopPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    dateList: store.getState().reducers.EventReducer.dateList,
    eventList: store.getState().reducers.EventReducer.eventList,
    isAuth: store.getState().reducers.UserReducer.isAuth,
    isFetching: store.getState().reducers.EventReducer.isFetching,
  };
};

export default connect(mapStateToProps)(TopPage);
