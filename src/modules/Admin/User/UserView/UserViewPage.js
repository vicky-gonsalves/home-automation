import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserViewer from '../../../../_components/user-viewer/userViewer';
import AdminUserContextProvider from '../../../../_contexts/admin-user/AdminUserContext.provider';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const UserViewPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = (
    <AdminUserContextProvider>
      <UserViewer data-test="userViewPageContainer" />
    </AdminUserContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForUserViewer"
      />
    );
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

export default UserViewPage;
