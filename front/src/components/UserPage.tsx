import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import { fetchEventDateList } from '../action/EventAction';
import { fetchUserInfoFromDatabase } from '../action/UserAction';
import { IUserInfo } from '../App';
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
  eventList: IEvent[];
  userInfo: IUserInfo;
  isFetching: boolean;
  dispatch: any;
}

export default class UserPage extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props);
  }

  public componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchUserInfoFromDatabase(this.props.match.params.id));
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
          <UserPageFragment
            userInfo={this.props.userInfo}
            history={this.props.history}
            eventList={this.props.eventList}
          />
        )}
      </div>
    );
  }
}
