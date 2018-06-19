import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Routes from './components/Routes';
import store, { history } from './store';

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
