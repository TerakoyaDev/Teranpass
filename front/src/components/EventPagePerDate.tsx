import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { fetchEventDateList } from '../action/EventAction';
import { putZero } from '../utils/DateFormat';
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

export default class EventPagePerDate extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
  }

  public getEvents() {
    const { year, month, date } = this.props.match.params;
    return this.props.eventList.filter(
      n =>
        n.date.split(' ')[0] ===
        `${year}/${putZero(parseInt(month, 10))}/${putZero(parseInt(date, 10))}`
    );
  }

  public componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchEventDateList());
  }

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
            eventList={this.getEvents()}
          />
        )}
      </div>
    );
  }
}
