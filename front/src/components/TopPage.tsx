import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Event from '@material-ui/icons/Event';
import New from '@material-ui/icons/SmsFailed';
import Star from '@material-ui/icons/Star';
import * as React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { fetchEventDateList } from '../action/EventAction';
import EventList from './EventList';

interface IProps {
  isFetching: boolean;
  dateList: Date[];
  eventList: any[];
  history: {
    push: (path: string) => void;
  };
  isAuth: boolean;
  dispatch: any;
}

interface IState {
  value: number;
}

export default class TopPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { value: 0 };

    this.selectedDate = this.selectedDate.bind(this);
  }

  // push EventPagePerDate
  public selectedDate(date: string) {
    const dateVal = new Date(Date.parse(date));
    this.props.history.push(
      `/eventList/${dateVal.getFullYear()}/${dateVal.getMonth() +
        1}/${dateVal.getDate()}`
    );
  }

  // call fetchEventDateList when create DOM
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEventDateList());
  }

  public handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  public popularSortFunc(a: any, b: any) {
    if (a.participants.length > b.participants.length) {
      return -1;
    }
    if (a.participants.length < b.participants.length) {
      return 1;
    }
    return 0;
  }

  public newestSortFunc(a: any, b: any) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  public render() {
    return (
      <div>
        {this.props.isFetching ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <div>
            <AppBar position="static" color="inherit">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth={true}
              >
                <Tab icon={<Star />} label="人気のイベント" />
                <Tab icon={<New />} label="直近のイベント" />
                <Tab icon={<Event />} label="カレンダー" />
              </Tabs>
            </AppBar>
            {((): any => {
              if (this.state.value === 0) {
                return (
                  <EventList
                    event={this.props.eventList}
                    history={this.props.history}
                    sortFunc={this.popularSortFunc}
                    isAuth={this.props.isAuth}
                  />
                );
              } else if (this.state.value === 1) {
                return (
                  <EventList
                    event={this.props.eventList}
                    history={this.props.history}
                    sortFunc={this.newestSortFunc}
                    isAuth={this.props.isAuth}
                  />
                );
              } else if (this.state.value === 2) {
                return (
                  <div>
                    <InfiniteCalendar
                      Component={withMultipleDates(Calendar)}
                      interpolateSelection={defaultMultipleDateInterpolation}
                      width={window.innerWidth}
                      height={window.innerHeight - 190}
                      selected={this.props.dateList}
                      onSelect={this.selectedDate}
                      displayOptions={{
                        showHeader: false,
                      }}
                    />
                  </div>
                );
              }
            })()}
          </div>
        )}
      </div>
    );
  }
}
