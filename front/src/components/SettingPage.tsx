import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { fetchUserInfoFromSessionStorage } from '../action/UserAction';
import { firebaseAuth, firebaseDb, firebaseStorage } from '../firebase';

interface InterfaceState {
  userName: string;
  photoFile: string;
  photoFileInstance: {};
  submitingMessage: string;
  userNameErrorMessage: string;
  photoFileErrorMessage: string;
  userDescription: string;
  userDescriptionErrorMessage: string;
}

interface IProps {
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

export default class UserPage extends React.Component<IProps, InterfaceState> {
  constructor(props: IProps) {
    super(props);

    // state
    this.state = {
      photoFile: 'New image',
      photoFileErrorMessage: '',
      photoFileInstance: {},
      submitingMessage: 'Update',
      userDescription: '',
      userDescriptionErrorMessage: '',
      userName: '',
      userNameErrorMessage: '',
    };

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserDescription = this.onChangeUserDescription.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.update = this.update.bind(this);
  }

  public async update() {
    // validate
    if (this.state.userName === '') {
      this.setState({
        ...this.state,
        photoFileErrorMessage: '',
        userDescriptionErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      });
      return;
    }
    if (this.state.userDescription === '') {
      this.setState({
        ...this.state,
        photoFileErrorMessage: '',
        userDescriptionErrorMessage: 'UserDescription field is required',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.photoFile === '') {
      this.setState({
        ...this.state,
        photoFileErrorMessage: 'email field is required',
        userDescriptionErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }

    const user = firebaseAuth.currentUser;
    if (user) {
      this.setState({ ...this.state, submitingMessage: 'Now submiting' });
      // update image
      const imageRef = firebaseStorage
        .ref()
        .child(`${user.uid}/${this.state.photoFile}`);
      await imageRef.put(this.state.photoFileInstance);
      const downloadLink = await imageRef.getDownloadURL();

      // update
      await user.updateProfile({
        displayName: this.state.userName,
        photoURL: downloadLink,
      });

      const joinEventList = (await firebaseDb
        .ref(`users/${user.uid}/joinEventList`)
        .once('value')).val();

      // set
      await firebaseDb.ref(`users/${user.uid}`).set({
        description: this.state.userDescription,
        displayName: this.state.userName,
        email: user.email,
        joinEventList,
        photoURL: downloadLink,
        uid: user.uid,
      });

      const { dispatch } = this.props;
      dispatch(fetchUserInfoFromSessionStorage());
      this.props.history.push('/');
    }
  }

  // change method
  public onChangeUserName(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, userName: event.currentTarget.value });
  }

  public onChangeUserDescription(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({
      ...this.state,
      userDescription: event.currentTarget.value,
    });
  }

  public onChangeFile(event: any) {
    this.setState({
      ...this.state,
      photoFile: event.target.value,
      photoFileInstance: event.target.files[0],
    });
  }

  public render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <TextField
          hintText="New UserName Field"
          floatingLabelText="New UserName"
          onChange={this.onChangeUserName}
          errorText={this.state.userNameErrorMessage}
        />
        <br />
        <TextField
          hintText="New UserDescription Field"
          floatingLabelText="New UserDescription"
          onChange={this.onChangeUserDescription}
          errorText={this.state.userDescriptionErrorMessage}
        />
        <br />
        <div>
          {this.state.photoFile}
          <input
            type="file"
            style={{ display: 'none' }}
            id="icon-button-file"
            onChange={this.onChangeFile}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <FlatButton
          label={this.state.submitingMessage}
          primary={true}
          onClick={this.update}
          style={{ width: '60%' }}
        />
      </div>
    );
  }
}
