import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import {firebaseDb} from '../firebase'
import UserPageFragment from './UserPageFragment';

interface InterfaceProps {
  match: {
    params: {
      id: string,
    }
  }
}

interface IState {
  isLoding: boolean,
  userInfo: {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
  }
}

// TODO get userInfo by id
export default class UserPage extends React.Component<InterfaceProps, IState> {
  constructor(props: InterfaceProps) {
    super(props)
    this.state = {
      isLoding: false,
      userInfo: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
      }
    }

    this.getUserInfo = this.getUserInfo.bind(this)
  }

  public async getUserInfo(id: string) {
    this.setState({
      ...this.state,
      isLoding: true
    })
    const val = ((await firebaseDb.ref(`users/${id}`).once('value')).val())
    this.setState({
      isLoding: false,
      userInfo: val
    })
    console.log(val)
  }

  public componentDidMount() {
    this.getUserInfo(this.props.match.params.id)
  }

  // TODO porfile card and register event
  public render() {
    return (
      <div>
        {this.state.isLoding ?
          <div style={{textAlign: 'center'}}>
            <CircularProgress size={70} style={{alignItems: 'center'}}/>
          </div> :
          <UserPageFragment userInfo={this.state.userInfo}/>
        }
      </div>
    );
  }
}

