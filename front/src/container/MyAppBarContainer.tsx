import { connect } from 'react-redux';
import MyAppBar from '../components/MyAppBar';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    isSigned: store.getState().reducers.ReducersForUserAction.isSigned,
    userInfo: store.getState().reducers.ReducersForUserAction.userInfo,
  };
};

export default connect(mapStateToProps)(MyAppBar);
