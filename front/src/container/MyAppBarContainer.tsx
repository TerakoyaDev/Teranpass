import { connect } from 'react-redux';
import MyAppBar from '../components/MyAppBar';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    isAuth: store.getState().reducers.ReducersForUserAction.isAuth,
    userInfo: store.getState().reducers.ReducersForUserAction.userInfo,
  };
};

export default connect(mapStateToProps)(MyAppBar);
