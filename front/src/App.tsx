import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Routes from './components/Routes';
import store, { history } from './store';

// const history = createBrowserHistory();

export const SignContext = React.createContext({
  initApp: () => {},
  isAuth: false,
  toggleSigned: () => {},
  userInfo: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
});

export interface IUserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface IState {
  isAuth: boolean;
  toggleSigned: () => void;
  initApp: () => void;
  userInfo: IUserInfo;
}

// has isAuth
export default class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      initApp: this.initApp.bind(this),
      isAuth: false,
      toggleSigned: this.toggleSigned.bind(this),
      userInfo: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
      },
    };
  }

  public async componentWillMount() {
    const storage = await window.sessionStorage;
    const filteredKeys = Object.keys(storage).filter(
      (n: string) =>
        JSON.parse(storage[n]).authDomain === 'teranpass.firebaseapp.com'
    );
    if (filteredKeys.length !== 0) {
      const filteredUser = JSON.parse(storage[filteredKeys[0]]);
      if (filteredUser) {
        this.setState({
          ...this.state,
          isAuth: true,
          userInfo: {
            displayName: filteredUser.displayName,
            email: filteredUser.email,
            photoURL: filteredUser.photoURL,
            uid: filteredUser.uid,
          },
        });
      }
    }
  }

  // change isAuth
  public toggleSigned = () => {
    this.setState(state => ({
      isAuth: state.isAuth ? false : true,
    }));
    this.initApp();
  };

  public initApp = async () => {
    const storage = await window.sessionStorage;
    const filteredKeys = Object.keys(storage).filter(
      (n: string) =>
        JSON.parse(storage[n]).authDomain === 'teranpass.firebaseapp.com'
    );
    if (filteredKeys.length !== 0) {
      const filteredUser = JSON.parse(storage[filteredKeys[0]]);
      if (filteredUser) {
        this.setState({
          ...this.state,
          isAuth: true,
          userInfo: {
            displayName: filteredUser.displayName,
            email: filteredUser.email,
            photoURL: filteredUser.photoURL,
            uid: filteredUser.uid,
          },
        });
      }
    }
  };

  public render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history}>
            <Routes history={history} />
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
