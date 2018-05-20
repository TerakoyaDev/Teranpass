import * as React from 'react';
import { SignContext } from '../App';
import SigninPage from '../components/SigninPage';

interface IProps {
  history: {
    push: (path: string) => void;
  };
}

export default class SignupPageContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <SignContext.Consumer>
        {({ isSigned, toggleSigned }) => (
          <SigninPage
            toggleSigned={toggleSigned}
            history={this.props.history}
          />
        )}
      </SignContext.Consumer>
    );
  }
}
