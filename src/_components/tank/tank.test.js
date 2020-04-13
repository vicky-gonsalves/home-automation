import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import Tank from './tank';

const setupWrapper = props => {
  return shallow(<Tank {...props} />);
};

describe('Tank Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const props = {
        waterLevel: 70,
      };
      const propsErr = checkProps(Tank, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render tankContainer without error', () => {
      const props = {
        waterLevel: 70,
      };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankContainer without error if no props', () => {
      const props = {};
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'tankContainer').first();
      expect(component.length).toBe(1);
    });

    it('should render tankFillContainer and have style if no props', () => {
      const props = {};
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'tankFillContainer').first();
      expect(component.props().style).toEqual({ transform: 'translate(0,1px)' });
    });

    it('should render tankFillContainer and have style if have props', () => {
      const props = { waterLevel: 70 };
      wrapper = setupWrapper(props);
      const component = findByDataAttr(wrapper, 'tankFillContainer').first();
      expect(component.props().style).toEqual({ transform: 'translate(0,30px)' });
    });
  });
});
