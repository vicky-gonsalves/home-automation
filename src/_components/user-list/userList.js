import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminUserActions } from '../../_actions';
import { AdminUserContext } from '../../_contexts/admin-user/AdminUserContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import AddButton from '../buttons/add-button/addButton';
import DeleteButton from '../buttons/delete-button/deleteButton';
import EditButton from '../buttons/edit-button/editButton';
import ViewButton from '../buttons/view-button/viewButton';
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
  const list = adminUser.users;
  const isFetching = adminUser.isFetchingUsersList || !userContext.connected;

  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        { id: 'view', component: ViewButton, path: '/users/view/', buttonType: 'view' },
        { id: 'edit', component: EditButton, path: '/users/edit/', buttonType: 'edit' },
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

  const buttons = [{ title: 'Add User', type: 'user', component: AddButton, path: '/users/new', buttonType: 'add' }];

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
        postDeleteCallback={adminUserActions.deleteUser}
        cancelDeleteCallback={adminUserActions.unsetUserToBeDeleted}
      />
    );
  }, [
    adminUser.count,
    buttons,
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
