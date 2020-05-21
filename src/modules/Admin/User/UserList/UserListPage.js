import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserList from '../../../../_components/user-list/userList';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';
import { UserContext } from '../../../../_contexts/user/UserContext.provider';

const UserListPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);
  const userContext = useContext(UserContext);

  const innerComponent = (
    <UserList isLoggedIn={userContext.isLoggedIn} isConnected={userContext.connected} data-test="userListPageComponent" />
  );

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForUserList"
      />
    );
  };

  return renderAdminCommonLayoutComp(innerComponent);
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
