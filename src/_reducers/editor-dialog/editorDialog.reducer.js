import { editorDialogConstants } from '../../_constants';

const initialState = {
  open: false,
};

const editorDialog = (state = initialState, action) => {
  switch (action.type) {
    case editorDialogConstants.OPEN_EDITOR:
      return {
        ...state,
        open: true,
      };

    case editorDialogConstants.CLOSE_EDITOR:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
export default editorDialog;
