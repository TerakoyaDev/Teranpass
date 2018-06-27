import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { createNewUser } from '../action/UserAction';
import store from '../store';
import { toBlobFromBase64 } from '../utils/toBlob.tsx';

interface InterfaceState {
  confirmPassword: string;
  confirmPasswordErrorMessage: string;
  photoFile: string;
  photoFileInstance: any;
  photoFileErrorMessage: string;
  userName: string;
  email: string;
  password: string;
  userNameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  sliderValue: number;
  modalOpen: boolean;
}

interface InterfaceProps {
  isProcessingForUser: boolean;
  message: string;
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

export default class SignupPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  public editor: any;
  constructor(props: InterfaceProps) {
    super(props);

    // state
    this.state = {
      confirmPassword: '',
      confirmPasswordErrorMessage: '',
      email: '',
      emailErrorMessage: '',
      modalOpen: false,
      password: '',
      passwordErrorMessage: '',
      photoFile: 'ユーザイメージ',
      photoFileErrorMessage: '',
      photoFileInstance: {},
      sliderValue: 50,
      userName: '',
      userNameErrorMessage: '',
    };

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.signup = this.signup.bind(this);
  }

  // signup
  public signup() {
    // validate
    if (this.state.userName === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      });
      return;
    }
    if (this.state.email === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: 'Email field is required',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.password === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: 'Password field is required',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }

    if (this.state.confirmPassword === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: 'Confirm password field is required',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }
    if (this.state.photoFile === '') {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: 'Email field is required',
        userNameErrorMessage: '',
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        ...this.state,
        confirmPasswordErrorMessage:
          'Password and confirm password is not equal',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        photoFileErrorMessage: '',
        userNameErrorMessage: '',
      });
      return;
    }

    const blob = toBlobFromBase64(
      this.editor.getImageScaledToCanvas().toDataURL()
    );
    const { dispatch } = this.props;
    dispatch(
      createNewUser(
        this.state.userName,
        this.state.email,
        this.state.password,
        blob,
        this.state.photoFile
      )
    );
  }

  // change method
  public onChangeUserName(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, userName: event.currentTarget.value });
  }

  public onChangeEmail(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, email: event.currentTarget.value });
  }

  public onChangePassword(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, password: event.currentTarget.value });
  }

  public onChangeConfirmPassword(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({
      ...this.state,
      confirmPassword: event.currentTarget.value,
    });
  }

  public onChangeFile(event: any) {
    this.setState({
      ...this.state,
      modalOpen: true,
      photoFile: event.target.value,
      photoFileInstance: event.target.files[0],
    });
  }

  public setEditorRef = (editor: any) => {
    if (editor) {
      this.editor = editor;
    }
  };

  public handleSliderChange = (event: any, value: any) => {
    this.setState({ sliderValue: value });
  };

  public handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  public handleDrop = (dropped: any) => {
    this.setState({ modalOpen: true, photoFileInstance: dropped[0] });
  };

  public render() {
    return (
      <div>
        {this.props.isProcessingForUser ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', flex: 'column' }}>
            <div>{store.getState().reducers.UserReducer.message}</div>
            <br />
            <Dropzone
              onDrop={this.handleDrop}
              style={{
                border: '1px solid black',
                borderRadius: `${(Math.min(100, 100) + 10) * 0.5}px`,
                height: '100px',
                marginLeft: `${window.innerWidth / 2 - 50}px`,
                width: '100px',
              }}
            >
              {!!this.editor && !this.state.modalOpen ? (
                <div>
                  <img
                    src={this.editor.getImageScaledToCanvas().toDataURL()}
                    style={{
                      border: '1px solid black',
                      borderRadius: `${(Math.min(100, 100) + 10) * 0.5}px`,
                      flex: 1,
                    }}
                  />
                  <br />
                </div>
              ) : (
                <div style={{ marginTop: '30px' }}>Please input image.</div>
              )}
            </Dropzone>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.modalOpen}
              onClose={this.handleModalClose}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  flex: 'column',
                  height: '250px',
                  left: '50%',
                  marginLeft: '-100px',
                  position: 'absolute',
                  textAlign: 'center',
                  top: '30%',
                  width: '200px',
                }}
              >
                <br />
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={this.state.photoFileInstance}
                  width={100}
                  height={100}
                  border={10}
                  color={[131, 132, 135, 0.6]} // RGBA
                  borderRadius={100}
                  scale={this.state.sliderValue / 50}
                  rotate={0}
                />
                <Typography id="label">Image scale</Typography>
                <Slider
                  value={this.state.sliderValue}
                  aria-labelledby="label"
                  onChange={this.handleSliderChange}
                  style={{ width: '40%', marginLeft: '30%' }}
                />
                <Button onClick={this.handleModalClose}>閉じる</Button>
              </div>
            </Modal>
            <TextField
              hintText="ユーザネーム"
              floatingLabelText="UserName"
              onChange={this.onChangeUserName}
              errorText={this.state.userNameErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="メールアドレス"
              floatingLabelText="Email"
              onChange={this.onChangeEmail}
              errorText={this.state.emailErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="パスワード"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChangePassword}
              errorText={this.state.passwordErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <TextField
              hintText="パスワード（確認）"
              floatingLabelText="Confirm password"
              type="password"
              onChange={this.onChangeConfirmPassword}
              errorText={this.state.confirmPasswordErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
            <br />
            <br />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.signup}
              style={{ width: '80%' }}
            >
              Signin
            </Button>
          </div>
        )}
      </div>
    );
  }
}
