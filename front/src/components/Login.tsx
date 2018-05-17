import {white} from 'material-ui/styles/colors';
import ContentForward from 'material-ui/svg-icons/content/forward';
import * as React from 'react';

export default class Login extends React.Component {
  public static muiName = 'FlatButton';

  public render() {
    return (
      <ContentForward
        color={white}
      />
    );
  }
}
