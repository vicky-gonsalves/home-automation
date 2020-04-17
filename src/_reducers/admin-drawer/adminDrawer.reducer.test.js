import { adminDrawerConstants } from '../../_constants';
import adminDrawer from './adminDrawer.reducer';

jest.mock('axios');

describe('Admin Drawer Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = adminDrawer({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if OPEN_SETTINGS', () => {
    const currentAdminDrawer = { open: true };
    const newState = adminDrawer({}, { type: adminDrawerConstants.OPEN_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });

  it('should return new state if CLOSE_SETTINGS', () => {
    const currentAdminDrawer = { open: false };
    const newState = adminDrawer({}, { type: adminDrawerConstants.CLOSE_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });
});
