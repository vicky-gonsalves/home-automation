import { editorDialogConstants } from '../../_constants';

const initialState = {
  open: [],
};

const editorDialog = (state = initialState, action) => {
  switch (action.type) {
    case editorDialogConstants.OPEN_EDITOR:
      return {
        ...state,
        open: [...state.open, action.payload],
      };

    case editorDialogConstants.CLOSE_EDITOR:
      return {
        ...state,
        open: state.open.filter(name => name !== action.payload),
      };

    default:
      return state;
  }
};
export default editorDialog;
