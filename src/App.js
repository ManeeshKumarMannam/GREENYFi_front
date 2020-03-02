import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login'
import HomePage from './Homepage'

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
