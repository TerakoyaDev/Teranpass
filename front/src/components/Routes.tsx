import * as React from 'react';
import {Route} from 'react-router-dom';
import MyAppBar from '../components/MyAppBar';
import TopPage from '../components/TopPage';
import UserPage from '../components/UserPage';
import SettingPageContainer from '../container/SettingPageContainer';
import SigninPageContainer from '../container/SigninPageContainer';
import SignupPageContainer from '../container/SignupPageContainer';

interface IProps {
  history: {
    push: (path: string) => void
  }
}

export default class Routes extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props)
  }

  public render() {
    return (
      <div>
        <MyAppBar />
        <Route exact={true} path='/' component={TopPage} />
        <Route path='/signin' component={SigninPageContainer} />
        <Route path='/signup' component={SignupPageContainer} />
        <Route path='/users/:id' component={UserPage} />
        <Route path='/setting' component={SettingPageContainer} />
      </div>
    );
  }
}
