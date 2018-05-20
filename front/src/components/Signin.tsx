import IconButton from 'material-ui/IconButton';
import { white } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Signin extends React.Component {
  public render() {
    return (
      <IconButton
        color={white}
        tooltip="sign in"
        tooltipPosition="bottom-center"
        containerElement={<Link to="/signin" />}
      >
        <SvgIcon color={white}>
          <path d="M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z" />
        </SvgIcon>
      </IconButton>
    );
  }
}
