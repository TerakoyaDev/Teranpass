import { connect } from 'react-redux';
import UserPage from '../components/UserPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    eventList: store.getState().reducers.EventReducer.eventList,
    isFetching: store.getState().reducers.EventReducer.isFetching,
    userInfo: store.getState().reducers.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(UserPage);
