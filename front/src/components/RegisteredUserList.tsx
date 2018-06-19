import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';
import { IUserInfo } from '../types';
import UserListItem from './UserListItem';

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
}

interface IState {
  open: boolean;
}

export default class RegisteredUserList extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
    this.handleTooltipClose = this.handleTooltipClose.bind(this);
    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
  }

  public handleTooltipClose = () => {
    this.setState({ open: false });
  };

  public handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  public render() {
    return (
      <Card>
        <CardContent>
          <Subheader>{`このイベントに登録中のユーザ`}</Subheader>
          <Grid container={true} spacing={24}>
            {this.props.event.participants.map((val: any, index: any) => (
              <Grid item={true} key={index}>
                <UserListItem history={this.props.history} item={val} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
