import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import PreferredDevice from './preferredDevice';

jest.mock('axios');

const props = {};
const setupWrapper = props => {
  return shallow(<PreferredDevice {...props} />);
};

describe('PreferredDevice Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(PreferredDevice, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render preferredDeviceContainer without error', () => {
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'preferredDeviceContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render preferredDeviceTitleComponent without error', () => {
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'preferredDeviceTitleComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().title).toBe('Preferred device for automatic start/stop mode');
    });

    it('should render preferredDeviceInfoIconComponent without error', () => {
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'preferredDeviceInfoIconComponent').first();
      expect(component.length).toBe(1);
      expect(component.props().style).toEqual({ color: '#4caf50' });
    });
  });
});
