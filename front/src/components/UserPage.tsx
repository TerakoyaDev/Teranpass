import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { firebaseDb } from '../firebase';
import { IEvent } from './EventPage';
import UserPageFragment from './UserPageFragment';

interface InterfaceProps {
  match: {
    params: {
      id: string;
    };
  };
  history: {
    push: (path: string) => void;
  };
}

interface IState {
  isLoding: boolean;
  userInfo: {
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
    joinEventList: any[];
    description: string;
  };
  eventList: any[];
}

// TODO get userInfo by id
export default class UserPage extends React.Component<InterfaceProps, IState> {
  constructor(props: InterfaceProps) {
    super(props);
    this.state = {
      eventList: [],
      isLoding: false,
      userInfo: {
        description: '',
        displayName: '',
        email: '',
        joinEventList: [],
        photoURL: '',
        uid: '',
      },
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  public async getUserInfo(id: string) {
    this.setState({
      ...this.state,
      isLoding: true,
    });
    const val = await (await firebaseDb.ref(`users/${id}`).once('value')).val();
    let userEventList = [];
    if (val.joinEventList) {
      userEventList = val.joinEventList;
    }
    this.setState({
      ...this.state,
      eventList: userEventList.filter(
        (n: IEvent) => new Date(n.date) >= new Date()
      ),
      isLoding: false,
      userInfo: val,
    });
  }

  public componentWillMount() {
    this.setState({ ...this.state, isLoding: false });
    this.getUserInfo(this.props.match.params.id);
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        {this.state.isLoding ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={70} style={{ alignItems: 'center' }} />
          </div>
        ) : (
          <UserPageFragment
            userInfo={this.state.userInfo}
            history={this.props.history}
            eventList={this.state.eventList}
          />
        )}
      </div>
    );
  }
}
