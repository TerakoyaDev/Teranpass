import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { fetchEventDateList } from '../action/EventAction';
import EventPagePerDateFragment from './EventPagePerDateFragment';

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
  isFetching: boolean;
  eventList: any[];
  dispatch: any;
}

interface InterfaceState {
  isLoding: boolean;
  event: any[];
}

// TODO get userInfo by id
export default class EventPagePerDate extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = { isLoding: false, event: [] };

    this.accessCreateEventPage = this.accessCreateEventPage.bind(this);
  }

  public getEvents() {
    const { year, month, date } = this.props.match.params;
    return this.props.eventList.filter(
      n => n.date === `${year}/${month}/${date}`
    );
  }

  public accessCreateEventPage() {
    this.props.history.push('/create');
  }

  public onClickListItem(key: string) {
    this.props.history.push(
      `/events/${this.state.event[key].date.split(' ')[0]}/${
        this.state.event[key].eventId
      }`
    );
  }

  public componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchEventDateList());
  }
  //
  // TODO porfile card and register event
  public render() {
    return (
      <div>
        {this.props.isFetching ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <EventPagePerDateFragment
            history={this.props.history}
            match={this.props.match}
            event={this.getEvents()}
          />
        )}
      </div>
    );
  }
}
