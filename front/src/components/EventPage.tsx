import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { fetchEventDateList } from '../action/EventAction';
import { IUserInfo } from '../App';
import EventPageFragment from './EventPageFragment';

export interface IEvent {
  body: string;
  date: string;
  eventId: string;
  isDelete: boolean;
  location: string;
  participants: IUserInfo[];
  sponsor: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
  };
  title: string;
}

export const initialEventState = {
  body: '',
  date: '',
  eventId: '',
  isDelete: false,
  location: '',
  participants: [],
  sponsor: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
  title: '',
};

interface InterfaceProps {
  history: {
    push: (path: string) => void;
  };
  match: {
    params: {
      year: string;
      month: string;
      date: string;
      eventId: string;
    };
  };
  eventList: IEvent[];
  isFetching: boolean;
  dispatch: any;
}

interface InterfaceState {
  isLoding: boolean;
  event: IEvent;
}

// TODO get userInfo by id
export default class EventPage extends React.Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      event: initialEventState,
      isLoding: false,
    };

    this.refreshEventList = this.refreshEventList.bind(this);
  }

  public getEvent() {
    const findedEvent = this.props.eventList.find(
      n => n.eventId === this.props.match.params.eventId
    );

    if (findedEvent) {
      return findedEvent;
    }
    return initialEventState;
  }

  public pushUserPage(userInfo: IUserInfo) {
    this.props.history.push(`/users/${userInfo.uid}`);
  }

  public refreshEventList() {
    const { dispatch } = this.props;
    dispatch(fetchEventDateList());
  }

  public componentWillMount() {
    this.refreshEventList();
  }

  // TODO porfile card and register event
  public render() {
    const event = this.getEvent();
    return (
      <div>
        {this.props.isFetching ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <EventPageFragment
            history={this.props.history}
            event={event}
            getEvents={this.refreshEventList}
            dispatch={this.props.dispatch}
          />
        )}
      </div>
    );
  }
}
