import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';
import { IUserInfo } from '../App';

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
}

// TODO get userInfo by id
export default class EventPageFragment extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
  }

  public pushUserPage(userInfo: IUserInfo) {
    this.props.history.push(`/users/${userInfo.uid}`);
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={
              this.props.event.sponsor.photoURL !== 'default' ? (
                <Avatar src={this.props.event.sponsor.photoURL} />
              ) : (
                <Avatar>
                  <Person />
                </Avatar>
              )
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
                <Grid item={true} xs={1} key={index}>
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
