import { editorDialogConstants } from '../../_constants';

const open = name => dispatch => dispatch({ type: editorDialogConstants.OPEN_EDITOR, payload: name });

const close = name => dispatch => dispatch({ type: editorDialogConstants.CLOSE_EDITOR, payload: name });

export const editorDialogActions = {
  open,
  close,
};
