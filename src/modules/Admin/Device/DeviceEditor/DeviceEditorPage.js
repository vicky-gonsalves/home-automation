import PropTypes from 'prop-types';
import React from 'react';
import AdminCommonLayout from '../../../../_components/admin-common-layout/AdminCommonLayout';
import DeviceEditor from '../../../../_components/device-editor/deviceEditor';
import AdminDeviceContextProvider from '../../../../_contexts/admin-device/AdminDeviceContext.provider';
import AdminUserContextProvider from '../../../../_contexts/admin-user/AdminUserContext.provider';

const DeviceEditorPage = () => {
  const innerComponent = (
    <AdminDeviceContextProvider>
      <AdminUserContextProvider>
        <DeviceEditor data-test="deviceEditorPageContainer" />
      </AdminUserContextProvider>
    </AdminDeviceContextProvider>
  );

  const renderAdminCommonLayoutComp = component => {
    return <AdminCommonLayout component={component} data-test="adminPageContainerForDeviceEditor" />;
  };

  return renderAdminCommonLayoutComp(innerComponent);
};

DeviceEditorPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DeviceEditorPage;
