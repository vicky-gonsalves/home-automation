import PropTypes from 'prop-types';
import React from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';

const UserEditorPage = () => {
  const UserEditorComponent = <div data-test="userEditorPageContainer">User Editor Page</div>;
  return <AdminCommonLayout component={UserEditorComponent} />;
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
