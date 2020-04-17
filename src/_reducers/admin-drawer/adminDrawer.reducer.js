import { adminDrawerConstants } from '../../_constants';

const initialState = {
  open: false,
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

    default:
      return state;
  }
};
export default adminDrawer;
