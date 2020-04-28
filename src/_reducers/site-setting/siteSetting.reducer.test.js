import { siteSettingConstants } from '../../_constants';
import siteSetting from './siteSetting.reducer';

jest.mock('axios');

describe('Site Setting Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = siteSetting({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SHOW_BURGER', () => {
    const currentAdminDrawer = { burger: true };
    const newState = siteSetting({}, { type: siteSettingConstants.SHOW_BURGER });
    expect(newState).toEqual(currentAdminDrawer);
  });

  it('should return new state if HIDE_BURGER', () => {
    const currentAdminDrawer = { burger: false };
    const newState = siteSetting({}, { type: siteSettingConstants.HIDE_BURGER });
    expect(newState).toEqual(currentAdminDrawer);
  });
});
