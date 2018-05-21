// import * as React from 'react';
import { connect } from 'react-redux';
import SignupPage from '../components/SignupPage';

interface ISignupPageState {
  message: string;
}

const mapStateToProps = (state: ISignupPageState) => {
  return { message: state.message };
};

export default connect(mapStateToProps)(SignupPage);
