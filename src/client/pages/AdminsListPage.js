import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
/// HOC
import requireAuth from '../components/hocs/requireAuth';

class AdminsListPage extends Component {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map((admin) => {
      return <li key={admin.id}>{admin.name}</li>;
    });
  }

  render() {
    return (
      <div className="center-align" style={{ marginTop: '100px' }}>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { admins } = state;
  return { admins };
}

export default {
  component: connect(mapStateToProps, {
    fetchAdmins
  })(requireAuth(AdminsListPage)),
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
