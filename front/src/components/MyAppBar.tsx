import Snackbar from '@material-ui/core/Snackbar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { SignContext } from '../App';
import Logged from './Logged';
import Signin from './Signin';
import Signup from './Signup';

interface InterfaceState {
  open: boolean;
}

export default class MyAppBar extends React.Component<{}, InterfaceState> {
  constructor(props: {}) {
    super(props);
    this.state = { open: false };

    this.openSnackbar = this.openSnackbar.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  public openSnackbar() {
    this.setState({ open: true });
  }

  public handleClose = () => {
    this.setState({ open: false });
  };
  public render() {
    return (
      <div>
        <SignContext.Consumer>
          {({ isSigned, toggleSigned, userInfo }) => (
            <div>
              <AppBar
                title="Teranpass"
                iconElementLeft={
                  <IconButton
                    containerElement={<Link to="/" />}
                    style={{ color: 'white' }}
                  >
                    <ActionHome />
                  </IconButton>
                }
                iconElementRight={
                  isSigned ? (
                    <Logged
                      toggleSigned={toggleSigned}
                      userInfo={userInfo}
                      openSnackbar={this.openSnackbar}
                    />
                  ) : (
                    <div>
                      <Signup />
                      <Signin />
                    </div>
                  )
                }
              />
              <Snackbar
                anchorOrigin={{
                  horizontal: 'left',
                  vertical: 'bottom',
                }}
                open={this.state.open}
                autoHideDuration={2000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Sign out Success</span>}
              />
            </div>
          )}
        </SignContext.Consumer>
      </div>
    );
  }
}
