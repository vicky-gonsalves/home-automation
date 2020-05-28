import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { EditorDialogContext } from '../../../_contexts/editor-dialog/EditorDialogContext.provider';

const EditorDialog = ({ name, Component, title, isEdit, handleSubmit, isFetching, submitButtonTitle, params, onExited }) => {
  const editorDialogContext = useContext(EditorDialogContext);
  const editorDialog = editorDialogContext.editorDialog;

  const renderDialogTitle = () => {
    if (title) {
      return (
        <DialogTitle id={title + '_editor'} data-test="editorDialogTitleComponent">
          {title}
        </DialogTitle>
      );
    }
  };

  const renderEditorForm = () => {
    if (Component && typeof Component === 'function') {
      return (
        <Component
          data-test="formComponent"
          isEdit={isEdit}
          submitButtonTitle={submitButtonTitle}
          handleSubmit={handleSubmit}
          isFetching={isFetching}
          params={params}
          onExited={onExited}
        />
      );
    }
    return null;
  };

  const renderDialog = () => {
    if (editorDialog && editorDialog.open && title) {
      return (
        <Dialog
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          fullWidth={true}
          open={editorDialog.open.indexOf(name) > -1}
          aria-labelledby={editorDialog.title}
          data-test="editorDialogComponent"
        >
          {renderDialogTitle()}
          <DialogContent>{renderEditorForm()}</DialogContent>
        </Dialog>
      );
    }
  };

  return <div data-test="editorDialogContainer">{renderDialog()}</div>;
};

EditorDialog.propTypes = {
  name: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  submitButtonTitle: PropTypes.string.isRequired,
  params: PropTypes.object,
  onExited: PropTypes.func,
};

export default EditorDialog;
