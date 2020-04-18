import { appConstants } from '../../_constants';

const clearData = () => dispatch => dispatch({ type: appConstants.CLEAR_DATA });

export const appActions = {
  clearData,
};
