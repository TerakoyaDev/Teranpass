import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import ContentForward from 'material-ui/svg-icons/content/forward';
import * as React from 'react';

export default class Signin extends React.Component {
  public render() {
    return (
      <IconButton
        tooltip="sign in"
        tooltipPosition="bottom-center"
      >
        <ContentForward
          color={white}
        />
      </IconButton>
    );
  }
}
