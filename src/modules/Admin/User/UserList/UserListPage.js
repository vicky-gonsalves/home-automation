import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserList from '../../../../_components/user-list/userList';

const UserListPage = () => {
  const currentUser = useSelector(state => state.user);
  const isConnected = useSelector(state => state.socket && state.socket.connected);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const innerComponent = <UserList isLoggedIn={isLoggedIn} isConnected={isConnected} />;
  return <AdminCommonLayout component={innerComponent} />;
};

UserListPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserListPage;
