import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import UsersList, { loadData } from './components/UsersList';

/// with React Route Config
export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    loadData,
    path: '/users',
    component: UsersList
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
