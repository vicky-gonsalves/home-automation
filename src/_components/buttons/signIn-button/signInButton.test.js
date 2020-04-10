import { shallow } from 'enzyme';
import React from 'react';
import { history } from '../../../_helpers/history';
import { clickButton, findByDataAttr } from '../../../_utils';
import SignInButton from './signInButton';

const props = {
  'data-test': '',
};

describe('SignInButton', () => {
  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      history.push = jest.fn();
      wrapper = shallow(<SignInButton {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
      history.push.mockClear();
    });

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'signInButton').first();
      expect(component.length).toBe(1);
    });

    it('should redirect to sign in page', async () => {
      const component = findByDataAttr(wrapper, 'signInButton').first();
      await clickButton(component);
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });
});
