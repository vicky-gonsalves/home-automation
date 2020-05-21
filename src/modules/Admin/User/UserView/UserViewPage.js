import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserViewer from '../../../../_components/user-viewer/userViewer';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const UserViewPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = <UserViewer data-test="userViewPageContainer" />;

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
