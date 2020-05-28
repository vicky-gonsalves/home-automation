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
import { adminSubDeviceActions } from '../../_actions';
import AdminSubDeviceParamContextProvider from '../../_contexts/admin-sub-device-param/AdminSubDeviceParamContext.provider';
import { AdminSubDeviceContext } from '../../_contexts/admin-sub-device/AdminSubDeviceContext.provider';
import EditorSkeleton from '../editor-skeleton/EditorSkeleton';
import PageToolbar from '../page-toolbar/PageToolbar';
import SubDeviceParamList from '../sub-device-param-list/subDeviceParamList';

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

const SubDeviceViewer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminSubDeviceContext = useContext(AdminSubDeviceContext);
  const adminSubDevice = adminSubDeviceContext.adminSubDevice;
  const params = useParams();
  const HAS_ID = params && params.hasOwnProperty('id');
  const HAS_SUB_DEVICE_ID = params && params.hasOwnProperty('subDeviceId');
  const deviceId = HAS_ID ? params.id : null;
  const subDeviceId = HAS_SUB_DEVICE_ID ? params.subDeviceId : null;
  const pageTitle = 'View Sub Device';

  useEffect(() => {
    const getDevice = () => {
      if (deviceId && subDeviceId && !adminSubDevice.fetchedEditableDevice) {
        dispatch(adminSubDeviceActions.getSubDevice(deviceId, subDeviceId));
      }
    };

    getDevice();
  }, [adminSubDevice.fetchedEditableDevice, dispatch, deviceId, subDeviceId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root} data-test="subDeviceViewerComponent">
        <Container maxWidth={'xl'} disableGutters={true}>
          <Paper elevation={2} className={classes.paper} data-test="subDeviceViewerPaperComponent">
            <PageToolbar title={pageTitle} data-test="subDeviceViewerToolbarComponent" />
            {adminSubDevice.deviceInProgress && <EditorSkeleton />}
            {!adminSubDevice.deviceInProgress && adminSubDevice.subDevice && adminSubDevice.subDevice.id && (
              <React.Fragment>
                <Grid container className={classes.root}>
                  <Grid item xs={12} md={6}>
                    <Grid item xs={12} xl={6} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Name</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.name}</div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} xl={6} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>SubDevice Id</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.subDeviceId}</div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} xl={6} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Device Id</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.deviceId}</div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} xl={6} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Type</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.type}</div>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} xl={6} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Status</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.isDisabled ? 'Not Active' : 'Active'}</div>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid item xs={12} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Created At</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{moment(adminSubDevice.subDevice.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Created By</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.createdBy || 'System'}</div>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Last Updated At</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{moment(adminSubDevice.subDevice.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                      </Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.info}>
                      <Typography variant="subtitle2" display="block" gutterBottom>
                        <div>Last Updated By</div>
                      </Typography>
                      <Typography variant="subtitle1" display="block" gutterBottom>
                        <div>{adminSubDevice.subDevice.updatedBy || 'System'}</div>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <AdminSubDeviceParamContextProvider>
                  <SubDeviceParamList subDeviceId={subDeviceId} deviceId={deviceId} />
                </AdminSubDeviceParamContextProvider>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};

SubDeviceViewer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default SubDeviceViewer;
