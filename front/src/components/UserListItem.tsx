import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="top"
        title={this.props.item.displayName}
      >
        <IconButton onClick={this.pushUserPage.bind(this, this.props.item)}>
          <Avatar src={this.props.item.photoURL} />
        </IconButton>
      </Tooltip>
    );
  }
}
