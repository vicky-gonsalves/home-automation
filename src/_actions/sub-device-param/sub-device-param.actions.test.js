import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { subDeviceParamService } from '../../_services';
import { initialState } from '../../_utils';
import { subDeviceParamNine, subDeviceParamThree } from '../../_utils/fixtures/subDeviceParam.fixture';
import { subDeviceParamActions } from './sub-device-param.actions';

let store;
const mockStore = configureStore([thunk]);
store = mockStore(initialState);

describe('subDeviceParamActions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch SUB_DEVICE_PARAM_UPDATE_STATUS update action for status change', () => {
    subDeviceParamService.updateSubDeviceParamStatus = jest.fn().mockResolvedValueOnce(subDeviceParamThree);
    store.dispatch(subDeviceParamActions.updateSubDeviceParamStatus(subDeviceParamThree)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamThree },
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
      ]);
    });
  });

  it('should fail to update and dispatch SET_SUB_DEVICE_PARAM_ERROR', () => {
    subDeviceParamService.updateSubDeviceParamStatus = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceParamActions.updateSubDeviceParamStatus(subDeviceParamThree)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamThree },
        { payload: true, type: 'SET_PROGRESS' },
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamThree },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' },
      ]);
    });
  });

  it('should fail to update and dispatch SET_SUB_DEVICE_PARAM_ERROR if paramValue is on', () => {
    const _subDeviceParam = { ...subDeviceParamThree };
    _subDeviceParam.paramValue = 'on';
    subDeviceParamService.updateSubDeviceParamStatus = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceParamActions.updateSubDeviceParamStatus(_subDeviceParam)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: _subDeviceParam },
        { payload: true, type: 'SET_PROGRESS' },
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: { ...subDeviceParamThree, paramValue: 'off' } },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' },
      ]);
    });
  });

  it('should update and dispatch SUB_DEVICE_PARAM_UPDATE_STATUS for mode change', () => {
    subDeviceParamService.updateSubDeviceParamMode = jest.fn().mockResolvedValueOnce(subDeviceParamNine);
    store.dispatch(subDeviceParamActions.updateSubDeviceParamMode(subDeviceParamNine)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamNine },
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
      ]);
    });
  });

  it('should fail to update and dispatch SET_SUB_DEVICE_PARAM_ERROR', () => {
    subDeviceParamService.updateSubDeviceParamMode = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceParamActions.updateSubDeviceParamMode(subDeviceParamNine)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamNine },
        { payload: true, type: 'SET_PROGRESS' },
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: subDeviceParamNine },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' },
      ]);
    });
  });

  it('should fail to update and dispatch SET_SUB_DEVICE_PARAM_ERROR for mode change', () => {
    const _subDeviceParam = { ...subDeviceParamNine };
    _subDeviceParam.paramValue = 'automatic';
    subDeviceParamService.updateSubDeviceParamMode = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceParamActions.updateSubDeviceParamMode(_subDeviceParam)).then(() => {
      expect(store.getActions()).toEqual([
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: _subDeviceParam },
        { payload: true, type: 'SET_PROGRESS' },
        { type: 'SUB_DEVICE_PARAM_UPDATE_STATUS', payload: { ...subDeviceParamNine, paramValue: 'manual' } },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' },
      ]);
    });
  });

  it('should update all without error', () => {
    subDeviceParamService.updateAllSubDeviceParamStatus = jest.fn().mockResolvedValueOnce(undefined);
    store.dispatch(subDeviceParamActions.updateAllSubDeviceParamStatus('someDeviceId', 'on')).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
      ]);
    });
  });

  it('should error when update all and dispatch ', () => {
    subDeviceParamService.updateAllSubDeviceParamStatus = jest.fn().mockRejectedValueOnce('Error');
    store.dispatch(subDeviceParamActions.updateAllSubDeviceParamStatus('someDeviceId', 'on')).then(() => {
      expect(store.getActions()).toEqual([
        { payload: true, type: 'SET_PROGRESS' },
        { payload: false, type: 'SET_PROGRESS' },
        { payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' },
      ]);
    });
  });

  it('should dispatch SUB_DEVICE_PARAM_REMOVE_ALL action', () => {
    store.dispatch(subDeviceParamActions.removeAllSubDeviceParams());
    expect(store.getActions()).toEqual([{ type: 'SUB_DEVICE_PARAM_REMOVE_ALL' }]);
  });

  it('should dispatch SET_SUB_DEVICE_PARAM_ERROR action', () => {
    store.dispatch(subDeviceParamActions.setSubDeviceParamError('Error'));
    expect(store.getActions()).toEqual([{ payload: { error: 'Error' }, type: 'SET_SUB_DEVICE_PARAM_ERROR' }]);
  });
});
