import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUserActions } from '../../_actions';
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
  title: {
    flex: '1 1 100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const UserList = ({ isLoggedIn, isConnected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminUser = useSelector(state => state.adminUser);
  const list = adminUser.users;
  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        {
          id: 'view',
          component: (
            <ViewButton
              callback={() => {
                // eslint-disable-next-line no-console
                console.log('View Button');
              }}
            />
          ),
        },
        {
          id: 'edit',
          component: (
            <EditButton
              callback={() => {
                // eslint-disable-next-line no-console
                console.log('Edit Button');
              }}
            />
          ),
        },
        {
          id: 'delete',
          component: (
            <DeleteButton
              callback={() => {
                // eslint-disable-next-line no-console
                console.log('Delete Button');
              }}
            />
          ),
        },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'email', width: 300 },
    { id: 'role', sort: true, search: true, align: 'left', label: 'Role', type: 'text', width: 300 },
    { id: 'isDisabled', sort: true, search: true, align: 'left', label: 'Disabled?', type: 'boolean', width: 300 },
    { id: 'createdAt', sort: true, search: true, align: 'right', label: 'created at', type: 'datetime', width: 300 },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, orderBy, order, limit, page, searchFilter) => {
      const fetchList = (_isLoggedIn, _isConnected, orderBy, order, limit, page, searchFilter) => {
        if (_isLoggedIn && _isConnected) {
          const sortBy = `${orderBy}:${order}`;
          dispatch(adminUserActions.getUsers({ sortBy, limit, page: page + 1, ...searchFilter }));
        }
      };
      fetchList(isLoggedIn, isConnected, orderBy, order, limit, page, searchFilter);
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Users
            </Typography>
          </Toolbar>
          <ListTable
            tableHeaders={tableHeaders}
            count={adminUser.count}
            list={list}
            getList={getList}
            isLoggedIn={isLoggedIn}
            isConnected={isConnected}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default UserList;
