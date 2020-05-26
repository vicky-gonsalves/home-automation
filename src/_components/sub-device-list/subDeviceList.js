import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminSubDeviceActions, editorDialogActions } from '../../_actions';
import { AdminSubDeviceContext } from '../../_contexts/admin-sub-device/AdminSubDeviceContext.provider';
import EditorDialogContextProvider from '../../_contexts/editor-dialog/EditorDialogContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import AddButton from '../buttons/add-button/addButton';
import DeleteButton from '../buttons/delete-button/deleteButton';
import EditButton from '../buttons/edit-button/editButton';
import ViewButton from '../buttons/view-button/viewButton';
import EditorDialog from '../dialogs/editor-dialog/editorDialog';
import { SubDeviceForm } from '../forms/sub-device-form/SubDeviceForm';
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

const SubDeviceList = ({ deviceId, variant }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const adminSubDeviceContext = useContext(AdminSubDeviceContext);
  const adminSubDevice = adminSubDeviceContext.adminSubDevice;
  const subDevice = adminSubDevice.subDevice;
  const list = adminSubDevice.subDevices;
  const isFetching = adminSubDevice.isFetchingSubDevicesList || adminSubDevice.subDeviceInProgress || !userContext.connected;
  const [isEdit, setIsEdit] = useState(false);

  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        {
          id: 'view',
          component: ViewButton,
          path: `/devices/${deviceId}/sub-devices/view/`,
          buttonType: 'view',
        },
        {
          id: 'edit',
          component: EditButton,
          callback: subDevice => {
            setIsEdit(true);
            dispatch(adminSubDeviceActions.getSubDevice(subDevice.deviceId, subDevice.subDeviceId)).then(() =>
              dispatch(editorDialogActions.open())
            );
          },
          buttonType: 'edit',
        },
        { id: 'delete', component: DeleteButton, buttonType: 'delete' },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'subDeviceId', sort: true, search: true, align: 'left', label: 'Sub Device Id', type: 'text', width: 300 },
    {
      id: 'type',
      sort: true,
      search: false,
      align: 'left',
      label: 'Type',
      type: 'select',
      options: ['motorSwitch', 'switch', 'camera'],
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
      title: 'Add Sub Device',
      type: 'subDevice',
      component: AddButton,
      callback: () => {
        dispatch(editorDialogActions.open());
      },
      buttonType: 'add',
      width: 180,
    },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        if (isLoggedIn && isConnected) {
          dispatch(adminSubDeviceActions.getSubDevices(deviceId, { sortBy, limit, page, ...searchFilter }));
        }
      };
      fetchList();
    },
    [deviceId, dispatch]
  );

  const onEditorDialogExited = useCallback(() => {
    setIsEdit(false);
    dispatch(editorDialogActions.close());
    adminSubDeviceActions.clearSubDevice(dispatch); // Cleanup
  }, [dispatch]);

  const addSubDevice = useCallback(
    values => {
      let action = adminSubDeviceActions.addSubDevice(values, deviceId);
      if (isEdit) {
        action = adminSubDeviceActions.updateSubDevice(values, deviceId, adminSubDevice.subDevice.subDeviceId);
      }
      dispatch(action).then(() =>
        dispatch(adminSubDeviceActions.getSubDevices(deviceId, { sortBy: 'createdAt:desc', limit: 10, page: 1 })).then(() =>
          onEditorDialogExited()
        )
      );
    },
    [deviceId, isEdit, dispatch, adminSubDevice.subDevice.subDeviceId, onEditorDialogExited]
  );

  const deleteSubDevice = useCallback(
    subDeviceId => {
      dispatch(adminSubDeviceActions.deleteSubDevice(deviceId, subDeviceId)).then(() =>
        dispatch(adminSubDeviceActions.getSubDevices(deviceId, { sortBy: 'createdAt:desc', limit: 10, page: 1 }))
      );
    },
    [deviceId, dispatch]
  );

  const renderList = useMemo(() => {
    return (
      <ListTable
        type="subDevice"
        title="Sub Devices"
        tableHeaders={tableHeaders}
        count={adminSubDevice.count}
        list={list}
        getList={getList}
        isLoggedIn={userContext.isLoggedIn}
        isConnected={userContext.connected}
        isFetching={isFetching}
        buttons={buttons}
        initialSort={{ order: 'desc', orderBy: 'createdAt' }}
        data-test="listTableComponent"
        preDeleteCallback={adminSubDeviceActions.setSubDeviceToBeDeleted}
        postDeleteCallback={deleteSubDevice}
        cancelDeleteCallback={adminSubDeviceActions.unsetSubDeviceToBeDeleted}
        useKey={'subDeviceId'}
      />
    );
  }, [
    adminSubDevice.count,
    buttons,
    deleteSubDevice,
    getList,
    isFetching,
    list,
    tableHeaders,
    userContext.connected,
    userContext.isLoggedIn,
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
          Component={SubDeviceForm}
          title={isEdit ? 'Edit Sub-Device' : 'Add New Sub-Device'}
          isEdit={isEdit}
          isFetching={isFetching}
          handleSubmit={addSubDevice}
          submitButtonTitle={isEdit ? 'Save' : 'Add'}
          params={{ ...subDevice, variant }}
          data-test="editorDialogComponent"
          onExited={onEditorDialogExited}
        />
      </EditorDialogContextProvider>
    </React.Fragment>
  );
};

SubDeviceList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
  deviceId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default SubDeviceList;
