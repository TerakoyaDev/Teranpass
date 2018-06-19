import Snackbar from '@material-ui/core/Snackbar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  fetchUserInfoFromSessionStorage,
  snackbarClose,
} from '../action/UserAction';
import { IUserInfo } from '../types';
import Logged from './Logged';
import Signin from './Signin';
import Signup from './Signup';

interface IProps {
  isAuth: boolean;
  userInfo: IUserInfo;
  dispatch: any;
  isOpenSnackbar: boolean;
}

export default class MyAppBar extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public handleClose = () => {
    const { dispatch } = this.props;
    dispatch(snackbarClose());
  };

  public componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserInfoFromSessionStorage());
  }

  public render() {
    return (
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
            this.props.isAuth ? (
              <Logged
                userInfo={this.props.userInfo}
                dispatch={this.props.dispatch}
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
          open={this.props.isOpenSnackbar}
          autoHideDuration={2000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Sign out Success</span>}
        />
      </div>
    );
  }
}
