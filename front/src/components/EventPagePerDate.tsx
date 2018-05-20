import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as React from 'react';
import {firebaseDb} from '../firebase'

interface InterfaceProps {
  history: {
    push: (path: string) => void
  },
  match: {
    params: {
      year: string,
      month: string,
      date: string,
    }
  }
}

interface InterfaceState {
  event: string[]
}

// TODO get userInfo by id
export default class EventPagePerDate extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props: InterfaceProps) {
    super(props)
    this.state = {event: []}

    this.accessCreateEventPage = this.accessCreateEventPage.bind(this)
  }

  public async getEvents(year: string, month: string, date: string) {
    const val = ((await firebaseDb.ref(`events/${year}/${month}/${date}`).once('value')).val())
    if (val) {
      this.setState({event: val})
    } else {
      this.setState({event: []})
    }
  }

  public accessCreateEventPage() {
    this.props.history.push('/create')
  }

  public componentDidMount() {
    const {year, month, date} = this.props.match.params
    console.log(year)
    this.getEvents(year, month, date)
  }

  // TODO porfile card and register event
  public render() {
    const {year, month, date} = this.props.match.params
    const key = Object.keys(this.state.event)[0]
    return (
      <div>
        {`${year}年${month}月${date}日`}
        {
        this.state.event.length !== 0 ?
          <div> {this.state.event[key].body} </div> :
          <div> No Event </div>
          }
          <Button variant="fab" color={'primary'} style={{position: 'absolute', bottom: 10, right: 10}} onClick={this.accessCreateEventPage}>
            <AddIcon />
          </Button>
      </div>
    );
  }
}


