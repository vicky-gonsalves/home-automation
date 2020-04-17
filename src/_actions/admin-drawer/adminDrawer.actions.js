import { adminDrawerConstants } from '../../_constants';

const open = () => dispatch => dispatch({ type: adminDrawerConstants.OPEN_ADMIN_DRAWER });

const close = () => dispatch => dispatch({ type: adminDrawerConstants.CLOSE_ADMIN_DRAWER });

export const adminDrawerActions = {
  open,
  close,
};
