import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';

interface IProps {
  isJoin: boolean;
  removeUserInEvent: () => void;
  joinUserToEvent: () => void;
}

interface IState {
  open: boolean;
}

export default class JoinEventButton extends React.Component<IProps, IState> {
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

  public render() {
    return this.props.isJoin ? (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="キャンセル"
      >
        <IconButton onClick={this.props.removeUserInEvent}>
          <SvgIcon>
            <path d="M19,13H5V11H19V13Z" />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="参加"
      >
        <IconButton onClick={this.props.joinUserToEvent}>
          <SvgIcon>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    );
  }
}
