import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../../_actions';
import { adminDrawerActions } from '../../../../_actions/admin-drawer/adminDrawer.actions';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserList from '../../../../_components/user-list/userList';

const UserListPage = () => {
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const currentUser = useSelector(state => state.user);
  const isConnected = useSelector(state => state.socket && state.socket.connected);
  const isLoggedIn = currentUser.isLoggedIn && currentUser.tokens !== null;
  const dispatch = useDispatch();
  useEffect(() => {
    const showAdminDrawer = () => {
      if (!adminDrawer.show) {
        dispatch(adminDrawerActions.show());
      }
    };
    const showBurger = () => {
      if (siteSettings && !siteSettings.burger) {
        dispatch(siteSettingActions.showBurger());
      }
    };
    showBurger();
    showAdminDrawer();
  }, [dispatch, adminDrawer, siteSettings]);

  const innerComponent = () => {
    if (isLoggedIn && isConnected) {
      return <UserList isLoggedIn={isLoggedIn} isConnected={isConnected} data-test="userListPageComponent" />;
    }
    return null;
  };

  const renderAdminCommonLayout = component => {
    if (component && typeof component === 'object') {
      return <AdminCommonLayout component={component} data-test="adminPageContainerForUserList" />;
    }
    return null;
  };

  return renderAdminCommonLayout(innerComponent());
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
