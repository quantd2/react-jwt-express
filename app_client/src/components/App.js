import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

if (!global._babelPolyfill) {
	require('babel-polyfill');
  // import 'babel-polyfill';
}

import BoardContainer from './boards/BoardContainer';
import ShowActiveBoard from './boards/activeBoard/ShowActiveBoard';
import NotFound from './NotFound';
import Header from './Header';
import Navigation from './Navigation';
import requireAuth from './auth/require_auth';
import noRequireAuth from './auth/no_require_auth';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

@DragDropContext(HTML5Backend)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
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
