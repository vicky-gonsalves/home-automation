import { logConstants } from '../../_constants';

const removeAllLogs = () => dispatch => {
  dispatch({
    type: logConstants.LOG_REMOVE_ALL,
  });
};

export const logActions = {
  removeAllLogs,
};
