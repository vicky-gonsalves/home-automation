import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { adminDeviceActions } from '../../_actions';
import { AdminDeviceContext } from '../../_contexts/admin-device/AdminDeviceContext.provider';
import EditorSkeleton from '../editor-skeleton/EditorSkeleton';
import DeviceForm from '../forms/device-form/DeviceForm';
import PageToolbar from '../page-toolbar/PageToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const DeviceEditor = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [renderDeviceEditorForm, setRenderDeviceEditorForm] = useState(false);
  const adminDeviceContext = useContext(AdminDeviceContext);
  const adminDevice = adminDeviceContext.adminDevice;
  const params = useParams();
  const IS_EDIT = params && params.hasOwnProperty('id');
  const deviceId = IS_EDIT ? params.id : null;
  const pageTitle = IS_EDIT ? 'Edit Device' : 'Add New Device';
  const submitButtonTitle = IS_EDIT ? 'Save Device' : 'Add Device';

  const submitDevice = useCallback(
    values => {
      if (deviceId) {
        dispatch(adminDeviceActions.updateDevice(values, deviceId));
      } else {
        dispatch(adminDeviceActions.addDevice(values));
      }
    },
    [dispatch, deviceId]
  );

  useEffect(() => {
    const getDevice = () => {
      if (IS_EDIT) {
        if (deviceId && !adminDevice.fetchedEditableDevice) {
          dispatch(adminDeviceActions.getDevice(deviceId));
        }
        if (deviceId && !renderDeviceEditorForm && adminDevice.fetchedEditableDevice && !adminDevice.deviceInProgress) {
          setRenderDeviceEditorForm(true);
        }
      } else {
        setRenderDeviceEditorForm(true);
      }
    };

    getDevice();
  }, [IS_EDIT, dispatch, deviceId, adminDevice.fetchedEditableDevice, adminDevice.deviceInProgress, renderDeviceEditorForm]);

  return (
    <React.Fragment>
      <div className={classes.root} data-test="deviceEditorComponent">
        <Container maxWidth={'xl'} disableGutters={true}>
          <Paper elevation={2} className={classes.paper} data-test="deviceEditorPaperComponent">
            <PageToolbar title={pageTitle} data-test="deviceEditorToolbarComponent" />
            {renderDeviceEditorForm && (
              <DeviceForm
                handleSubmit={submitDevice}
                submitButtonTitle={submitButtonTitle}
                isFetching={adminDevice.deviceInProgress}
                device={adminDevice.device}
                isEdit={IS_EDIT}
                data-test="deviceFormComponent"
              />
            )}
            {!renderDeviceEditorForm && <EditorSkeleton />}
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};

DeviceEditor.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default DeviceEditor;
