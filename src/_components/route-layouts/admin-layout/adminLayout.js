import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import LazyLoader from '../../lazy-loader/LazyLoader';

const UserListPage = React.lazy(() => import('../../../modules/Admin/User/UserList/UserListPage'));
const UserEditorPage = React.lazy(() => import('../../../modules/Admin/User/UserEditor/UserEditorPage'));
const DashboardPage = React.lazy(() => import('../../../modules/Admin/Dashboard/DashboardPage'));

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
      <AdminRoute exact path={adminLayoutPath[0]} component={LazyLoader(DashboardPage)} />
      <AdminRoute exact path={adminLayoutPath[1]} component={LazyLoader(UserListPage)} />
      <AdminRoute exact path={adminLayoutPath[2]} component={LazyLoader(UserEditorPage)} />
    </React.Fragment>
  );
}

AdminLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AdminLayout;
