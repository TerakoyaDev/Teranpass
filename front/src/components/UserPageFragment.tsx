import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';
import { IEvent } from '../types';
import { IUserInfo } from '../types';

interface IProps {
  history: {
    push: (path: string) => void;
  };
  userInfo: IUserInfo;
  eventList: any[];
}

export default class UserPageFragment extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onClickListItem = this.onClickListItem.bind(this);
  }

  public onClickListItem(index: number) {
    this.props.history.push(
      `/events/${this.props.eventList[index].date.split(' ')[0]}/${
        this.props.eventList[index].eventId
      }`
    );
  }

  public render() {
    return (
      <div>
        <Card>
          <CardHeader
            avatar={<Avatar src={this.props.userInfo.photoURL} />}
            title={this.props.userInfo.displayName}
          />
        </Card>
        <Card>
          <CardContent>
            <Subheader>{`登録中のイベント`}</Subheader>
            {this.props.userInfo.joinEventList ? (
              <List
                style={{
                  maxHeight: 300,
                  overflow: 'auto',
                  position: 'relative',
                }}
              >
                {this.props.userInfo.joinEventList
                  .filter((n: IEvent) => new Date(n.date) >= new Date())
                  .map((item, index) => (
                    <div key={index}>
                      <ListItem
                        key={index}
                        button={true}
                        onClick={this.onClickListItem.bind(this, index)}
                      >
                        <Avatar src={item.sponsor.photoURL} />
                        <ListItemText
                          primary={`${item.title}`}
                          secondary={item.date}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
              </List>
            ) : (
              <Typography paragraph={true}>No Event</Typography>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}
