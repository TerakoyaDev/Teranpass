import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AddIcon from '@material-ui/icons/Add';
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
    this.accessCreateEventPage = this.accessCreateEventPage.bind(this);
  }

  // push EventPagePerDate
  public selectedDate(date: string) {
    const dateVal = new Date(Date.parse(date));

    this.props.history.push(
      `/eventList/${dateVal.getFullYear()}/${dateVal.getMonth() +
        1}/${dateVal.getDate()}`
    );
  }

  // push create page
  public accessCreateEventPage() {
    this.props.history.push('/create');
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
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth={true}
              >
                <Tab label="人気のイベント" />
                <Tab label="直近のイベント" />
                <Tab label="カレンダー" />
              </Tabs>
            </AppBar>
            {((): any => {
              if (this.state.value === 0) {
                return (
                  <EventList
                    event={this.props.eventList}
                    history={this.props.history}
                    sortFunc={this.popularSortFunc}
                  />
                );
              } else if (this.state.value === 1) {
                return (
                  <EventList
                    event={this.props.eventList}
                    history={this.props.history}
                    sortFunc={this.newestSortFunc}
                  />
                );
              } else if (this.state.value === 2) {
                return (
                  <div>
                    <InfiniteCalendar
                      Component={withMultipleDates(Calendar)}
                      interpolateSelection={defaultMultipleDateInterpolation}
                      width={window.innerWidth}
                      height={window.innerHeight - 150}
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
            <Button
              variant="fab"
              color={'primary'}
              style={{ position: 'absolute', bottom: 10, right: 10 }}
              onClick={this.accessCreateEventPage}
            >
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}
