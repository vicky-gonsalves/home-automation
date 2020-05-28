import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminSharedDeviceAccessActions, editorDialogActions } from '../../_actions';
import { AdminSharedDeviceAccessContext } from '../../_contexts/admin-shared-device-access/AdminSharedDeviceAccessContext.provider';
import AdminUserContextProvider from '../../_contexts/admin-user/AdminUserContext.provider';
import EditorDialogContextProvider from '../../_contexts/editor-dialog/EditorDialogContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import AddButton from '../buttons/add-button/addButton';
import DeleteButton from '../buttons/delete-button/deleteButton';
import EditButton from '../buttons/edit-button/editButton';
import EditorDialog from '../dialogs/editor-dialog/editorDialog';
import SharedDeviceAccessForm from '../forms/shared-device-access-form/SharedDeviceAccessForm';
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

const SharedDeviceAccessList = ({ deviceId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const adminSharedDeviceAccessContext = useContext(AdminSharedDeviceAccessContext);
  const sharedDeviceAccesses = adminSharedDeviceAccessContext.adminSharedDeviceAccesses;
  const sharedDeviceAccess = sharedDeviceAccesses.sharedDeviceAccess;
  const list = sharedDeviceAccesses.sharedDeviceAccesses;
  const isFetching =
    sharedDeviceAccesses.isFetchingSharedDeviceAccessList ||
    sharedDeviceAccesses.sharedDeviceAccessInProgress ||
    !userContext.connected;
  const isEdit = useMemo(() => sharedDeviceAccess && sharedDeviceAccess.hasOwnProperty('id'), [sharedDeviceAccess]);
  const editorDialog = 'sharedDeviceAccess';

  const tableHeaders = [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        {
          id: 'edit',
          component: EditButton,
          callback: sharedDeviceAccess => {
            dispatch(adminSharedDeviceAccessActions.getSharedDeviceAccess(sharedDeviceAccess.id)).then(() =>
              dispatch(editorDialogActions.open(editorDialog))
            );
          },
          buttonType: 'edit',
        },
        { id: 'delete', component: DeleteButton, buttonType: 'delete' },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'text', width: 300 },
    { id: 'sharedBy', sort: true, search: true, align: 'left', label: 'Shared By', type: 'text', width: 300 },

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
      title: 'Add Shared Device Access',
      type: 'sharedDeviceAccess',
      component: AddButton,
      callback: () => {
        dispatch(editorDialogActions.open(editorDialog));
      },
      buttonType: 'add',
      width: 270,
    },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        if (isLoggedIn && isConnected) {
          dispatch(
            adminSharedDeviceAccessActions.getSharedDeviceAccesses(deviceId, { sortBy, limit, page, ...searchFilter })
          );
        }
      };
      fetchList();
    },
    [deviceId, dispatch]
  );

  const onEditorDialogExited = useCallback(() => {
    dispatch(adminSharedDeviceAccessActions.resetEditorSharedDeviceAccessDialog(dispatch));
  }, [dispatch]);

  const addSharedDeviceAccess = useCallback(
    values => {
      let action = adminSharedDeviceAccessActions.addSharedDeviceAccess(values, deviceId);
      if (isEdit) {
        action = adminSharedDeviceAccessActions.updateSharedDeviceAccess(values, deviceId, sharedDeviceAccess.id);
      }
      dispatch(action);
    },
    [deviceId, isEdit, dispatch, sharedDeviceAccess.id]
  );

  const deleteSharedDeviceAccess = useCallback(
    id => {
      dispatch(adminSharedDeviceAccessActions.deleteSharedDeviceAccess(deviceId, id));
    },
    [deviceId, dispatch]
  );

  const renderList = useMemo(() => {
    return (
      <ListTable
        type="shared device access"
        title="Shared Device Access"
        tableHeaders={tableHeaders}
        count={sharedDeviceAccesses.count}
        list={list}
        getList={getList}
        isLoggedIn={userContext.isLoggedIn}
        isConnected={userContext.connected}
        isFetching={isFetching}
        buttons={buttons}
        initialSort={{ order: 'desc', orderBy: 'createdAt' }}
        data-test="listTableComponent"
        preDeleteCallback={adminSharedDeviceAccessActions.setSharedDeviceAccessToBeDeleted}
        postDeleteCallback={deleteSharedDeviceAccess}
        cancelDeleteCallback={adminSharedDeviceAccessActions.unsetSharedDeviceAccessToBeDeleted}
        useKey={'id'}
      />
    );
  }, [
    sharedDeviceAccesses.count,
    buttons,
    deleteSharedDeviceAccess,
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
      <AdminUserContextProvider>
        <EditorDialogContextProvider>
          <EditorDialog
            name={editorDialog}
            Component={SharedDeviceAccessForm}
            title={isEdit ? 'Edit Shared Device Access' : 'Add Shared Device Access'}
            isEdit={isEdit}
            isFetching={isFetching}
            handleSubmit={addSharedDeviceAccess}
            submitButtonTitle={isEdit ? 'Save' : 'Add'}
            params={{ ...sharedDeviceAccess }}
            data-test="editorDialogComponent"
            onExited={onEditorDialogExited}
          />
        </EditorDialogContextProvider>
      </AdminUserContextProvider>
    </React.Fragment>
  );
};

SharedDeviceAccessList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
  deviceId: PropTypes.string.isRequired,
};

export default SharedDeviceAccessList;
