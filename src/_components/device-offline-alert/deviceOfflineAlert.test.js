import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import DeviceOfflineAlert from './deviceOfflineAlert';

jest.mock('axios');

const props = {};

describe('DeviceOfflineAlert', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(DeviceOfflineAlert, props);
      expect(propsErr).toBeUndefined();
    });
  });
  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<DeviceOfflineAlert {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'deviceOfflineAlertComponent').first();
      expect(component.length).toBe(1);
    });

    it('should render deviceOfflineAlertTitleComponent', () => {
      const component = findByDataAttr(wrapper, 'deviceOfflineAlertTitleComponent').first();
      expect(component.length).toBe(1);
    });
  });
});
