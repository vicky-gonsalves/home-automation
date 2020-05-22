import React from 'react';
import DeviceContextProvider from '../../../_contexts/device/DeviceContext.provider';
import SocketIdContextProvider from '../../../_contexts/socket-id/SocketIdContext.provider';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout() {
  return (
    <React.Fragment>
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
