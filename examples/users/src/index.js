import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './containers/App';
import UsersPage from './containers/UsersPage';
import UserDetailPage from './containers/UserDetailPage';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/users" component={UsersPage} />
      <Route path="/user/:id" component={UserDetailPage} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
