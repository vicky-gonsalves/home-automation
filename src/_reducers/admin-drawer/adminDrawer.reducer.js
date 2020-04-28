import { adminDrawerConstants } from '../../_constants';

const initialState = {
  open: false,
  show: false,
};

const adminDrawer = (state = initialState, action) => {
  switch (action.type) {
    case adminDrawerConstants.OPEN_ADMIN_DRAWER:
      return {
        ...state,
        open: true,
      };

    case adminDrawerConstants.CLOSE_ADMIN_DRAWER:
      return {
        ...state,
        open: false,
      };

    case adminDrawerConstants.SHOW_ADMIN_DRAWER:
      return {
        ...state,
        show: true,
      };

    case adminDrawerConstants.HIDE_ADMIN_DRAWER:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};
export default adminDrawer;
