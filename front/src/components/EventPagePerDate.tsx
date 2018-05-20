import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import {firebaseDb} from '../firebase'
import EventPagePerDateFragment from './EventPagePerDateFragment';

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
  isLoding: boolean
  event: any[]
}

// TODO get userInfo by id
export default class EventPagePerDate extends React.Component<InterfaceProps, InterfaceState> {
  constructor(props: InterfaceProps) {
    super(props)
    this.state = {isLoding: false, event: []}

    this.accessCreateEventPage = this.accessCreateEventPage.bind(this)
  }

  public async getEvents(year: string, month: string, date: string) {
    this.setState({isLoding: true, event: []})
    const val = ((await firebaseDb.ref(`events/${year}/${month}/${date}`).once('value')).val())
    if (val) {
      this.setState({isLoding: false, event: val})
    } else {
      this.setState({isLoding: false, event: []})
    }
  }

  public accessCreateEventPage() {
    this.props.history.push('/create')
  }

  public onClickListItem(key: string) {
    this.props.history.push(`/events/${this.state.event[key].date.split(' ')[0]}/${this.state.event[key].eventId}`)
  }

  public componentDidMount() {
    const {year, month, date} = this.props.match.params
    this.getEvents(year, month, date)
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        {this.state.isLoding ?
        <div style={{textAlign: 'center'}}>
          <CircularProgress size={70} style={{alignItems: 'center'}}/>
        </div> :
        <EventPagePerDateFragment history={this.props.history} match={this.props.match} event={this.state.event}/>
        }
      </div>
    );
  }
}


