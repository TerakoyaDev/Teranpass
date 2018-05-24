import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { fetchEventDateList } from '../action/EventAction';

interface IProps {
  isFetching: boolean;
  dateList: Date[];
  history: {
    push: (path: string) => void;
  };
  dispatch: any;
}

export default class TopPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

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

  public render() {
    return (
      <div>
        {this.props.isFetching ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <div>
            <InfiniteCalendar
              Component={withMultipleDates(Calendar)}
              interpolateSelection={defaultMultipleDateInterpolation}
              width={window.innerWidth}
              height={window.innerHeight - 200}
              selected={this.props.dateList}
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
        )}
      </div>
    );
  }
}
