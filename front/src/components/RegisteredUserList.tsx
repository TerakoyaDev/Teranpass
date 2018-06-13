import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';
import { IUserInfo } from '../App';

interface IProps {
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
  pushUserPage: (userInfo: IUserInfo) => void;
}

export default class RegisteredUserList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Card>
        <CardContent>
          <Subheader>{`このイベントに登録中のユーザ`}</Subheader>
          <Grid container={true} spacing={24}>
            {this.props.event.participants.map((val: any, index: any) => (
              <Grid item={true} key={index}>
                <IconButton onClick={this.props.pushUserPage.bind(this, val)}>
                  <Avatar src={val.photoURL} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
