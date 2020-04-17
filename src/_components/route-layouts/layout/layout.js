import PropTypes from 'prop-types';
import React from 'react';
import AdminLayout from '../admin-layout/adminLayout';
import AuthLayout from '../auth-layout/authLayout';
import HomeLayout from '../home-layout/homeLayout';

function Layout({ isAdmin, isLoggedIn }) {
  return (
    <React.Fragment>
      <HomeLayout isLoggedIn={isLoggedIn} />
      <AdminLayout isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      <AuthLayout />
    </React.Fragment>
  );
}

Layout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Layout;
