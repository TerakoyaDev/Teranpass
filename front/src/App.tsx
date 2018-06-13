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

interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface IUserInfo {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  joinEventList: IUser[];
  description: string;
}

interface IState {
  isAuth: boolean;
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
      userInfo: {
        description: '',
        displayName: '',
        email: '',
        joinEventList: [],
        photoURL: '',
        uid: '',
      },
    };
  }

  public async componentWillMount() {
    this.initApp();
  }

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
            description: filteredUser.description,
            displayName: filteredUser.displayName,
            email: filteredUser.email,
            joinEventList: filteredUser.joinEventList,
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
