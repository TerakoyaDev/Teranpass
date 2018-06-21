import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { deleteEventAction } from '../action/EventAction';
import { firebaseAuth, firebaseDb } from '../firebase';
import { IUserInfo } from '../types';
import JoinEventButton from './JoinEventButton';
import RegisteredUserList from './RegisteredUserList';

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  event: any;
  getEvents: () => void;
  dispatch: any;
}

interface InterfaceState {
  isJoin: boolean;
}

// TODO get userInfo by id
export default class EventPageFragment extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = { isJoin: false };

    this.joinUserToEvent = this.joinUserToEvent.bind(this);
    this.removeUserFromEvent = this.removeUserFromEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.setJoin = this.setJoin.bind(this);
  }

  public isAuthedAccount() {
    const user = firebaseAuth.currentUser;
    if (user) {
      return this.props.event.sponsor.uid === user.uid;
    }
    return false;
  }

  public setJoin() {
    const user = firebaseAuth.currentUser;
    if (user) {
      if (this.props.event.participants.find((n: any) => n.uid === user.uid)) {
        this.setState({ isJoin: true });
      } else {
        this.setState({ isJoin: false });
      }
    }
  }

  // join
  public async joinUserToEvent() {
    const user = firebaseAuth.currentUser;
    if (user) {
      // fetch
      const ref = firebaseDb.ref(
        `events/${this.props.event.eventId}/participants`
      );

      // store
      ref.transaction(array => {
        if (array) {
          array.push({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
          return array;
        } else {
          return [];
        }
      });

      // fetch
      const val = (await firebaseDb
        .ref(`users/${user.uid}/joinEventList`)
        .once('value')).val();

      let eventsList = [];
      if (val) {
        eventsList = val;
      }

      // push
      eventsList.push(this.props.event);

      // update
      const updates = {};
      updates[`users/${user.uid}/joinEventList`] = eventsList;
      await firebaseDb.ref().update(updates);

      this.setState({ isJoin: true });
      this.props.getEvents();
    }
  }

  // remove
  public async removeUserFromEvent() {
    const user = firebaseAuth.currentUser;
    if (user) {
      // fetch
      const ref = firebaseDb.ref(
        `events/${this.props.event.eventId}/participants`
      );

      // store
      ref.transaction(array => {
        if (array) {
          return array.filter((n: IUserInfo) => n.uid !== user.uid);
        } else {
          return [];
        }
      });

      // fetch
      const val = (await firebaseDb
        .ref(`users/${user.uid}/joinEventList`)
        .once('value')).val();

      let eventsList = [];
      if (val) {
        eventsList = val;
      }

      // update
      const updates = {};
      updates[`users/${user.uid}/joinEventList`] = eventsList.filter(
        (n: any) => n.eventId !== this.props.event.eventId
      );
      await firebaseDb.ref().update(updates);

      this.setState({ isJoin: false });
      this.props.getEvents();
    }
  }

  public editEvent() {
    this.props.history.push(`/edit/${this.props.event.eventId}`);
  }

  public async deleteEvent() {
    const { dispatch } = this.props;
    dispatch(deleteEventAction(this.props.event.eventId));
  }

  public componentWillMount() {
    this.setJoin();
  }

  public render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar src={this.props.event.sponsor.photoURL} />}
            action={
              <div>
                {this.isAuthedAccount() ? (
                  <div>
                    <Tooltip placement="top" title="Edit">
                      <IconButton onClick={this.editEvent.bind(this)}>
                        <SvgIcon>
                          <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Delete">
                      <IconButton onClick={this.deleteEvent}>
                        <SvgIcon>
                          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <JoinEventButton
                    isJoin={this.state.isJoin}
                    removeUserInEvent={this.removeUserFromEvent}
                    joinUserToEvent={this.joinUserToEvent}
                  />
                )}
              </div>
            }
            title={this.props.event.title}
            subheader={`${this.props.event.date}~  ${
              this.props.event.location
            }`}
          />
          <CardContent>
            <div>
              <ReactMarkdown source={this.props.event.body} />
            </div>
          </CardContent>
        </Card>
        <RegisteredUserList
          history={this.props.history}
          event={this.props.event}
        />
      </div>
    );
  }
}
