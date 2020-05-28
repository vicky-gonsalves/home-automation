import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminUserActions, editorDialogActions } from '../../_actions';
import { AdminUserContext } from '../../_contexts/admin-user/AdminUserContext.provider';
import EditorDialogContextProvider from '../../_contexts/editor-dialog/EditorDialogContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import AddButton from '../buttons/add-button/addButton';
import DeleteButton from '../buttons/delete-button/deleteButton';
import EditButton from '../buttons/edit-button/editButton';
import ViewButton from '../buttons/view-button/viewButton';
import EditorDialog from '../dialogs/editor-dialog/editorDialog';
import UserForm from '../forms/user-form/UserForm';
import ListTable from '../tables/list-table/listTable';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const adminUserContext = useContext(AdminUserContext);
  const adminUser = adminUserContext.adminUser;
  const user = adminUser.user;
  const list = adminUser.users;
  const isFetching = adminUser.isFetchingUsersList || adminUser.userInProgress || !userContext.connected;
  const isEdit = useMemo(() => user && user.hasOwnProperty('id'), [user]);
  const editorDialog = 'user';

  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        { id: 'view', component: ViewButton, path: '/users/view/', buttonType: 'view' },
        {
          id: 'edit',
          component: EditButton,
          callback: user => {
            dispatch(adminUserActions.getUser(user.id)).then(() => dispatch(editorDialogActions.open(editorDialog)));
          },
          buttonType: 'edit',
        },
        { id: 'delete', component: DeleteButton, buttonType: 'delete' },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'email', width: 300 },
    {
      id: 'role',
      sort: true,
      search: true,
      align: 'left',
      label: 'Role',
      type: 'select',
      options: ['admin', 'user'],
      width: 250,
    },
    {
      id: 'isDisabled',
      sort: true,
      search: true,
      align: 'left',
      label: 'Disabled?',
      type: 'select',
      options: ['true', 'false'],
      width: 250,
    },
    { id: 'createdAt', sort: true, search: true, align: 'left', label: 'created at', type: 'datetime', width: 450 },
  ];

  const buttons = [
    {
      title: 'Add User',
      type: 'user',
      component: AddButton,
      callback: () => {
        dispatch(editorDialogActions.open(editorDialog));
      },
      buttonType: 'add',
    },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        if (isLoggedIn && isConnected) {
          dispatch(adminUserActions.getUsers({ sortBy, limit, page, ...searchFilter }));
        }
      };
      fetchList();
    },
    [dispatch]
  );

  const onEditorDialogExited = useCallback(() => {
    dispatch(adminUserActions.resetEditUserDialog());
  }, [dispatch]);

  const addUser = useCallback(
    values => {
      let action = adminUserActions.addUser(values);
      if (isEdit) {
        action = adminUserActions.updateUser(values, user.id);
      }
      dispatch(action);
    },
    [isEdit, dispatch, user.id]
  );

  const deleteUser = useCallback(
    userId => {
      dispatch(adminUserActions.deleteUser(userId));
    },
    [dispatch]
  );

  const renderList = useMemo(() => {
    return (
      <ListTable
        type="user"
        title="Users"
        tableHeaders={tableHeaders}
        count={adminUser.count}
        list={list}
        getList={getList}
        isLoggedIn={userContext.isLoggedIn}
        isConnected={userContext.connected}
        isFetching={isFetching}
        buttons={buttons}
        initialSort={{ order: 'desc', orderBy: 'createdAt' }}
        preventDeletion={{ email: userContext.user.email }}
        data-test="listTableComponent"
        preDeleteCallback={adminUserActions.setUserToBeDeleted}
        postDeleteCallback={deleteUser}
        cancelDeleteCallback={adminUserActions.unsetUserToBeDeleted}
        useKey={'id'}
      />
    );
  }, [
    adminUser.count,
    buttons,
    deleteUser,
    getList,
    isFetching,
    list,
    tableHeaders,
    userContext.connected,
    userContext.isLoggedIn,
    userContext.user.email,
  ]);

  return (
    <React.Fragment>
      <div className={classes.root} data-test="listTableContainer">
        <Paper className={classes.paper} data-test="paperComponent">
          {renderList}
        </Paper>
      </div>
      <EditorDialogContextProvider>
        <EditorDialog
          name={editorDialog}
          Component={UserForm}
          title={isEdit ? 'Edit User' : 'Add New User'}
          isEdit={isEdit}
          isFetching={isFetching}
          handleSubmit={addUser}
          submitButtonTitle={isEdit ? 'Save' : 'Add'}
          params={{ ...user }}
          data-test="editorDialogComponent"
          onExited={onEditorDialogExited}
        />
      </EditorDialogContextProvider>
    </React.Fragment>
  );
};

UserList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default UserList;
