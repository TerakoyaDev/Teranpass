import * as React from 'react';
import {SignContext} from '../App';
import SignupPage from '../components/SignupPage';

interface IProps {
  history: {
    push: (path: string) => void
  }
}

export default class SignupPageContainer extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props)
  }

  public render() {
    return (
      <SignContext.Consumer>
        {({isSigned, toggleSigned})  => (
          <SignupPage toggleSigned={toggleSigned} history={this.props.history}/>
        )}
      </SignContext.Consumer>
    );
  }
}
