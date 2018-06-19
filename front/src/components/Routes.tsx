import * as React from 'react';
import { Route } from 'react-router';
import CreatePageContainer from '../container/CreatePageContainer';
import EditPageContainer from '../container/EditPageContainer';
import EventPageContainer from '../container/EventPageContainer';
import EventPagePerDateContainer from '../container/EventPagePerDateContainer';
import MyAppBarContainer from '../container/MyAppBarContainer';
import SettingPageContainer from '../container/SettingPageContainer';
import SigninPageContainer from '../container/SigninPageContainer';
import SignupPageContainer from '../container/SignupPageContainer';
import TopPageContainer from '../container/TopPageContainer';
import UserPageContainer from '../container/UserPageContainer';

interface IProps {
  history: {
    push: (path: string) => void;
  };
}

export default class Routes extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <MyAppBarContainer />
        <Route exact={true} path="/" component={TopPageContainer} />
        <Route path="/signin" component={SigninPageContainer} />
        <Route path="/signup" component={SignupPageContainer} />
        <Route path="/users/:id" component={UserPageContainer} />
        <Route
          path="/eventList/:year/:month/:date"
          component={EventPagePerDateContainer}
        />
        <Route
          path="/events/:year/:month/:date/:eventId"
          component={EventPageContainer}
        />
        <Route path="/create" component={CreatePageContainer} />
        <Route path="/edit/:id" component={EditPageContainer} />
        <Route path="/setting" component={SettingPageContainer} />
      </div>
    );
  }
}
