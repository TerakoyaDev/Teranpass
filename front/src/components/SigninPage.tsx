import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import {firebaseAuth} from '../firebase'

interface InterfaceState{
  email: string,
  password: string,
  emailErrorMessage: string,
  passwordErrorMessage: string,
}

export default class SigninPage extends React.Component<{}, InterfaceState> {
  constructor (props: {}){
    super(props)

    // state
    this.state = {
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: ''
    }

    // bind
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.signin = this.signin.bind(this)
  }

  // signin
  public signin () {

    // validate
    if (this.state.email === "") {
      this.setState({
        ...this.state,
        emailErrorMessage: 'email field require',
        passwordErrorMessage: ''
      })
      return;
    }
    if (this.state.password === "") {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: 'password field require'
      })
      return;
    }

    // signin
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error: {code: string}) => {
        this.setState({
          ...this.state,
          emailErrorMessage: 'input email is not available',
          passwordErrorMessage: ''
        })
      })
  }


  // change method
  public onChangeEmail(event : React.FormEvent<HTMLSelectElement>) {
    this.setState({...this.state, email: event.currentTarget.value})
  }

  public onChangePassword(event : React.FormEvent<HTMLSelectElement>) {
    this.setState({...this.state, password: event.currentTarget.value})
  }

  public render() {
    return (
      <div style={{textAlign: 'center'}}>
        <TextField
          hintText="Email Field"
          floatingLabelText="Email"
          onChange={this.onChangeEmail}
          errorText={this.state.emailErrorMessage}
        />
        <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          onChange={this.onChangePassword}
          errorText={this.state.passwordErrorMessage}
        />
        <FlatButton
          label="Sign in"
          primary={true}
          onClick={this.signin}
          style={{width: '60%'}}
        />
      </div>
    );
  }
}
