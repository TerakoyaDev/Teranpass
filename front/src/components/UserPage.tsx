import * as React from 'react';

interface InterfaceProps {
  match: {
    params: {
      id: string,
    }
  }
}

// TODO get userInfo by id
export default class UserPage extends React.Component<InterfaceProps> {
  public render() {
    return (
      <div>
        {this.props.match.params.id}
      </div>
    );
  }
}

