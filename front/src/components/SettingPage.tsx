import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { updateUser } from '../action/UserAction';

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
      photoFile: '変更後のユーザイメージ',
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

    this.setState({ ...this.state, submitingMessage: '送信中' });

    const { dispatch } = this.props;
    dispatch(
      updateUser(
        this.state.userName,
        this.state.userDescription,
        this.state.photoFileInstance,
        this.state.photoFile
      )
    );
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
          hintText="変更後のユーザネーム"
          floatingLabelText="New UserName"
          onChange={this.onChangeUserName}
          errorText={this.state.userNameErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
        />
        <br />
        <TextField
          hintText="変更後のユーザ説明"
          floatingLabelText="New UserDescription"
          onChange={this.onChangeUserDescription}
          errorText={this.state.userDescriptionErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
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
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.update}
          style={{ width: '80%' }}
        >
          {this.state.submitingMessage}
        </Button>
      </div>
    );
  }
}
