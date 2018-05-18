import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import MyAppBar from './components/MyAppBar';
import SigninPage from './components/SigninPage';
import SignupPage from './components/SignupPage';
import TopPage from './components/TopPage';

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider>
          <Router>
            <div>
              <MyAppBar />
              <Route exact={true} path='/' component={TopPage} />
              <Route path='/signin' component={SigninPage} />
              <Route path='/signup' component={SignupPage} />
            </div>
          </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
