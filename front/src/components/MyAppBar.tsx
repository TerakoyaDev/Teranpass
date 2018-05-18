import AppBar from 'material-ui/AppBar';
// import LoggedIcon from './LoggedIcon';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';

export default class MyAppBar extends React.Component {
  public render() {
    return (
      <div>
        <AppBar
          title="Teranpass"
          iconElementLeft={<IconButton
            containerElement={<Link to="/" />}
            style={{ color: 'white' }}
          ><ActionHome /></IconButton>}
          iconElementRight={<div><Signup /><Signin /></div>}
        />
      </div>
    )
  }
}
