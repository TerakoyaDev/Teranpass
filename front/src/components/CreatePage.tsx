import TextFieldCore from '@material-ui/core/TextField';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { firebaseAuth, firebaseDb } from '../firebase';

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
  toggleSigned: (() => void);
  history: {
    push: (path: string) => void;
  };
}

// TODO get userInfo by id
export default class UserPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);

    // state
    this.state = {
      body: '',
      bodyErrorMessage: '',
      date: '',
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
        titleErrorMessage: 'title field is required',
      });
      return;
    }
    if (this.state.date === '') {
      this.setState({
        ...this.state,
        dateErrorMessage: 'body field is required',
      });
      return;
    }
    if (this.state.location === '') {
      this.setState({
        ...this.state,
        locationErrorMessage: 'location field is required',
      });
      return;
    }
    if (this.state.body === '') {
      this.setState({
        ...this.state,
        bodyErrorMessage: 'body field is required',
      });
      return;
    }

    const user = firebaseAuth.currentUser;
    if (user) {
      // get events list
      const val = (await firebaseDb
        .ref(`userHasEvents/${user.uid}`)
        .once('value')).val();

      // assign eventsList
      let eventsList = [];
      if (val) {
        eventsList = val;
      }

      // get key
      const newPostKey = await firebaseDb
        .ref(`events/${this.state.date.split(' ')[0]}`)
        .push().key;

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      // postEventData
      const postEventData = {
        body: this.state.body,
        date: this.state.date,
        eventId: newPostKey,
        location: this.state.location,
        participants: [userInfo],
        sponsor: userInfo,
        title: this.state.title,
      };
      eventsList.push(postEventData);

      // update
      const updates = {};
      updates[
        `events/${this.state.date.split(' ')[0]}/${newPostKey}`
      ] = postEventData;
      updates[`userHasEvents/${user.uid}`] = eventsList;

      await firebaseDb.ref().update(updates);

      this.props.history.push('/');
    }
  }

  // change method
  public onChangeBody(event: React.FormEvent<HTMLSelectElement>) {
    this.setState({ ...this.state, body: event.currentTarget.value });
  }

  public onChangeDate(event: any) {
    const date = new Date(event.currentTarget.value);
    this.setState({
      ...this.state,
      date: `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
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
            label="Next appointment"
            type="datetime-local"
            defaultValue={new Date().toISOString().split('.')[0]}
            style={{ width: '200' }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.onChangeDate}
          />
        </form>
        <br />
        <TextField
          hintText="Title Field"
          floatingLabelText="Title"
          onChange={this.onChangeTitle}
          errorText={this.state.titleErrorMessage}
        />
        <br />
        <TextField
          hintText="Location Field"
          floatingLabelText="Location"
          onChange={this.onChangeLocation}
          errorText={this.state.locationErrorMessage}
        />
        <br />
        <TextField
          style={{ textAlign: 'left' }}
          hintText="Body Field"
          floatingLabelText="Body"
          onChange={this.onChangeBody}
          errorText={this.state.bodyErrorMessage}
          multiLine={true}
          rows={10}
          rowsMax={10}
        />
        <br />
        <FlatButton
          label="create"
          primary={true}
          onClick={this.create}
          style={{ width: '60%' }}
        />
      </div>
    );
  }
}
