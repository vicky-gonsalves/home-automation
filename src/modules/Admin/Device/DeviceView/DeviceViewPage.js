import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import DeviceViewer from '../../../../_components/device-viewer/deviceViewer';
import AdminDeviceContextProvider from '../../../../_contexts/admin-device/AdminDeviceContext.provider';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const DeviceViewPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = (
    <AdminDeviceContextProvider>
      <DeviceViewer data-test="deviceViewPageContainer" />
    </AdminDeviceContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForDeviceViewer"
      />
    );
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

export default DeviceViewPage;
