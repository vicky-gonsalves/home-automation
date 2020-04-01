import { logConstants } from '../../_constants';

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
      let thisLogs;
      let thisDeviceLogs = state.logs.filter(log => action.payload.deviceId === log.deviceId);
      let remainingLogs = state.logs.filter(log => action.payload.deviceId !== log.deviceId);
      if (thisDeviceLogs.length >= 5) {
        thisLogs = thisDeviceLogs.slice(0, 4);
      } else {
        thisLogs = thisDeviceLogs;
      }
      return {
        ...state,
        logs: [action.payload, ...thisLogs, ...remainingLogs],
      };

    case logConstants.PARENT_DEVICE_DELETED_FOR_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log.deviceId !== action.payload.deviceId),
      };

    case logConstants.PARENT_SUB_DEVICE_DELETED_FOR_LOG:
      const logs = state.logs.filter(log => log.subDeviceId !== action.payload.subDeviceId);
      return {
        ...state,
        logs,
      };

    default:
      return state;
  }
};

export default log;
