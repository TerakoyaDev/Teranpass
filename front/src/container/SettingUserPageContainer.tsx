import { connect } from 'react-redux';
import SettingUserPage from '../components/SettingUserPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    isProcessingForUser: store.getState().reducers.UserReducer
      .isProcessingForUser,
  };
};

export default connect(mapStateToProps)(SettingUserPage);
