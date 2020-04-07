import { logConstants } from '../../_constants';
import { groupBy, orderBy, map, flatten } from 'lodash';

const initialState = {
  logs: [],
};

const log = (state = initialState, action) => {
  switch (action.type) {
    case logConstants.LOG_STORE_ALL:
      return {
        ...state,
        logs: action.payload,
      };

    case logConstants.LOG_REMOVE_ALL:
      return {
        ...state,
        logs: [],
      };

    case logConstants.LOG_CREATED:
      const allLogs = [...state.logs, action.payload];
      const groupedLogs = groupBy(orderBy(allLogs, ['createdAt'], ['desc']), 'deviceId');
      const limitedLogs = map(groupedLogs, group => group.slice(0, 5));
      const finalLogs = flatten(limitedLogs);
      return {
        ...state,
        logs: finalLogs,
      };

    case logConstants.PARENT_DEVICE_DELETED_FOR_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log && log.deviceId !== action.payload.deviceId),
      };

    case logConstants.PARENT_SUB_DEVICE_DELETED_FOR_LOG:
      const logs = state.logs.filter(log => log && log.subDeviceId !== action.payload.subDeviceId);
      return {
        ...state,
        logs,
      };

    default:
      return state;
  }
};

export default log;
