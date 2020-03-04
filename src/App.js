import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../src/pages/login'
import HomePage from '../src/pages/homePage'
import Register from '../src/pages/register'
import ForgotPwd from '../src/pages/forgotPassword'
import ChangePwd from '../src/pages/changePassword'
import UserProfile from '../src/pages/userProfile'
import reportIssue from "../src/pages/reportIssue"

import '../src/assets/css/style.css';
import '../src/assets/css/responsive.css';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotpassword" component={ForgotPwd} />
            <Route exact path="/changepassword" component={ChangePwd} />
            <Route exact path="/myProfile" component={UserProfile} />
            <Route exact path="/reportIssue" component={reportIssue} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
