import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import { IUserInfo } from '../types';

interface IProps {
  history: {
    push: (path: string) => void;
  };
  item: IUserInfo;
}

interface IState {
  open: boolean;
}

export default class UserListItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
    this.handleTooltipClose = this.handleTooltipClose.bind(this);
    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
  }

  public handleTooltipClose = () => {
    this.setState({ open: false });
  };

  public handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  public pushUserPage(userInfo: IUserInfo) {
    this.props.history.push(`/users/${userInfo.uid}`);
  }

  public render() {
    return (
      <Chip
        avatar={<Avatar src={this.props.item.photoURL} />}
        label={this.props.item.displayName}
        onClick={this.pushUserPage.bind(this, this.props.item)}
      />
    );
  }
}
