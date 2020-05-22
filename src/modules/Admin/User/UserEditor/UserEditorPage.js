import PropTypes from 'prop-types';
import React from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import UserEditor from '../../../../_components/user-editor/userEditor';
import AdminUserContextProvider from '../../../../_contexts/admin-user/AdminUserContext.provider';

const UserEditorPage = () => {
  const innerComponent = (
    <AdminUserContextProvider>
      <UserEditor data-test="userEditorPageContainer" />
    </AdminUserContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return <AdminCommonLayout component={component} data-test="adminPageContainerForUserEditor" />;
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
