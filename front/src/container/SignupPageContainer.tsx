import { connect } from 'react-redux';
import SignupPage from '../components/SignupPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    isProcessingForUser: store.getState().reducers.UserReducer
      .isProcessingForUser,
    message: store.getState().reducers.UserReducer.message,
  };
};

export default connect(mapStateToProps)(SignupPage);
