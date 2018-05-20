import * as React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

interface IProps {
  history: {
    push: (path: string) => void
  }
}

export default class TopPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    this.selectedDate = this.selectedDate.bind(this)
  }

  public selectedDate(date: string) {
    console.log(Date.parse(date))

    const dateVal = new Date(Date.parse(date))

    this.props.history.push(`/eventList/${dateVal.getFullYear()}/${dateVal.getMonth() + 1}/${dateVal.getDate()}`)
    // location.href='/signin'
    // TODO get events of given date
  }
  public render() {
    // Render the Calendar
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return (
      <InfiniteCalendar
        width={window.innerWidth}
        height={window.innerHeight - 250}
        rowHeight={70}
        selected={today}
        minDate={lastWeek}
        onSelect={this.selectedDate}
      />
    );
  }
}
