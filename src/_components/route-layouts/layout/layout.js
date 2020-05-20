import React, { useContext, useMemo } from 'react';
import DeviceContextProvider from '../../../_contexts/device/DeviceContext.provider';
import { SiteSettingContext } from '../../../_contexts/site-setting/SiteSettingContext.provider';
import SocketIdContextProvider from '../../../_contexts/socket-id/SocketIdContext.provider';
import AdminDrawer from '../../admin-drawer/adminDrawer';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout() {
  const siteSettingContext = useContext(SiteSettingContext);

  const showDrawer = useMemo(() => {
    if (siteSettingContext && siteSettingContext.drawer && siteSettingContext.drawer.show) {
      return <AdminDrawer data-test="adminDrawerComponent" />;
    }
  }, [siteSettingContext]);

  return (
    <React.Fragment>
      {showDrawer}
      <DeviceContextProvider>
        <SocketIdContextProvider>
          <HomeLayout />
          <AdminLayout />
        </SocketIdContextProvider>
      </DeviceContextProvider>
      <AuthLayout />
    </React.Fragment>
  );
}

Layout.propTypes = {};

export default Layout;
