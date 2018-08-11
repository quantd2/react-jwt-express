import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'babel-polyfill';

import BoardContainer from './boards/BoardContainer';
import ShowActiveBoard from './boards/activeBoard/ShowActiveBoard';
import NotFound from './NotFound';
import Header from './Header';
import Navbar from './Navbar';
import requireAuth from './auth/require_auth';
import noRequireAuth from './auth/no_require_auth';
import Signin from './auth/signin';
import Signup from './auth/signup';

@DragDropContext(HTML5Backend)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/" component={requireAuth(BoardContainer)} />
          <Route path="/b/:id" component={requireAuth(ShowActiveBoard)} />
          <Route path="/signin" component={noRequireAuth(Signin)} />
          <Route path="/signup" component={noRequireAuth(Signup)} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
