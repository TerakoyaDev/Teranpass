import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import * as React from 'react';
import Signin from './Signin';
// import LoggedIcon from './LoggedIcon';


export default class MyAppBar extends React.Component {
  public render() {
    return (
      <div>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={<Signin />}
        />
      </div>
    )
  }
}
