import Avatar from '@material-ui/core/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { signoutUser, snackbarOpen } from '../action/UserAction';
import { IUserInfo } from '../types';

interface InterfaceProps {
  userInfo: IUserInfo;
  dispatch: any;
}

export default class Logged extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
    this.Signout = this.Signout.bind(this);
  }

  public Signout() {
    const { dispatch } = this.props;
    dispatch(signoutUser());
    dispatch(snackbarOpen());
  }

  public render() {
    const photoURL = this.props.userInfo.photoURL;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <Avatar src={photoURL} />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText={this.props.userInfo.displayName}
          containerElement={<Link to={`/users/${this.props.userInfo.uid}`} />}
        />
        <MenuItem
          primaryText="Setting"
          containerElement={<Link to="/setting" />}
        />
        <MenuItem onClick={this.Signout} primaryText="Sign out" />
      </IconMenu>
    );
  }
}
