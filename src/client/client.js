/// starup point for the client side application
import 'babel-polyfill'; /// Fix regenerator Runtime
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

/// Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/// React Router Config
import { renderRoutes } from 'react-router-config';

/// Reducers
import reducers from './reducers';

const store = createStore(
  reducers,
  window.app_initial_state || {},
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
