import React, { useContext, useMemo } from 'react';
import DeviceContextProvider from '../../../_contexts/device/DeviceContext.provider';
import { SiteSettingContext } from '../../../_contexts/site-setting/SiteSettingContext.provider';
import { UserContext } from '../../../_contexts/user/UserContext.provider';
import AdminDrawer from '../../admin-drawer/adminDrawer';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout() {
  const userContext = useContext(UserContext);
  const siteSettingContext = useContext(SiteSettingContext);

  const isAuth = useMemo(() => {
    return (
      userContext.isLoggedIn &&
      userContext.connected &&
      userContext.token !== null &&
      userContext.isAuthorized &&
      !userContext.isSocketFetching
    );
  }, [
    userContext.connected,
    userContext.isAuthorized,
    userContext.isLoggedIn,
    userContext.isSocketFetching,
    userContext.token,
  ]);

  const isAdmin = useMemo(() => {
    return isAuth && userContext.isAdmin;
  }, [isAuth, userContext.isAdmin]);

  const renderAdminLayout = useMemo(() => {
    if (isAdmin) {
      return <AdminLayout />;
    }
  }, [isAdmin]);

  const renderHomeLayout = useMemo(() => {
    if (isAuth) {
      return <HomeLayout />;
    }
  }, [isAuth]);

  const renderAuthLayout = useMemo(() => {
    if (!userContext.token) {
      return <AuthLayout />;
    }
  }, [userContext.token]);

  const showDrawer = useMemo(() => {
    if (siteSettingContext && siteSettingContext.drawer && siteSettingContext.drawer.show) {
      return <AdminDrawer data-test="adminDrawerComponent" />;
    }
  }, [siteSettingContext]);

  return (
    <React.Fragment>
      {showDrawer}
      <DeviceContextProvider>
        {renderHomeLayout}
        {renderAdminLayout}
      </DeviceContextProvider>
      {renderAuthLayout}
    </React.Fragment>
  );
}

Layout.propTypes = {};

export default Layout;
