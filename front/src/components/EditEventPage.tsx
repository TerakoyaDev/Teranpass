import Button from '@material-ui/core/Button';
import TextFieldCore from '@material-ui/core/TextField';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { updateEventAction } from '../action/EventAction';
import { IEvent } from '../types';
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
  eventList: IEvent[];
  match: {
    params: {
      id: string;
    };
  };
  dispatch: any;
}

export default class EditEventPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);
    const event = this.props.eventList.find(
      n => n.eventId === this.props.match.params.id
    );

    // init state
    if (event) {
      this.state = {
        body: event.body,
        bodyErrorMessage: '',
        date: event.date,
        dateErrorMessage: '',
        location: event.location,
        locationErrorMessage: '',
        title: event.title,
        titleErrorMessage: '',
      };
    } else {
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
    }

    // bind
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.update = this.update.bind(this);
  }

  public async update() {
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

    // dispatch
    const { title, date, location, body } = this.state;
    const { dispatch } = this.props;
    dispatch(
      updateEventAction(this.props.match.params.id, title, date, location, body)
    );
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

  public render() {
    return (
      <div style={{ textAlign: 'center', flex: 'column' }}>
        <br />
        <form noValidate={true}>
          <TextFieldCore
            id="datetime-local"
            label="Date"
            type="datetime-local"
            defaultValue={changeDateISOFormat(new Date(this.state.date))}
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
          defaultValue={this.state.title}
          errorText={this.state.titleErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
        />
        <br />
        <TextField
          hintText="開催場所"
          floatingLabelText="Location"
          onChange={this.onChangeLocation}
          defaultValue={this.state.location}
          errorText={this.state.locationErrorMessage}
          style={{ textAlign: 'left', width: '80%' }}
        />
        <br />
        <TextField
          style={{ textAlign: 'left', width: '80%' }}
          hintText="説明文"
          floatingLabelText="Body"
          onChange={this.onChangeBody}
          errorText={this.state.bodyErrorMessage}
          multiLine={true}
          defaultValue={this.state.body}
          rows={10}
          rowsMax={10}
        />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.update}
          style={{ width: '80%' }}
        >
          Create
        </Button>
      </div>
    );
  }
}
