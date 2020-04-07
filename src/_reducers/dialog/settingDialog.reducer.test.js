import { settingDialogConstants } from '../../_constants';
import { deviceOne } from '../../_utils/fixtures/device.fixture';
import settingDialog from './settingDialog.reducer';

describe('Setting Dialog Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = settingDialog({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if OPEN_SETTINGS', () => {
    const currentSettingDialog = {
      open: true,
      dialogType: 'tank',
      deviceId: deviceOne.deviceId,
      title: 'Tank',
    };
    const newState = settingDialog(
      {},
      {
        type: settingDialogConstants.OPEN_SETTINGS,
        payload: { dialogType: 'tank', deviceId: deviceOne.deviceId, title: 'Tank' },
      }
    );
    expect(newState).toEqual(currentSettingDialog);
  });

  it('should return new state if CLOSE_SETTINGS', () => {
    const currentSettingDialog = {
      open: false,
    };
    const newState = settingDialog(
      {},
      {
        type: settingDialogConstants.CLOSE_SETTINGS,
      }
    );
    expect(newState).toEqual(currentSettingDialog);
  });

  it('should return new state if RESET_SETTINGS', () => {
    const currentSettingDialog = {
      dialogType: null,
      deviceId: null,
      title: null,
    };
    const newState = settingDialog(
      {},
      {
        type: settingDialogConstants.RESET_SETTINGS,
      }
    );
    expect(newState).toEqual(currentSettingDialog);
  });
});
