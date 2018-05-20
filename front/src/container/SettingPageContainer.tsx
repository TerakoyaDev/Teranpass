import * as React from 'react';
import { SignContext } from '../App';
import SettingPage from '../components/SettingPage';

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
        {({ initApp }) => (
          <SettingPage initApp={initApp} history={this.props.history} />
        )}
      </SignContext.Consumer>
    );
  }
}
