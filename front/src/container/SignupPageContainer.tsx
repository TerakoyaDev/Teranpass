import * as React from 'react';
import {SignContext} from '../App';
import SignupPage from '../components/SignupPage';

export default class SignupPageContainer extends React.Component {

  public render() {
    return (
      <SignContext.Consumer>
        {({isSigned, toggleSigned})  => (
          <SignupPage toggleSigned={toggleSigned}/>
        )}
      </SignContext.Consumer>
    );
  }
}
