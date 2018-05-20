import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import Subheader from 'material-ui/Subheader';
import * as React from 'react';

interface IProps {
  history: {
    push: (path: string) => void
  },
  userInfo: {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
  },
  eventList: any[],
}

export default class UserPageFragment extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    this.onClickListItem = this.onClickListItem.bind(this)
  }

  public onClickListItem(index: number) {
    console.log(this.props.eventList[index])
    this.props.history.push(`/events/${this.props.eventList[index].date.split(' ')[0]}/${this.props.eventList[index].eventId}`)
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
            {this.props.eventList.map((item, index) => (
            <div key={item.toString()}>
              <ListItem key={item.toString()} button={true} onClick={this.onClickListItem.bind(this, index)}>
                <Avatar src={this.props.userInfo.photoURL}/>
                <ListItemText primary={`${item.title}`} secondary={item.date}/>
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
