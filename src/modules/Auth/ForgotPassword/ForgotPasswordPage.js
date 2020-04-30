import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { siteSettingActions } from '../../../_actions';
import { adminDrawerActions } from '../../../_actions/admin-drawer/adminDrawer.actions';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const adminDrawer = useSelector(state => state.adminDrawer);
  const siteSettings = useSelector(state => state.siteSetting);
  const [renderLayout, setRenderLayout] = useState(false);

  const init = useCallback(() => {
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

    /*Prevent from re-rendering*/
    if (!renderLayout) {
      setRenderLayout(true);
    }
    hideBurger();
    hideAdminDrawer();
  }, [renderLayout, dispatch, adminDrawer, siteSettings]);

  useEffect(() => {
    init();
  }, [init]);

  const renderForgotPasswordLayout = () => {
    if (renderLayout) {
      return <div data-test="forgotPasswordPageContainer">Forgot Password Page Works</div>;
    }
    return null;
  };

  return renderForgotPasswordLayout();
};

ForgotPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ForgotPasswordPage;
