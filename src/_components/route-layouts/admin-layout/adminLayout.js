import React, { useContext, useLayoutEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { Route } from 'react-router-dom';
import { adminUserActions, adminDeviceActions } from '../../../_actions';
import { UserContext } from '../../../_contexts/user/UserContext.provider';
import LazyLoader from '../../lazy-loader/LazyLoader';

const UserListPage = React.lazy(() => import('../../../modules/Admin/User/UserList/UserListPage'));
const UserViewPage = React.lazy(() => import('../../../modules/Admin/User/UserView/UserViewPage'));
const UserEditorPage = React.lazy(() => import('../../../modules/Admin/User/UserEditor/UserEditorPage'));
const DashboardPage = React.lazy(() => import('../../../modules/Admin/Dashboard/DashboardPage'));
const DeviceListPage = React.lazy(() => import('../../../modules/Admin/Device/DeviceList/DeviceListPage'));
const DeviceViewPage = React.lazy(() => import('../../../modules/Admin/Device/DeviceView/DeviceViewPage'));
const DeviceEditorPage = React.lazy(() => import('../../../modules/Admin/Device/DeviceEditor/DeviceEditorPage'));

function AdminLayout() {
  const userContext = useContext(UserContext);
  const adminLayoutPath = ['/admin', '/users', '/users/new', '/users/edit/:id', '/users/view/:id'];
  const deviceLayoutPath = ['/devices', '/devices/new', '/devices/edit/:id', '/devices/view/:id'];
  const location = useLocation();
  const dispatch = useDispatch();

  const AdminRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          userContext.isLoggedIn && userContext.isAdmin === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  const renderAdminRoutes = useMemo(() => {
    return (
      <React.Fragment>
        <AdminRoute exact path={adminLayoutPath[0]} component={LazyLoader(DashboardPage)} />
        <AdminRoute exact path={adminLayoutPath[1]} component={LazyLoader(UserListPage)} />
        <AdminRoute exact path={adminLayoutPath[2]} component={LazyLoader(UserEditorPage)} />
        <AdminRoute exact path={adminLayoutPath[3]} component={LazyLoader(UserEditorPage)} />
        <AdminRoute exact path={adminLayoutPath[4]} component={LazyLoader(UserViewPage)} />

        <AdminRoute exact path={deviceLayoutPath[0]} component={LazyLoader(DeviceListPage)} />
        <AdminRoute exact path={deviceLayoutPath[1]} component={LazyLoader(DeviceEditorPage)} />
        <AdminRoute exact path={deviceLayoutPath[2]} component={LazyLoader(DeviceEditorPage)} />
        <AdminRoute exact path={deviceLayoutPath[3]} component={LazyLoader(DeviceViewPage)} />
      </React.Fragment>
    );
  }, [adminLayoutPath, deviceLayoutPath]);

  useLayoutEffect(() => {
    adminUserActions.clearUser(dispatch); // Cleanup
    adminDeviceActions.clearDevice(dispatch); // Cleanup
  }, [dispatch, location]);

  return <React.Fragment>{renderAdminRoutes}</React.Fragment>;
}

AdminLayout.propTypes = {};

export default AdminLayout;
