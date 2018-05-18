import * as React from 'react';
import {firebaseDb} from '../firebase'

interface InterfaceProps {
  match: {
    params: {
      id: string,
    }
  }
}

// TODO get userInfo by id
export default class UserPage extends React.Component<InterfaceProps> {
  constructor(props: InterfaceProps) {
    super(props)
  }

  public async getUserInfo(id: string) {
    const val = ((await firebaseDb.ref(`users/${id}`).once('value')).val())
    console.log(val)
    return val.displayName
  }

  public render() {
    return (
      <div>
        {this.getUserInfo(this.props.match.params.id)}
      </div>
    );
  }
}

