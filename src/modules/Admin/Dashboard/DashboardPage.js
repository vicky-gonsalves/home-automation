import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AdminCommonLayout from '../../../_components/admin-common-layout/AdminCommonLayout';
import { SiteSettingContext } from '../../../_contexts/site-setting/SiteSettingContext.provider';

const DashboardPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = <div data-test="dashboardPageContainer">Dashboard Page</div>;

  const renderAdminCommonLayoutComp = component => {
    return (
      <AdminCommonLayout
        component={component}
        drawerOpen={siteSettingContext.drawer.open}
        data-test="adminPageContainerForDashboard"
      />
    );
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
