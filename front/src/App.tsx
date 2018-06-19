import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Routes from './components/Routes';
import store, { history } from './store';

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

export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }

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
