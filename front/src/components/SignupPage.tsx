import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { createNewUser } from '../action/UserAction';
import store from '../store';

interface InterfaceState {
  confirmPassword: string;
  confirmPasswordErrorMessage: string;
  photoFile: string;
  photoFileInstance: {};
  photoFileErrorMessage: string;
  userName: string;
  email: string;
  password: string;
  userNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

interface InterfaceProps {
  isProcessingForUser: boolean;
  message: string;
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

export default class SignupPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);

    // state
    this.state = {
      confirmPassword: '',
      confirmPasswordErrorMessage: '',
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      photoFile: '変更後のユーザイメージ',
      photoFileErrorMessage: '',
      photoFileInstance: {},
      userName: '',
      userNameErrorMessage: '',
    };

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.signup = this.signup.bind(this);
  }

  // signup
  public signup() {
    // validate
    if (this.state.userName === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      });
      return;
    }
    if (this.state.email === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: 'Email field is required',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: 'Password field is required',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }

    if (this.state.confirmPassword === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: 'Confirm password field is required',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.photoFile === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: 'Email field is required',
        userNameErrorMessage: '',
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage:
          'Password and confirm password is not equal',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }

    // dispatch
    const { dispatch } = this.props;
    dispatch(
      createNewUser(
        this.state.userName,
        this.state.email,
        this.state.password,
        this.state.photoFileInstance,
        this.state.photoFile
      )
    );
  }

  // change method
  public onChangeUserName(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, userName: event.currentTarget.value });
  }

  public onChangeEmail(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, email: event.currentTarget.value });
  }

  public onChangePassword(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, password: event.currentTarget.value });
  }

  public onChangeConfirmPassword(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({
      ...this.state,
      confirmPassword: event.currentTarget.value,
    });
  }

  public onChangeFile(event: any) {
    this.setState({
      ...this.state,
      photoFile: event.target.value,
      photoFileInstance: event.target.files[0],
    });
  }

  public render() {
    return (
      <div>
        {this.props.isProcessingForUser ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', flex: 'column' }}>
            <div>{store.getState().reducers.UserReducer.message}</div>
            <TextField
              hintText="ユーザネーム"
              floatingLabelText="UserName"
              onChange={this.onChangeUserName}
              errorText={this.state.userNameErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="メールアドレス"
              floatingLabelText="Email"
              onChange={this.onChangeEmail}
              errorText={this.state.emailErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="パスワード"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChangePassword}
              errorText={this.state.passwordErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="パスワード（確認）"
              floatingLabelText="Confirm password"
              type="password"
              onChange={this.onChangeConfirmPassword}
              errorText={this.state.confirmPasswordErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <div>
              {this.state.photoFile}
              <input
                type="file"
                style={{ display: 'none' }}
                id="icon-button-file"
                onChange={this.onChangeFile}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.signup}
              style={{ width: '80%' }}
            >
              Signin
            </Button>
          </div>
        )}
      </div>
    );
  }
}
