import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import './App.css';
import MyAppBar from './components/MyAppBar';
import SigninPage from './components/SignupPage';

class App extends React.Component {
  public render() {
    // Render the Calendar
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return (
      <MuiThemeProvider>
        <div>
          <MyAppBar />
          <InfiniteCalendar
            width={600}
            hight={400}
            selected={today}
            disabledDays={[0,6]}
            minDate={lastWeek}
          />
          <SigninPage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
