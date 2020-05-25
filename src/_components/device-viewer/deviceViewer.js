import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { adminDeviceActions } from '../../_actions';
import { AdminDeviceContext } from '../../_contexts/admin-device/AdminDeviceContext.provider';
import EditorSkeleton from '../editor-skeleton/EditorSkeleton';
import PageToolbar from '../page-toolbar/PageToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(2),
  },
}));

const DeviceViewer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminDeviceContext = useContext(AdminDeviceContext);
  const adminDevice = adminDeviceContext.adminDevice;
  const params = useParams();
  const HAS_ID = params && params.hasOwnProperty('id');
  const deviceId = HAS_ID ? params.id : null;
  const pageTitle = 'View Device';

  useEffect(() => {
    const getDevice = () => {
      if (deviceId && !adminDevice.fetchedEditableDevice) {
        dispatch(adminDeviceActions.getDevice(deviceId));
      }
    };

    getDevice();
  }, [adminDevice.fetchedEditableDevice, dispatch, deviceId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root} data-test="deviceViewerComponent">
        <Container maxWidth={'xl'} disableGutters={true}>
          <Paper elevation={2} className={classes.paper} data-test="deviceViewerPaperComponent">
            <PageToolbar title={pageTitle} data-test="deviceViewerToolbarComponent" />
            {adminDevice.deviceInProgress && <EditorSkeleton />}
            {!adminDevice.deviceInProgress && adminDevice.device && adminDevice.device.id && (
              <Grid container className={classes.root}>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Name</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.name}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Device Id</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.deviceId}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Type</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.type}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Variant</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.variant}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Status</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.isDisabled ? 'Not Active' : 'Active'}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Device Owner</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.deviceOwner}</div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Created At</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{moment(adminDevice.device.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Created By</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.createdBy || 'System'}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Last Updated At</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{moment(adminDevice.device.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Last Updated By</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminDevice.device.updatedBy || 'System'}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Registered At</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>
                        {adminDevice.device.registeredAt
                          ? moment(adminDevice.device.registeredAt).format('MMMM Do YYYY, h:mm:ss a')
                          : 'Not Registered'}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};

DeviceViewer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default DeviceViewer;
