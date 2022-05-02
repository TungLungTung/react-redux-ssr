import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount() {
    /// Fetch users
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users loaded`}</title>
        <meta property="og:title" content="Uesrs App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div className="center-align" style={{ marginTop: '100px' }}>
        {this.head()}
        <h3>Here's a big list of users:</h3>
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

/// Connect to Redux
function mapStateToProps(state) {
  return { users: state.users };
}

/// load Data
//// Receive store from redux
function loadData(store) {
  // console.log('Im trying to load some data');
  /// IMPORTANT: that line under return PROMISES
  return store.dispatch(fetchUsers());
}
/// Khong dung mapStateToProps de add action creators vao

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
