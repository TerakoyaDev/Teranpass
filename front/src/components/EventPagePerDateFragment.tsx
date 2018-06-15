import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      year: string;
      month: string;
      date: string;
    };
  };
  event: any[];
}

// TODO get userInfo by id
export default class EventPagePerDateFragment extends React.Component<
  InterfaceProps
> {
  constructor(props: InterfaceProps) {
    super(props);

    this.accessCreateEventPage = this.accessCreateEventPage.bind(this);
  }

  public accessCreateEventPage() {
    this.props.history.push('/create');
  }

  public onClickListItem(key: string) {
    this.props.history.push(
      `/events/${this.props.event[key].date.split(' ')[0]}/${
        this.props.event[key].eventId
      }`
    );
  }

  // TODO porfile card and register event
  public render() {
    const { year, month, date } = this.props.match.params;
    return (
      <div>
        <p
          style={{ margin: '5px' }}
        >{`${year}年${month}月${date}日のイベント`}</p>
        {this.props.event.length !== 0 ? (
          <div>
            <List
              style={{
                maxHeight: window.innerHeight - 150,
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {Object.keys(this.props.event).map((val, index) => (
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
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        ) : (
          <div> No Event </div>
        )}
      </div>
    );
  }
}
