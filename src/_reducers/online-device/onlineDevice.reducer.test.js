import { onlineDeviceConstants } from '../../_constants';
import { socketIdOne, socketIdTwo } from '../../_utils/fixtures/socketId.fixture';
import onlineDevice from './onlineDevice.reducer';

jest.mock('axios');

describe('Online Device Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = onlineDevice({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if ONLINE_DEVICE_STORE_ALL', () => {
    const currentOnlineDevice = {
      onlineDevices: [
        { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
        { id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo },
      ],
    };
    const newState = onlineDevice(
      {},
      {
        type: onlineDeviceConstants.ONLINE_DEVICE_STORE_ALL,
        payload: currentOnlineDevice.onlineDevices,
      }
    );
    expect(newState).toEqual(currentOnlineDevice);
  });

  it('should return new state if ONLINE_DEVICE_DELETED', () => {
    const _initialState = {
      onlineDevices: [
        { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
        { id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo },
      ],
    };
    const currentOnlineDevice = {
      onlineDevices: [{ id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo }],
    };
    const newState = onlineDevice(_initialState, {
      type: onlineDeviceConstants.ONLINE_DEVICE_DELETED,
      payload: { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
    });
    expect(newState).toEqual(currentOnlineDevice);
  });

  it('should return new state if ONLINE_DEVICE_REMOVE_ALL', () => {
    const _initialState = {
      onlineDevices: [
        { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
        { id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo },
      ],
    };
    const currentOnlineDevice = {
      onlineDevices: [],
    };
    const newState = onlineDevice(_initialState, {
      type: onlineDeviceConstants.ONLINE_DEVICE_REMOVE_ALL,
    });
    expect(newState).toEqual(currentOnlineDevice);
  });

  it('should return new state if ONLINE_DEVICE_CREATED', () => {
    const _initialState = {
      onlineDevices: [],
    };
    const currentOnlineDevice = {
      onlineDevices: [{ id: socketIdOne.id, bindedTo: socketIdOne.bindedTo }],
    };
    const newState = onlineDevice(_initialState, {
      type: onlineDeviceConstants.ONLINE_DEVICE_CREATED,
      payload: currentOnlineDevice.onlineDevices[0],
    });
    expect(newState).toEqual(currentOnlineDevice);
  });

  it('should return new state if PARENT_DEVICE_DELETED_FOR_ONLINE_DEVICE', () => {
    const _initialState = {
      onlineDevices: [
        { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
        { id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo },
      ],
    };
    const currentOnlineDevice = {
      onlineDevices: [{ id: socketIdTwo.id, bindedTo: socketIdTwo.bindedTo }],
    };
    const newState = onlineDevice(_initialState, {
      type: onlineDeviceConstants.PARENT_DEVICE_DELETED_FOR_ONLINE_DEVICE,
      payload: { id: socketIdOne.id, bindedTo: socketIdOne.bindedTo },
    });
    expect(newState).toEqual(currentOnlineDevice);
  });
});
