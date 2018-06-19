import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import { deleteEventAction } from '../action/EventAction';
import { IUserInfo } from '../App';
import { firebaseAuth, firebaseDb } from '../firebase';
import JoinButton from './JoinButton';
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
      const ref = firebaseDb.ref(
        `events/${this.props.event.eventId}/participants`
      );
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
      const ref = firebaseDb.ref(
        `events/${this.props.event.eventId}/participants`
      );
      ref.transaction(array => {
        if (array) {
          return array.filter((n: IUserInfo) => n.uid !== user.uid);
        } else {
          return [];
        }
      });

      // userHasEvents
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
            style={{ backgroundColor: '#CEECF5' }}
            action={
              <div>
                {this.isAuthedAccount() ? (
                  <IconButton onClick={this.deleteEvent.bind(this)}>
                    <SvgIcon>
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </SvgIcon>
                  </IconButton>
                ) : (
                  <JoinButton
                    isJoin={this.state.isJoin}
                    removeUserInEvent={this.removeUserFromEvent}
                    joinUserToEvent={this.joinUserToEvent}
                  />
                )}
              </div>
            }
            title={this.props.event.title}
            subheader={this.props.event.date}
          />
          <CardContent>
            <Typography component="p">
              {`場所: ${this.props.event.location}`}
            </Typography>
            <br />
            <Typography component="p">{this.props.event.body}</Typography>
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
