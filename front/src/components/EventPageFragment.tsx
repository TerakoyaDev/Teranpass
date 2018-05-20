import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Subheader from 'material-ui/Subheader';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import { IUserInfo } from '../App';
import { firebaseAuth, firebaseDb } from '../firebase';

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  event: {
    body: string;
    date: string;
    eventId: string;
    location: string;
    participants: IUserInfo[];
    sponsor: {
      displayName: string;
      email: string;
      photoURL: string;
      uid: string;
    };
    title: string;
  };
  getEvents: () => void;
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
    this.removeUserInEvent = this.removeUserInEvent.bind(this);
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
      if (this.props.event.participants.find(n => n.uid === user.uid)) {
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
        `events/${this.props.event.date.split(' ')[0]}/${
          this.props.event.eventId
        }/participants`
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
        .ref(`userHasEvents/${user.uid}`)
        .once('value')).val();

      let eventsList = [];
      if (val) {
        eventsList = val;
      }

      // push
      eventsList.push(this.props.event);

      // update
      const updates = {};
      updates[`userHasEvents/${user.uid}`] = eventsList;
      await firebaseDb.ref().update(updates);

      this.setState({ isJoin: true });
      this.props.getEvents();
    }
  }

  // remove
  public async removeUserInEvent() {
    const user = firebaseAuth.currentUser;
    if (user) {
      const ref = firebaseDb.ref(
        `events/${this.props.event.date.split(' ')[0]}/${
          this.props.event.eventId
        }/participants`
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
        .ref(`userHasEvents/${user.uid}`)
        .once('value')).val();
      let eventsList = [];
      if (val) {
        eventsList = val;
      }

      // update
      const updates = {};
      updates[`userHasEvents/${user.uid}`] = eventsList.filter(
        (n: any) => n.eventId !== this.props.event.eventId
      );
      await firebaseDb.ref().update(updates);

      this.setState({ isJoin: false });
      this.props.getEvents();
    }
  }

  public async deleteEvent() {
    const user = firebaseAuth.currentUser;
    if (user) {
      // update
      const updates = {};

      const userEventList = (await firebaseDb
        .ref(`userHasEvents`)
        .once('value')).val();

      const newUserEventList = {};
      Object.keys(userEventList).map(n => {
        newUserEventList[n] = userEventList[n].filter(
          (m: any) => m.eventId !== this.props.event.eventId
        );
      });
      updates[`userHasEvents`] = newUserEventList;
      updates[
        `events/${this.props.event.date.split(' ')[0]}/${
          this.props.event.eventId
        }`
      ] = null;
      await firebaseDb.ref().update(updates);
      this.props.getEvents();
    }
  }

  public pushUserPage(userInfo: IUserInfo) {
    this.props.history.push(`/users/${userInfo.uid}`);
  }

  public componentDidMount() {
    this.setJoin();
  }

  public joinButton = () =>
    this.state.isJoin ? (
      <IconButton onClick={this.removeUserInEvent}>
        <SvgIcon>
          <path d="M19,13H5V11H19V13Z" />
        </SvgIcon>
      </IconButton>
    ) : (
      <IconButton onClick={this.joinUserToEvent}>
        <SvgIcon>
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </SvgIcon>
      </IconButton>
    );

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar src={this.props.event.sponsor.photoURL} />}
            action={
              <div>
                {this.isAuthedAccount() ? (
                  <IconButton onClick={this.deleteEvent.bind(this)}>
                    <SvgIcon>
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </SvgIcon>
                  </IconButton>
                ) : (
                  <this.joinButton />
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
        <Card>
          <CardContent>
            <Subheader>{`このイベントに登録中のユーザ`}</Subheader>
            <Grid container={true} spacing={24}>
              {this.props.event.participants.map((val, index) => (
                <Grid item={true} xs={2} key={index}>
                  <IconButton onClick={this.pushUserPage.bind(this, val)}>
                    <Avatar src={val.photoURL} />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}
