import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { fetchEventDateList } from '../action/EventAction';
import { IEvent } from '../types';
import EventPageFragment from './EventPageFragment';

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

export default class EventPage extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
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

  public refreshEventList() {
    const { dispatch } = this.props;
    dispatch(fetchEventDateList());
  }

  public componentWillMount() {
    this.refreshEventList();
  }

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
