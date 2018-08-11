import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App';
import Store from './Store.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { AUTHENTICATED } from './Actions/ActionTypes';

const user = localStorage.getItem('user');

if(user) {
  Store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
