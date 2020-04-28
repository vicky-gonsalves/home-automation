import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../_actions';
import { adminDrawerActions } from '../../../_actions/admin-drawer/adminDrawer.actions';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  useEffect(() => {
    const hideAdminDrawer = () => {
      if (adminDrawer.show) {
        dispatch(adminDrawerActions.hide());
      }
    };
    const hideBurger = () => {
      if (siteSettings && siteSettings.burger) {
        dispatch(siteSettingActions.hideBurger());
      }
    };
    hideBurger();
    hideAdminDrawer();
  }, [dispatch, adminDrawer, siteSettings]);
  return <div data-test="forgotPasswordPageContainer">Forgot Password Page Works</div>;
};

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ForgotPasswordPage;
