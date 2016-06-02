import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './containers/App';
import UsersPage from './containers/UserList';
import UserDetailPage from './containers/UserDetail';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={UsersPage} />
        <Route path="/user/:id" component={UserDetailPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
