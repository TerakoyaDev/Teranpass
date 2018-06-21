import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import UserCountBadge from './UserCountBadge';

interface IProps {
  history: {
    push: (path: string) => void;
  };
  event: any[];
  isAuth: boolean;
  sortFunc: (a: any, b: any) => number;
}

export default class EventList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.accessCreateEventPage = this.accessCreateEventPage.bind(this);
  }

  public onClickListItem(key: string) {
    this.props.history.push(
      `/events/${this.props.event[key].date.split(' ')[0]}/${
        this.props.event[key].eventId
      }`
    );
  }

  // push create page
  public accessCreateEventPage() {
    this.props.history.push('/create');
  }

  public render() {
    return (
      <div>
        {this.props.event.length !== 0 ? (
          <div>
            <List
              style={{
                maxHeight: window.innerHeight - 150,
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {Object.keys(this.props.event.sort(this.props.sortFunc)).map(
                (val, index) => (
                  <div key={index}>
                    <ListItem
                      key={index}
                      button={true}
                      onClick={this.onClickListItem.bind(this, val)}
                    >
                      <Avatar src={this.props.event[val].sponsor.photoURL} />
                      <ListItemText
                        primary={`${this.props.event[val].title}`}
                        secondary={`${this.props.event[val].date}~`}
                      />
                      <ListItemSecondaryAction>
                        <UserCountBadge
                          count={this.props.event[val].participants.length}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                )
              )}
            </List>
          </div>
        ) : (
          <div style={{ margin: '10px' }}>
            イベントがありません．イベントを作成してみましょう．
          </div>
        )}
        {this.props.isAuth ? (
          <Button
            variant="fab"
            color={'primary'}
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            onClick={this.accessCreateEventPage}
          >
            <AddIcon />
          </Button>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
