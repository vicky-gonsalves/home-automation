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
import { adminUserActions } from '../../_actions';
import { AdminUserContext } from '../../_contexts/admin-user/AdminUserContext.provider';
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

const UserViewer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminUserContext = useContext(AdminUserContext);
  const adminUser = adminUserContext.adminUser;
  const params = useParams();
  const HAS_ID = params && params.hasOwnProperty('id');
  const userId = HAS_ID ? params.id : null;
  const pageTitle = 'View User';

  useEffect(() => {
    const getUser = () => {
      if (userId && !adminUser.fetchedEditableUser) {
        dispatch(adminUserActions.getUser(userId));
      }
    };

    getUser();
  }, [adminUser.fetchedEditableUser, dispatch, userId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root} data-test="userViewerComponent">
        <Container maxWidth={'xl'} disableGutters={true}>
          <Paper elevation={2} className={classes.paper} data-test="userViewerPaperComponent">
            <PageToolbar title={pageTitle} data-test="userViewerToolbarComponent" />
            {adminUser.userInProgress && <EditorSkeleton />}
            {!adminUser.userInProgress && adminUser.user && adminUser.user.id && (
              <Grid container className={classes.root}>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Name</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.name}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Email</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.email}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Role</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.role}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} xl={6} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Status</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.isDisabled ? 'Not Active' : 'Active'}</div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Created At</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{moment(adminUser.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Created By</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.createdBy || 'System'}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Last Updated At</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{moment(adminUser.user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} className={classes.info}>
                    <Typography variant="subtitle2" display="block" gutterBottom>
                      <div>Last Updated By</div>
                    </Typography>
                    <Typography variant="subtitle1" display="block" gutterBottom>
                      <div>{adminUser.user.updatedBy || 'System'}</div>
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

UserViewer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default UserViewer;
