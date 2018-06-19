import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { createNewUser } from '../action/UserAction';
import store from '../store';

interface InterfaceState {
  userName: string;
  email: string;
  password: string;
  userNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

interface InterfaceProps {
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
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      userName: '',
      userNameErrorMessage: '',
    };

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signup = this.signup.bind(this);
  }

  // signup
  public signup() {
    // validate
    if (this.state.userName === '') {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      });
      return;
    }
    if (this.state.email === '') {
      this.setState({
        ...this.state,
        emailErrorMessage: 'Email field is required',
        passwordErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: 'Password field is required',
        userNameErrorMessage: '',
      });
      return;
    }

    const { dispatch } = this.props;
    dispatch(
      createNewUser(this.state.userName, this.state.email, this.state.password)
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

  public render() {
    return (
      <div style={{ textAlign: 'center', flex: 'column' }}>
        <div>{store.getState().reducers.UserReducer.message}</div>
        <TextField
          hintText="ユーザネーム"
          floatingLabelText="UserName"
          onChange={this.onChangeUserName}
          errorText={this.state.userNameErrorMessage}
        />
        <br />
        <TextField
          hintText="メールアドレス"
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
          errorText={this.state.emailErrorMessage}
        />
        <br />
        <TextField
          hintText="パスワード"
          floatingLabelText="Password"
          type="password"
          onChange={this.onChangePassword}
          errorText={this.state.passwordErrorMessage}
        />
        <br />
        <FlatButton
          label="Sign up"
          primary={true}
          onClick={this.signup}
          style={{ width: '20%' }}
        />
      </div>
    );
  }
}
