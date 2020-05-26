import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import SubDeviceViewer from '../../../../_components/sub-device-viewer/subDeviceViewer';
import AdminSubDeviceContextProvider from '../../../../_contexts/admin-sub-device/AdminSubDeviceContext.provider';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const SubDeviceViewPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = (
    <AdminSubDeviceContextProvider>
      <SubDeviceViewer data-test="subDeviceViewPageContainer" />
    </AdminSubDeviceContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForSubDeviceViewer"
      />
    );
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

export default SubDeviceViewPage;
