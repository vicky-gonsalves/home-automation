import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminDeviceActions } from '../../_actions';
import { AdminDeviceContext } from '../../_contexts/admin-device/AdminDeviceContext.provider';
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

const DeviceList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const adminDeviceContext = useContext(AdminDeviceContext);
  const adminDevice = adminDeviceContext.adminDevice;
  const list = adminDevice.devices;
  const isFetching = adminDevice.isFetchingDevicesList || !userContext.connected;

  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        { id: 'view', component: ViewButton, path: '/devices/view/', buttonType: 'view', useKey: 'deviceId' },
        { id: 'edit', component: EditButton, path: '/devices/edit/', buttonType: 'edit', useKey: 'deviceId' },
        { id: 'delete', component: DeleteButton, buttonType: 'delete', useKey: 'deviceId' },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'deviceId', sort: true, search: true, align: 'left', label: 'Device Id', type: 'text', width: 300 },
    { id: 'deviceOwner', sort: true, search: true, align: 'left', label: 'Device Owner', type: 'email', width: 300 },
    {
      id: 'type',
      sort: true,
      search: true,
      align: 'left',
      label: 'Type',
      type: 'select',
      options: ['arduino', 'raspberrypi', 'nodeMCU'],
      width: 250,
    },
    {
      id: 'variant',
      sort: true,
      search: true,
      align: 'left',
      label: 'Variant',
      type: 'select',
      options: ['tank', 'smartSwitch'],
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
    { title: 'Add Device', type: 'device', component: AddButton, path: '/devices/new', buttonType: 'add', width: 150 },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        if (isLoggedIn && isConnected) {
          dispatch(adminDeviceActions.getDevices({ sortBy, limit, page, ...searchFilter }));
        }
      };
      fetchList();
    },
    [dispatch]
  );

  const renderList = useMemo(() => {
    return (
      <ListTable
        type="device"
        title="Devices"
        tableHeaders={tableHeaders}
        count={adminDevice.count}
        list={list}
        getList={getList}
        isLoggedIn={userContext.isLoggedIn}
        isConnected={userContext.connected}
        isFetching={isFetching}
        buttons={buttons}
        initialSort={{ order: 'desc', orderBy: 'createdAt' }}
        data-test="listTableComponent"
        preDeleteCallback={adminDeviceActions.setDeviceToBeDeleted}
        postDeleteCallback={adminDeviceActions.deleteDevice}
        cancelDeleteCallback={adminDeviceActions.unsetDeviceToBeDeleted}
        useKey={'deviceId'}
      />
    );
  }, [adminDevice.count, buttons, getList, isFetching, list, tableHeaders, userContext.connected, userContext.isLoggedIn]);

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

DeviceList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
};

export default DeviceList;
