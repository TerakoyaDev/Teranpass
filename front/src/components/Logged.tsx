import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {firebaseAuth} from '../firebase';

interface InterfaceProps {
  toggleSigned: () => void,
  userInfo: {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
  },
  openSnackbar: () => void
}

export default class Logged extends React.Component<InterfaceProps> {

  constructor(props: InterfaceProps) {
    super(props)
    this.Signout = this.Signout.bind(this)
  }

  public Signout() {
    firebaseAuth.signOut()
      .then(() => {
        this.props.toggleSigned()
        this.props.openSnackbar()
      })
  }

  public render () {
    const photoURL = this.props.userInfo.photoURL
    console.log(photoURL)
    return (
      <IconMenu
        iconButtonElement={
          photoURL ?
          <Avatar src={photoURL}/> :
          <Avatar>
            <Person />
          </Avatar>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText={this.props.userInfo.displayName} containerElement={<Link to="/" />}/>
        <MenuItem primaryText="Setting" containerElement={<Link to="/" />}/>
        <MenuItem onClick={this.Signout} primaryText="Sign out" />
      </IconMenu>
    )
  }
}
