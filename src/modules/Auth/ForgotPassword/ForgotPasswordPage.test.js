import { shallow } from 'enzyme';
import React from 'react';
import { history } from '../../../_helpers/history/history';
import { checkProps, findByDataAttr } from '../../../_utils';
import ForgotPasswordPage from './ForgotPasswordPage';

const props = {
  history,
  location: {},
  match: {},
};

describe('NotFound Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ForgotPasswordPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ForgotPasswordPage {...props} />);
    });

    afterEach(() => {});

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'forgotPasswordPageContainer').first();
      expect(component.length).toBe(1);
    });
  });
});
