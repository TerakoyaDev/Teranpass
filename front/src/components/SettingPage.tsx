import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import {firebaseAuth,firebaseDb, firebaseStorage} from '../firebase';

interface InterfaceState{
  userName: string,
  photoFile: string,
  photoFileInstance: {},
  userNameErrorMessage: string,
  photoFileErrorMessage: string,
}

export default class UserPage extends React.Component<{}, InterfaceState> {
  constructor (props: {}){
    super(props)

    // state
    this.state = {
      photoFile: 'New image',
      photoFileErrorMessage: '',
      photoFileInstance: {},
      userName: '',
      userNameErrorMessage: '',
    }

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.update = this.update.bind(this)
  }

  public async update () {

    // validate
    if (this.state.userName === "") {
      this.setState({
        ...this.state,
        photoFileErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      })
      return;
    }
    if (this.state.photoFile === "") {
      this.setState({
        ...this.state,
        photoFileErrorMessage: 'email field is required',
        userNameErrorMessage: '',
      })
      return;
    }

    const user = firebaseAuth.currentUser
    if (user) {
      // update image
      const imageRef = firebaseStorage.ref().child(this.state.photoFile)
      await imageRef.put(this.state.photoFileInstance)
      const downloadLink = await imageRef.getDownloadURL()
      await user.updateProfile({
        displayName: this.state.userName,
        photoURL: downloadLink
      })
      await firebaseDb.ref(`users/${user.uid}`).set({
        displayName: this.state.userName,
        email: user.email,
        photoURL: downloadLink,
        uid: user.uid,
      })

      // redirect.... oh my god
      location.href='/'
    }
  }

  // change method
  public onChangeUserName(event : React.FormEvent<HTMLSelectElement>) {
    this.setState({...this.state, userName: event.currentTarget.value})
  }

  public onChangeFile(event: any) {
    this.setState({...this.state, photoFile: event.target.value, photoFileInstance: event.target.files[0]})
  }

  public render() {
    return (
      <div style={{textAlign: 'center'}}>
        <TextField
          hintText="New UserName Field"
          floatingLabelText="New UserName"
          onChange={this.onChangeUserName}
          errorText={this.state.userNameErrorMessage}
        />
        <br />
        <div>
          {this.state.photoFile}
          <input type="file" style={{display: 'none'}} id="icon-button-file" onChange={this.onChangeFile}/>
          <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <FlatButton
          label="Update"
          primary={true}
          onClick={this.update}
          style={{width: '60%'}}
        />
      </div>
    );
  }
}


