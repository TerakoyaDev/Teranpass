import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from 'material-ui/IconButton';
import { white } from 'material-ui/styles/colors';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  fetchUserInfoFromSessionStorage,
  snackbarClose,
} from '../action/UserAction';
import { IUserInfo } from '../types';
import SigninButton from './SigninButton';
import SignupButton from './SignupButton';
import UserIcon from './UserIcon';

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
      <div style={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="secondary"
          style={{ backgroundColor: '#4286f4' }}
        >
          <Toolbar>
            <IconButton containerElement={<Link to="/" />}>
              <SvgIcon color={white}>
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
              </SvgIcon>
            </IconButton>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Teranpass
            </Typography>
            {this.props.isAuth ? (
              <UserIcon
                userInfo={this.props.userInfo}
                dispatch={this.props.dispatch}
              />
            ) : (
              <div>
                <SignupButton />
                <SigninButton />
              </div>
            )}
          </Toolbar>
        </AppBar>
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
