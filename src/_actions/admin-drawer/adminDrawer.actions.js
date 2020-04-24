import { adminDrawerConstants } from '../../_constants';

const open = () => dispatch => dispatch({ type: adminDrawerConstants.OPEN_ADMIN_DRAWER });

const close = () => dispatch => dispatch({ type: adminDrawerConstants.CLOSE_ADMIN_DRAWER });

const show = () => dispatch => dispatch({ type: adminDrawerConstants.SHOW_ADMIN_DRAWER });

const hide = () => dispatch => dispatch({ type: adminDrawerConstants.HIDE_ADMIN_DRAWER });

export const adminDrawerActions = {
  open,
  close,
  show,
  hide,
};
