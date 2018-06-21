import Badge from '@material-ui/core/Badge';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';

interface IProps {
  count: number;
}

export default class UserCountBadge extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Badge
        badgeContent={this.props.count}
        color="secondary"
        style={{ marginRight: '20px' }}
      >
        <SvgIcon>
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </SvgIcon>
      </Badge>
    );
  }
}
