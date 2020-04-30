import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../../config';
import AdminDrawer from '../../admin-drawer/adminDrawer';
import Footer from '../../footer';
import Navbar from '../../navbar/navbar';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout({ isAdmin, isLoggedIn, connected }) {
  const adminDrawer = useSelector(state => state.adminDrawer);
  const [renderHomeLayout, setRenderHomeLayout] = useState(false);
  const [renderAdminLayout, setRenderAdminLayout] = useState(false);

  const renderDrawer = () => {
    if (adminDrawer.show) {
      return <AdminDrawer data-test="adminDrawerComponent" />;
    }
  };

  useEffect(() => {
    if (isLoggedIn && connected) {
      setRenderHomeLayout(true);
      if (isAdmin) {
        setRenderAdminLayout(true);
      }
    }
  }, [isLoggedIn, connected, isAdmin]);

  return (
    <React.Fragment>
      <Navbar appName={config.appName} showBurgerIcon={true} data-test="navbarComponent" />
      {(renderHomeLayout || renderAdminLayout) && renderDrawer()}
      {renderHomeLayout && <HomeLayout isLoggedIn={isLoggedIn} />}
      {renderAdminLayout && <AdminLayout isAdmin={isAdmin} isLoggedIn={isLoggedIn} />}
      <AuthLayout />
      <Footer appName={config.appName} data-test="footerComponent" />
    </React.Fragment>
  );
}

Layout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Layout;
