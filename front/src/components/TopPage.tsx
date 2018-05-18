import * as React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

export default class TopPage extends React.Component {
  public selectedDate(date: string) {
    console.log(Date.parse(date))
    // TODO get events of given date
  }
  public render() {
    // Render the Calendar
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    return (
      <InfiniteCalendar
        width={(window.innerWidth <= 650) ? window.innerWidth : 650}
        height={window.innerHeight - 250}
        rowHeight={70}
        selected={today}
        disabledDays={[0,6]}
        minDate={lastWeek}
        onSelect={this.selectedDate}
      />
    );
  }
}
