import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../_actions';
import { adminDrawerActions } from '../../../_actions/admin-drawer/adminDrawer.actions';
import AdminCommonLayout from '../../../_components/admin-common-layout/AdminCommonLayout';

const DashboardPage = () => {
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const [renderAdminCommonLayout, setRenderAdminCommonLayout] = useState(false);

  const dispatch = useDispatch();

  const init = useCallback(() => {
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

    /*Prevent from re-rendering*/
    if (!renderAdminCommonLayout) {
      setRenderAdminCommonLayout(true);
    }
    showBurger();
    showAdminDrawer();
  }, [adminDrawer, dispatch, renderAdminCommonLayout, siteSettings]);

  useEffect(() => {
    init();
  }, [init]);

  const innerComponent = <div data-test="dashboardPageContainer">Dashboard Page</div>;

  const renderAdminCommonLayoutComp = component => {
    if (component && typeof component === 'object' && renderAdminCommonLayout) {
      return (
        <AdminCommonLayout component={component} drawerOpen={adminDrawer.open} data-test="adminPageContainerForDashboard" />
      );
    }
    return null;
  };

  return renderAdminCommonLayoutComp(innerComponent);
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
