import * as React from 'react';
import {SignContext} from '../App';
import SigninPage from '../components/SigninPage';

export default class SignupPageContainer extends React.Component {

  public render() {
    return (
      <SignContext.Consumer>
        {({isSigned, toggleSigned})  => (
          <SigninPage toggleSigned={toggleSigned}/>
        )}
      </SignContext.Consumer>
    );
  }
}
