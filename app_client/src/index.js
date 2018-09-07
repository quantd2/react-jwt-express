import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App';
import Store from './Store.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './bootstrap.min.css';

import { AUTHENTICATED } from './Actions/ActionTypes';

const authToken = localStorage.getItem('authToken');

if(authToken) {
  Store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
// registerServiceWorker();
