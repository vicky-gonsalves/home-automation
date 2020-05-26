import { editorDialogConstants } from '../../_constants';

const open = () => dispatch => dispatch({ type: editorDialogConstants.OPEN_EDITOR });

const close = () => dispatch => dispatch({ type: editorDialogConstants.CLOSE_EDITOR });

export const editorDialogActions = {
  open,
  close,
};
