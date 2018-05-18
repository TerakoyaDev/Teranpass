import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MyAppBar from './components/MyAppBar';
import SettingPage from './components/SettingPage';
import TopPage from './components/TopPage';
import UserPage from './components/UserPage';
import SigninPageContainer from './container/SigninPageContainer';
import SignupPageContainer from './container/SignupPageContainer';

export const SignContext = React.createContext({
  isSigned: false,
  toggleSigned: () => {},
  userInfo: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  }
});

interface IState {
  isSigned: boolean
  toggleSigned: () => void
  userInfo: {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
  }
}

// has isSignin
export default class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      isSigned : false,
      toggleSigned: this.toggleSigned.bind(this),
      userInfo: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: ''
      }
    }
  }

  public async componentDidMount() {
    const storage = await window.sessionStorage
    const filteredKeys = Object.keys(storage).filter((n: string) => JSON.parse(storage[n]).authDomain === "teranpass.firebaseapp.com")
    if (filteredKeys.length !== 0) {
      const filteredUser = JSON.parse(storage[filteredKeys[0]])
      if (filteredUser) {
        this.setState({
          ...this.state,
          isSigned: true,
          userInfo: {
            displayName: filteredUser.displayName,
            email: filteredUser.email,
            photoURL: filteredUser.photoURL,
            uid: filteredUser.uid,
          },
        })
      }
    }
  }

  // change isSigned
  public toggleSigned = () => {
    this.setState(state => ({
      isSigned:
        state.isSigned
        ? false
        : true,
    }));
  };

  public render() {
    return (
      <MuiThemeProvider>
        <SignContext.Provider value={this.state} >
          <Router>
            <div>
              <MyAppBar />
              <Route exact={true} path='/' component={TopPage} />
              <Route path='/signin' component={SigninPageContainer} />
              <Route path='/signup' component={SignupPageContainer} />
              <Route path='/user/:id' component={UserPage} />
              <Route path='/Setting' component={SettingPage} />
            </div>
          </Router>
        </SignContext.Provider>
      </MuiThemeProvider>
    );
  }
}
