import IconButton from '@material-ui/core/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';

interface IProps {
  isJoin: boolean;
  removeUserInEvent: () => void;
  joinUserToEvent: () => void;
}

export default class JoinEventButton extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return this.props.isJoin ? (
      <IconButton onClick={this.props.removeUserInEvent}>
        <SvgIcon>
          <path d="M19,13H5V11H19V13Z" />
        </SvgIcon>
      </IconButton>
    ) : (
      <IconButton onClick={this.props.joinUserToEvent}>
        <SvgIcon>
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </SvgIcon>
      </IconButton>
    );
  }
}
