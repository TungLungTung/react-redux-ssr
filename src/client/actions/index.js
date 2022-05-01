import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
/// Receive axios instance from client.js, axiosIntance, name it api
/// This api argurment to get access to API
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users');

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};
