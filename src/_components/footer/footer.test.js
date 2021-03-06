import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import config from '../../config';
import Footer from './footer';

jest.mock('axios');

const props = {
  appName: config.appName,
  'data-test': '',
};

describe('Footer Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(Footer, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let component;
    beforeEach(() => {
      component = shallow(<Footer {...props} />);
    });

    it('should render without error', () => {
      const wrapper = findByDataAttr(component, 'footer');
      expect(wrapper.length).toBe(1);
    });

    it('should render link', () => {
      const copyright = findByDataAttr(component, 'link');
      expect(copyright.length).toBe(1);
    });

    it('should have toaster component', () => {
      const copyright = findByDataAttr(component, 'toaster');
      expect(copyright.length).toBe(1);
    });

    it('should render copyright text', () => {
      const currentYear = new Date().getFullYear();
      const copyright = findByDataAttr(component, 'copyright');
      expect(copyright.length).toBe(1);
      expect(copyright.text()).toBe(`Copyright © ${config.appName} ${currentYear}.`);
    });
  });
});
