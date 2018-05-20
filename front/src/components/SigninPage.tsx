import * as firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { firebaseAuth } from '../firebase';
import { firebaseDb } from '../firebase';

interface InterfaceState {
  email: string;
  password: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

interface InterfaceProps {
  toggleSigned: (() => void);
  history: {
    push: (path: string) => void;
  };
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

    // signin
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebaseAuth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async () => {
        const user = firebaseAuth.currentUser;
        if (user) {
          await firebaseDb.ref(`users/${user.uid}`).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        }

        this.props.toggleSigned();

        this.props.history.push('/');
      })
      .catch((error: { message: string }) => {
        this.setState({
          ...this.state,
          emailErrorMessage: error.message,
          passwordErrorMessage: '',
        });
      });
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
