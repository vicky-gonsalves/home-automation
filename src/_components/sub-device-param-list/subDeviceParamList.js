import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { adminSubDeviceParamActions, editorDialogActions } from '../../_actions';
import { AdminSubDeviceParamContext } from '../../_contexts/admin-sub-device-param/AdminSubDeviceParamContext.provider';
import EditorDialogContextProvider from '../../_contexts/editor-dialog/EditorDialogContext.provider';
import { UserContext } from '../../_contexts/user/UserContext.provider';
import AddButton from '../buttons/add-button/addButton';
import DeleteButton from '../buttons/delete-button/deleteButton';
import EditButton from '../buttons/edit-button/editButton';
import EditorDialog from '../dialogs/editor-dialog/editorDialog';
import { SubDeviceParamForm } from '../forms/sub-device-param-form/SubDeviceParamForm';
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

const SubDeviceParamList = ({ deviceId, subDeviceId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userContext = useContext(UserContext);
  const adminSubDeviceParamContext = useContext(AdminSubDeviceParamContext);
  const adminSubDeviceParam = adminSubDeviceParamContext.adminSubDeviceParam;
  const subDeviceParam = adminSubDeviceParam.subDeviceParam;
  const list = adminSubDeviceParam.subDeviceParams;
  const isFetching =
    adminSubDeviceParam.isFetchingSubDeviceParamsList ||
    adminSubDeviceParam.subDeviceParamInProgress ||
    !userContext.connected;
  const isEdit = useMemo(() => subDeviceParam && subDeviceParam.hasOwnProperty('id'), [subDeviceParam]);
  const editorDialog = 'subDeviceParam';

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
          callback: subDeviceParam => {
            dispatch(
              adminSubDeviceParamActions.getSubDeviceParam(deviceId, subDeviceId, subDeviceParam.paramName)
            ).then(() => dispatch(editorDialogActions.open(editorDialog)));
          },
          buttonType: 'edit',
        },
        { id: 'delete', component: DeleteButton, buttonType: 'delete' },
      ],
    },
    { id: 'paramName', sort: true, search: true, align: 'left', label: 'Param Name', type: 'text', width: 300 },
    { id: 'paramValue', sort: false, search: false, align: 'left', label: 'Param Value', type: 'text', width: 300 },
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
      title: 'Add Sub Device Param',
      type: 'subDeviceParam',
      component: AddButton,
      callback: () => {
        dispatch(editorDialogActions.open(editorDialog));
      },
      buttonType: 'add',
      width: 250,
    },
  ];

  const getList = useCallback(
    (isLoggedIn, isConnected, sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        if (isLoggedIn && isConnected) {
          dispatch(
            adminSubDeviceParamActions.getSubDeviceParams(deviceId, subDeviceId, { sortBy, limit, page, ...searchFilter })
          );
        }
      };
      fetchList();
    },
    [deviceId, dispatch, subDeviceId]
  );

  const onEditorDialogExited = useCallback(() => {
    dispatch(adminSubDeviceParamActions.resetEditorSubDeviceParamDialog());
  }, [dispatch]);

  const addSubDeviceParam = useCallback(
    values => {
      let action = adminSubDeviceParamActions.addSubDeviceParam(values, deviceId, subDeviceId);
      if (isEdit) {
        action = adminSubDeviceParamActions.updateSubDeviceParam(values, deviceId, subDeviceId, subDeviceParam.paramName);
      }
      dispatch(action);
    },
    [deviceId, subDeviceId, isEdit, dispatch, subDeviceParam.paramName]
  );

  const deleteSubDeviceParam = useCallback(
    paramName => {
      dispatch(adminSubDeviceParamActions.deleteSubDeviceParam(deviceId, subDeviceId, paramName));
    },
    [deviceId, dispatch, subDeviceId]
  );

  const renderList = useMemo(() => {
    return (
      <ListTable
        type="subDeviceParam"
        title="Sub Device Params"
        tableHeaders={tableHeaders}
        count={adminSubDeviceParam.count}
        list={list}
        getList={getList}
        isLoggedIn={userContext.isLoggedIn}
        isConnected={userContext.connected}
        isFetching={isFetching}
        buttons={buttons}
        initialSort={{ order: 'desc', orderBy: 'createdAt' }}
        data-test="listTableComponent"
        preDeleteCallback={adminSubDeviceParamActions.setSubDeviceParamToBeDeleted}
        postDeleteCallback={deleteSubDeviceParam}
        cancelDeleteCallback={adminSubDeviceParamActions.unsetSubDeviceParamToBeDeleted}
        useKey={'paramName'}
      />
    );
  }, [
    adminSubDeviceParam.count,
    buttons,
    deleteSubDeviceParam,
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
          name={editorDialog}
          Component={SubDeviceParamForm}
          title={isEdit ? 'Edit Sub-device-param' : 'Add New Sub-device-param'}
          isEdit={isEdit}
          isFetching={isFetching}
          handleSubmit={addSubDeviceParam}
          submitButtonTitle={isEdit ? 'Save' : 'Add'}
          params={{ ...subDeviceParam }}
          data-test="editorDialogComponent"
          onExited={onEditorDialogExited}
        />
      </EditorDialogContextProvider>
    </React.Fragment>
  );
};

SubDeviceParamList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }),
  deviceId: PropTypes.string.isRequired,
  subDeviceId: PropTypes.string.isRequired,
};

export default SubDeviceParamList;
