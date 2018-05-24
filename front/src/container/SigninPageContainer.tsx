import { connect } from 'react-redux';
import SigninPage from '../components/SigninPage';
import store from '../store';

const mapStateToProps = (state: any) => {
  return {
    message: store.getState().reducers.UserReducer.message,
  };
};

export default connect(mapStateToProps)(SigninPage);
