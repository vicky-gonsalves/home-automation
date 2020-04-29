import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router';
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

const UserEditor = ({ isLoggedIn, isConnected }) => {
  const classes = useStyles();
  const params = useParams();
  const IS_EDIT = params && params.hasOwnProperty('id');
  const pageTitle = IS_EDIT ? 'Edit User' : 'Add New User';
  return (
    <React.Fragment>
      <div className={classes.root} data-test="userEditorComponent">
        <Paper className={classes.paper} data-test="userEditorPaperComponent">
          <PageToolbar title={pageTitle} data-test="userEditorToolbarComponent" />
        </Paper>
      </div>
    </React.Fragment>
  );
};

UserEditor.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default UserEditor;
