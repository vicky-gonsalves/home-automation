import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../../config';
import AdminDrawer from '../../admin-drawer/adminDrawer';
import Footer from '../../footer';
import Navbar from '../../navbar/navbar';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout({ isAdmin, isLoggedIn }) {
  const adminDrawer = useSelector(state => state.adminDrawer);

  const renderDrawer = () => {
    if (adminDrawer.show) {
      return <AdminDrawer data-test="adminDrawerComponent" />;
    }
  };

  return (
    <React.Fragment>
      <Navbar appName={config.appName} showBurgerIcon={true} data-test="navbarComponent" />
      {renderDrawer()}
      <HomeLayout isLoggedIn={isLoggedIn} />
      <AdminLayout isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
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
