import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

interface IProps {
  history: {
    push: (path: string) => void;
  };
  event: any[];
  sortFunc: (a: any, b: any) => number;
}

export default class EventList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public onClickListItem(key: string) {
    this.props.history.push(
      `/events/${this.props.event[key].date.split(' ')[0]}/${
        this.props.event[key].eventId
      }`
    );
  }

  public render() {
    return (
      <div>
        {this.props.event.length !== 0 ? (
          <div>
            <List
              style={{
                maxHeight: window.innerHeight - 250,
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
                        secondary={this.props.event[val].date}
                      />
                      <ListItemSecondaryAction>
                        <div style={{ margin: '10px' }}>{`${
                          this.props.event[val].participants.length
                        }人登録中！`}</div>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                )
              )}
            </List>
          </div>
        ) : (
          <div> No Event </div>
        )}
      </div>
    );
  }
}
