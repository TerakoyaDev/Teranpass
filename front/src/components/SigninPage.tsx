import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { signinUser } from '../action/UserAction';

interface InterfaceState {
  email: string;
  password: string;
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

export default class SigninPage extends React.Component<
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
    };

    // bind
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.signin = this.signin.bind(this);
  }

  // signin
  public signin() {
    // validate
    if (this.state.email === '') {
      this.setState({
        ...this.state,
        emailErrorMessage: 'email field is required',
        passwordErrorMessage: '',
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: 'password field is required',
      });
      return;
    }

    const { dispatch } = this.props;
    dispatch(signinUser(this.state.email, this.state.password));
  }

  // change method
  public onChangeEmail(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, email: event.currentTarget.value });
  }

  public onChangePassword(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, password: event.currentTarget.value });
  }

  public render() {
    return (
      <div style={{ textAlign: 'center', flex: 'column' }}>
        <div>{this.props.message}</div>
        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
          errorText={this.state.emailErrorMessage}
        />
        <br />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          onChange={this.onChangePassword}
          errorText={this.state.passwordErrorMessage}
        />
        <br />
        <FlatButton
          label="Sign in"
          primary={true}
          onClick={this.signin}
          style={{ width: '60%' }}
        />
      </div>
    );
  }
}
