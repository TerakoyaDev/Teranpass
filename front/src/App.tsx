import createBrowserHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import {Router} from 'react-router';
import Routes from './components/Routes';

const history = createBrowserHistory()

export const SignContext = React.createContext({
  initApp: () => {},
  isSigned: false,
  toggleSigned: () => {},
  userInfo: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  }
});

export interface IUserInfo {
  displayName: string,
  email: string,
  photoURL: string,
  uid: string,
}

interface IState {
  isSigned: boolean
  toggleSigned: () => void
  initApp: () => void
  userInfo: IUserInfo
}

// has isSignin
export default class App extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      initApp: this.initApp.bind(this),
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
    this.initApp()
  };

  public initApp = async () => {
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

  public render() {
    return (
      <MuiThemeProvider>
        <SignContext.Provider value={this.state} >
          <Router history={history}>
            <Routes history={history}/>
          </Router>
        </SignContext.Provider>
      </MuiThemeProvider>
    );
  }
}
