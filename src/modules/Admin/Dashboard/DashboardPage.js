import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../_actions';
import { adminDrawerActions } from '../../../_actions/admin-drawer/adminDrawer.actions';
import AdminCommonLayout from '../../../_components/admin-common-layout/AdminCommonLayout';

const DashboardPage = () => {
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const dispatch = useDispatch();
  useEffect(() => {
    const showAdminDrawer = () => {
      if (adminDrawer && !adminDrawer.show) {
        dispatch(adminDrawerActions.show());
      }
    };
    const showBurger = () => {
      if (siteSettings && !siteSettings.burger) {
        dispatch(siteSettingActions.showBurger());
      }
    };
    showBurger();
    showAdminDrawer();
  }, [dispatch, adminDrawer, siteSettings]);

  const DashboardComponent = <div data-test="dashboardPageContainer">Dashboard Page</div>;
  return <AdminCommonLayout component={DashboardComponent} data-test="adminPageContainerForDashboard" />;
};

DashboardPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DashboardPage;
