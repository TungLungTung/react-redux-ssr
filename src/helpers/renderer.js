import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../client/Routes';

//// React Route Config
import { renderRoutes } from 'react-router-config';

/// Using Route with react router config
export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );
  return `<html>
    <head>
      <body>
        <script>
          var app_initial_state = ${JSON.stringify(store.getState())};
        </script>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </head>
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
