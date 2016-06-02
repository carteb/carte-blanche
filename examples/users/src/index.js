import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './containers/App';
import ContactsPage from './containers/ContactList';
import ContactDetailPage from './containers/ContactDetail';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ContactsPage} />
        <Route path="/contact/:id" component={ContactDetailPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
