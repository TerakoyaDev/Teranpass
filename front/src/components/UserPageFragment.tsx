import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import Person from '@material-ui/icons/Person';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';

interface IProps {
  userInfo: {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
  }
}

export default class UserPageFragment extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
  }

  public render() {
    return (
      <Card>
        <CardHeader
          avatar={
            this.props.userInfo.photoURL !== 'default' ?
            <Avatar src={this.props.userInfo.photoURL}/> :
            <Avatar>
              <Person />
            </Avatar>
            }
            title={this.props.userInfo.displayName}
            subheader="19卒エンジニア"
          />
        <CardContent>
          <Subheader>{`登録中のイベント`}</Subheader>
          <List style={{maxHeight: 300, overflow: 'auto', position: 'relative'}}>
            {[0, 1, 2].map(item => (
            <div key={item.toString()}>
              <ListItem key={item.toString()}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={`Item ${item}`} secondary="hello"/>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </CardContent>
      </Card>
    )
  }
}
