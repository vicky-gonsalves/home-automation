import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import OnlineDeviceStatus from './onlineDeviceStatus';

jest.mock('axios');

const setupWrapper = props => {
  return shallow(<OnlineDeviceStatus {...props} />);
};

describe('OnlineDeviceStatus Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const props = {
        isDeviceOnline: false,
      };
      const propsErr = checkProps(OnlineDeviceStatus, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render onlineDeviceStatusTooltipComponent without error if Device is offline', () => {
      const props = {
        isDeviceOnline: false,
      };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'onlineDeviceStatusTooltipComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().title).toBe('Device is offline');
    });

    it('should render onlineDeviceStatusTooltipComponent without error if Device is online', () => {
      const props = {
        isDeviceOnline: true,
      };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'onlineDeviceStatusTooltipComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().title).toBe('Device is online');
    });

    it('should render onlineDeviceStatusWifiIconComponent without error if Device is offline', () => {
      const props = {
        isDeviceOnline: false,
      };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'onlineDeviceStatusWifiIconComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().style).toEqual({ color: '#f44336' });
    });

    it('should render onlineDeviceStatusWifiIconComponent without error if Device is online', () => {
      const props = {
        isDeviceOnline: true,
      };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'onlineDeviceStatusWifiIconComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().style).toEqual({ color: '#4caf50' });
    });
  });
});
