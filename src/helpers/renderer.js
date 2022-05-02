import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import Routes from '../client/Routes';

//// React Route Config
import { renderRoutes } from 'react-router-config';

/// Using Route with react router config
export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  return `<html>
    <head>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    </head>
      <body>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
  </html>`;
};

/// Store from index.js
// export default (req, store) => {
//   const content = renderToString(
//     <Provider store={store}>
//       <StaticRouter location={req.path} context={{}}>
//         <Routes />
//       </StaticRouter>
//     </Provider>
//   );
//   return `<html>
//     <head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="bundle.js"></script>
//       </body>
//     </head>
//   </html>`;
// };
