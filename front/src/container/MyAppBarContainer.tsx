import { connect } from 'react-redux';
import MyAppBar from '../components/MyAppBar';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    isAuth: store.getState().reducers.UserReducer.isAuth,
    isOpenSnackbar: store.getState().reducers.UserReducer.isOpenSnackbar,
    userInfo: store.getState().reducers.UserReducer.userInfo,
  };
};

export default connect(mapStateToProps)(MyAppBar);
