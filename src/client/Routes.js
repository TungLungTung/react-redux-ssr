import React from 'react';
import { Route } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

/// with React Route Config
export default [
  {
    ...App,
    routes: [
      {
        /// Key is component value is Homepage, take from HomePage.js
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        ...NotFoundPage
      }
    ]
  }
];

//// Old way
// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route path="/users" component={UsersList} />
//     </div>
//   );
// };
