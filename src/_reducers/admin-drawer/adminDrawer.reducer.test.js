import { adminDrawerConstants } from '../../_constants';
import adminDrawer from './adminDrawer.reducer';

jest.mock('axios');

describe('Admin Drawer Reducer', () => {
  beforeEach(() => {});

  it('should return default state', () => {
    const newState = adminDrawer({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if OPEN_ADMIN_DRAWER', () => {
    const currentAdminDrawer = { open: true };
    const newState = adminDrawer({}, { type: adminDrawerConstants.OPEN_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });

  it('should return new state if CLOSE_ADMIN_DRAWER', () => {
    const currentAdminDrawer = { open: false };
    const newState = adminDrawer({}, { type: adminDrawerConstants.CLOSE_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });

  it('should return new state if SHOW_ADMIN_DRAWER', () => {
    const currentAdminDrawer = { show: true };
    const newState = adminDrawer({}, { type: adminDrawerConstants.SHOW_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });

  it('should return new state if HIDE_ADMIN_DRAWER', () => {
    const currentAdminDrawer = { show: false };
    const newState = adminDrawer({}, { type: adminDrawerConstants.HIDE_ADMIN_DRAWER });
    expect(newState).toEqual(currentAdminDrawer);
  });
});
