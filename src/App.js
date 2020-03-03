import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

import '../src/assets/css/style.css';
import '../src/assets/css/responsive.css';


import Login from '../src/pages/Login'
import HomePage from '../src/pages/Homepage'

class App extends Component {


  render() {


    return (
      <Provider store={store}>
        <Router>
          <Switch>


            {/* <Route exact path="/" component={Register} /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/homePage" component={HomePage} />





          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
