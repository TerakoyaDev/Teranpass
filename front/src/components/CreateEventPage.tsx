import Button from '@material-ui/core/Button';
import TextFieldCore from '@material-ui/core/TextField';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { createEventAction } from '../action/EventAction';
import { changeDateFormat, changeDateISOFormat } from '../utils/DateFormat';

interface InterfaceState {
  title: string;
  titleErrorMessage: string;
  date: string;
  dateErrorMessage: string;
  location: string;
  locationErrorMessage: string;
  body: string;
  bodyErrorMessage: string;
}

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

// TODO get userInfo by id
export default class CreateEventPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);

    // state
    this.state = {
      body: '',
      bodyErrorMessage: '',
      date: changeDateFormat(new Date()),
      dateErrorMessage: '',
      location: '',
      locationErrorMessage: '',
      title: '',
      titleErrorMessage: '',
    };

    // bind
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.create = this.create.bind(this);
  }

  // create
  public async create() {
    this.setState({
      ...this.state,
      bodyErrorMessage: '',
      dateErrorMessage: '',
      locationErrorMessage: '',
      titleErrorMessage: '',
    });

    // validate
    if (this.state.title === '') {
      this.setState({
        ...this.state,
        titleErrorMessage: 'Title field is required',
      });
      return;
    }
    if (this.state.date === '') {
      this.setState({
        ...this.state,
        dateErrorMessage: 'Body field is required',
      });
      return;
    }
    if (this.state.location === '') {
      this.setState({
        ...this.state,
        locationErrorMessage: 'Location field is required',
      });
      return;
    }
    if (this.state.body === '') {
      this.setState({
        ...this.state,
        bodyErrorMessage: 'Body field is required',
      });
      return;
    }

    const { title, date, location, body } = this.state;
    const { dispatch } = this.props;
    dispatch(createEventAction(title, date, location, body));
  }

  // change method
  public onChangeBody(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, body: event.currentTarget.value });
  }

  public onChangeDate(event: any) {
    this.setState({
      ...this.state,
      date: changeDateFormat(event.currentTarget.value),
    });
  }

  public onChangeLocation(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, location: event.currentTarget.value });
  }

  public onChangeTitle(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, title: event.currentTarget.value });
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div style={{ textAlign: 'center', flex: 'column' }}>
        <br />
        <form noValidate={true}>
          <TextFieldCore
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue={changeDateISOFormat(new Date())}
            style={{ width: '80%' }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChangeDate}
          />
        </form>
        <br />
        <TextField
          hintText="タイトル"
          floatingLabelText="Title"
          onChange={this.onChangeTitle}
          errorText={this.state.titleErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
        />
        <br />
        <TextField
          hintText="開催場所"
          floatingLabelText="Location"
          onChange={this.onChangeLocation}
          errorText={this.state.locationErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
        />
        <br />
        <TextField
          style={{ textAlign: 'left', width: '80%' }}
          hintText="説明文．マークダウン形式で書けます．改行二つで改行扱いなので注意！！"
          floatingLabelText="Body"
          onChange={this.onChangeBody}
          errorText={this.state.bodyErrorMessage}
          multiLine={true}
          rows={10}
          rowsMax={10}
        />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.create}
          style={{ width: '80%' }}
        >
          Create
        </Button>
      </div>
    );
  }
}
