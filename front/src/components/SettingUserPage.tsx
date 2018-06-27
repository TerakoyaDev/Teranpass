import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Slider from '@material-ui/lab/Slider';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { updateUser } from '../action/UserAction';
import { toBlobFromBase64 } from '../utils/toBlob.tsx';

interface InterfaceState {
  userName: string;
  photoFile: string;
  photoFileInstance: any;
  submitingMessage: string;
  sliderValue: number;
  userNameErrorMessage: string;
  photoFileErrorMessage: string;
  modalOpen: boolean;
}

interface IProps {
  isProcessingForUser: boolean;
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

export default class SettingUserPage extends React.Component<
  IProps,
  InterfaceState
> {
  public editor: any;
  constructor(props: IProps) {
    super(props);

    // state
    this.state = {
      modalOpen: false,
      photoFile: '変更後のユーザイメージ',
      photoFileErrorMessage: '',
      photoFileInstance: {},
      sliderValue: 50,
      submitingMessage: 'Update',
      userName: '',
      userNameErrorMessage: '',
    };

    // bind
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.update = this.update.bind(this);
  }

  public async update() {
    // validate
    if (this.state.userName === '') {
      this.setState({
        ...this.state,
        photoFileErrorMessage: '',
        userNameErrorMessage: 'UserName field is required',
      });
      return;
    }
    if (this.state.photoFile === '') {
      this.setState({
        ...this.state,
        photoFileErrorMessage: 'email field is required',
        userNameErrorMessage: '',
      });
      return;
    }

    this.setState({ ...this.state, submitingMessage: '送信中' });

    const blob = toBlobFromBase64(
      this.editor.getImageScaledToCanvas().toDataURL()
    );
    const { dispatch } = this.props;
    dispatch(updateUser(this.state.userName, blob, this.state.photoFile));
  }

  // change method
  public onChangeUserName(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, userName: event.currentTarget.value });
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

  public render() {
    return (
      <div>
        {this.props.isProcessingForUser ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
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
                  style={{ flex: 1 }}
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
              hintText="変更後のユーザネーム"
              floatingLabelText="New UserName"
              onChange={this.onChangeUserName}
              errorText={this.state.userNameErrorMessage}
              style={{ textAlign: 'left', width: '80%' }}
            />
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
        )}
      </div>
    );
  }
}
