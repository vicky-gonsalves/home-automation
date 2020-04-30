import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { adminUserActions } from '../../_actions';
import EditorSkeleton from '../editor-skeleton/EditorSkeleton';
import UserForm from '../forms/user-form/UserForm';
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

const UserEditor = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [renderUserEditorForm, setRenderUserEditorForm] = useState(false);
  const adminUser = useSelector(state => state.adminUser);
  const params = useParams();
  const IS_EDIT = params && params.hasOwnProperty('id');
  const userId = IS_EDIT ? params.id : null;
  const pageTitle = IS_EDIT ? 'Edit User' : 'Add New User';
  const submitButtonTitle = IS_EDIT ? 'Save User' : 'Add User';

  const submitUser = useCallback(
    values => {
      if (userId) {
        dispatch(adminUserActions.updateUser(values, userId));
      } else {
        dispatch(adminUserActions.addUser(values));
      }
    },
    [dispatch, userId]
  );

  useEffect(() => {
    const getUser = () => {
      if (IS_EDIT) {
        if (userId && !adminUser.fetchedEditableUser) {
          dispatch(adminUserActions.getUser(userId));
        }
        if (userId && !renderUserEditorForm && adminUser.fetchedEditableUser && !adminUser.userInProgress) {
          setRenderUserEditorForm(true);
        }
      } else {
        setRenderUserEditorForm(true);
      }
    };

    getUser();
  }, [IS_EDIT, dispatch, userId, adminUser.fetchedEditableUser, adminUser.userInProgress, renderUserEditorForm]);

  return (
    <React.Fragment>
      <div className={classes.root} data-test="userEditorComponent">
        <Container maxWidth={'xl'} disableGutters={true}>
          <Paper elevation={2} className={classes.paper} data-test="userEditorPaperComponent">
            <PageToolbar title={pageTitle} data-test="userEditorToolbarComponent" />
            {renderUserEditorForm && (
              <UserForm
                handleSubmit={submitUser}
                submitButtonTitle={submitButtonTitle}
                isFetching={adminUser.userInProgress}
                user={adminUser.user}
                isEdit={IS_EDIT}
                data-test="userFormComponent"
              />
            )}
            {!renderUserEditorForm && <EditorSkeleton />}
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
};

UserEditor.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default UserEditor;
