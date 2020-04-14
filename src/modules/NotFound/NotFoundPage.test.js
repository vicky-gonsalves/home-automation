import { shallow } from 'enzyme';
import React from 'react';
import { history } from '../../_helpers/history';
import { checkProps, findByDataAttr } from '../../_utils';
import NotFoundPage from './NotFoundPage';

const props = {
  history,
  location: {},
  match: {},
};

describe('NotFound Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(NotFoundPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<NotFoundPage {...props} />);
    });

    afterEach(() => {});

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'notFoundPageContainer').first();
      expect(component.length).toBe(1);
    });
  });
});
