import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import DashboardPage from '../../../modules/Admin/Dashboard/DashboardPage';
import UserEditorPage from '../../../modules/Admin/User/UserEditor/UserEditorPage';
import UserListPage from '../../../modules/Admin/User/UserList/UserListPage';

function AdminLayout({ isAdmin, isLoggedIn }) {
  const adminLayoutPath = ['/admin', '/users', '/users/new'];
  const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn && isAdmin === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return (
    <React.Fragment>
      <AdminRoute exact path={adminLayoutPath[0]} component={DashboardPage} />
      <AdminRoute exact path={adminLayoutPath[1]} component={UserListPage} />
      <AdminRoute exact path={adminLayoutPath[2]} component={UserEditorPage} />
    </React.Fragment>
  );
}

AdminLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AdminLayout;
