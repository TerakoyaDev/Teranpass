import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import IconButton from 'material-ui/IconButton';
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
            photoURL !== 'default' ?
            <IconButton>
              <Avatar src={photoURL}/>
            </IconButton> :
            <IconButton>
              <Avatar>
                <Person />
              </Avatar>
            </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText={this.props.userInfo.displayName} containerElement={<Link to={`/users/${this.props.userInfo.uid}`} />}/>
        <MenuItem primaryText="Setting" containerElement={<Link to="/setting" />}/>
        <MenuItem onClick={this.Signout} primaryText="Sign out" />
      </IconMenu>
    )
  }
}
