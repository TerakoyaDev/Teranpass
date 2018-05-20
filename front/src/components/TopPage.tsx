import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { firebaseDb } from '../firebase';

interface IProps {
  history: {
    push: (path: string) => void;
  };
}

interface IState {
  dateList: Date[];
}

export default class TopPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { dateList: [] };

    this.selectedDate = this.selectedDate.bind(this);
    this.fetchEventListData = this.fetchEventListData.bind(this);
    this.accessCreateEventPage = this.accessCreateEventPage.bind(this);
  }

  public selectedDate(date: string) {
    const dateVal = new Date(Date.parse(date));

    this.props.history.push(
      `/eventList/${dateVal.getFullYear()}/${dateVal.getMonth() +
        1}/${dateVal.getDate()}`
    );
    // location.href='/signin'
    // TODO get events of given date
  }

  public accessCreateEventPage() {
    this.props.history.push('/create');
  }

  public async fetchEventListData() {
    const val = (await firebaseDb.ref(`events`).once('value')).val();

    const localDateList: Date[] = [];
    JSON.parse(JSON.stringify(val), (key, value) => {
      if (key === 'date') {
        const dateObject = value.split(' ')[0].split('/');
        localDateList.push(
          new Date(dateObject[0], dateObject[1] - 1, dateObject[2])
        );
      }
    });

    this.setState({ dateList: localDateList });
  }

  public componentWillMount() {
    this.fetchEventListData();
  }

  public render() {
    // Render the Calendar
    return (
      <div>
        <InfiniteCalendar
          Component={withMultipleDates(Calendar)}
          interpolateSelection={defaultMultipleDateInterpolation}
          width={window.innerWidth}
          height={window.innerHeight - 250}
          selected={this.state.dateList}
          onSelect={this.selectedDate}
          displayOptions={{
            showHeader: false,
          }}
        />
        <Button
          variant="fab"
          color={'primary'}
          style={{ position: 'absolute', bottom: 10, right: 10 }}
          onClick={this.accessCreateEventPage}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}
