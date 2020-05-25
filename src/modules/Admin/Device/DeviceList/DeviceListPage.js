import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import DeviceList from '../../../../_components/device-list/deviceList';
import AdminDeviceContextProvider from '../../../../_contexts/admin-device/AdminDeviceContext.provider';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const DeviceListPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = (
    <AdminDeviceContextProvider>
      <DeviceList data-test="deviceListPageComponent" />
    </AdminDeviceContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForDeviceList"
      />
    );
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

DeviceListPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DeviceListPage;
