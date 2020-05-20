import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserEditor from '../../../../_components/user-editor/userEditor';
import { SiteSettingContext } from '../../../../_contexts/site-setting/SiteSettingContext.provider';

const UserEditorPage = () => {
  const siteSettingContext = useContext(SiteSettingContext);

  const innerComponent = <UserEditor data-test="userEditorPageContainer" />;

  const renderAdminCommonLayoutComp = component => {
    if (component && typeof component === 'object') {
      return (
        <AdminCommonLayout
          component={component}
          drawerOpen={siteSettingContext.drawer.open}
          data-test="adminPageContainerForUserEditor"
        />
      );
    }
    return null;
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

UserEditorPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default UserEditorPage;
