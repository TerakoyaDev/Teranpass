import * as firebase from 'firebase';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import {firebaseAuth} from '../firebase'
import {firebaseDb} from '../firebase'

interface InterfaceState{
  userName: string,
  email: string,
  password: string,
  userNameErrorMessage: string,
  emailErrorMessage: string,
  passwordErrorMessage: string,
}

interface InterfaceProps {
  toggleSigned: () => void
}

export default class SignupPage extends React.Component<InterfaceProps, InterfaceState> {
  constructor (props: InterfaceProps){
    super(props)

    // state
    this.state = {
      email: '',
      emailErrorMessage: '',
      password: '',
      passwordErrorMessage: '',
      userName: '',
      userNameErrorMessage: '',
    }

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.signup = this.signup.bind(this)
  }

  // signup
  public signup () {

    // validate
    if (this.state.userName === "") {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      })
      return;
    }
    if (this.state.email === "") {
      this.setState({
        ...this.state,
        emailErrorMessage: 'email field is required',
        passwordErrorMessage: '',
        userNameErrorMessage: '',
      })
      return;
    }
    if (this.state.password === "") {
      this.setState({
        ...this.state,
        emailErrorMessage: '',
        passwordErrorMessage: 'password field is required',
        userNameErrorMessage: '',
      })
      return;
    }

    // create account
    firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(async () => {
        const user = firebaseAuth.currentUser
        if (user) {
          await user.updateProfile({
            displayName: this.state.userName,
            photoURL: 'default'
          })
          await firebaseDb.ref(`users/${user.uid}`).set({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        }

        // toggle isSigned state
        this.props.toggleSigned()

        // redirect.... oh my god
        location.href='/'
      })
      .catch((error: {code: string, message: string}) => {
        this.setState({
          ...this.state,
          emailErrorMessage: error.message,
          passwordErrorMessage: ''
        })
      })
  }


  // change method
  public onChangeUserName(event : React.FormEvent<HTMLSelectElement>) {
    this.setState({...this.state, userName: event.currentTarget.value})
  }

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
          hintText="UserName Field"
          floatingLabelText="UserName"
          onChange={this.onChangeUserName}
          errorText={this.state.userNameErrorMessage}
        />
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
          label="Sign up"
          primary={true}
          onClick={this.signup}
          style={{width: '60%'}}
        />
      </div>
    );
  }
}
