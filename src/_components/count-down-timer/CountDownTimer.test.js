import { act } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { findByDataAttr, initialState } from '../../_utils';
import CountDownTimer from './CountDownTimer';

let store;
const props = {
  endTime: moment().add(30, 'minutes'),
};
const mockStore = configureStore([thunk]);
const setupWrapper = (_initialState, _props = null) => {
  const thisProps = _props ? _props : props;
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <CountDownTimer {...thisProps} />
    </Provider>
  );
};

describe('CountDownTimer', () => {
  describe('Checking PropTypes', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CountDownTimer {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should render countDownTimerComponent without error', () => {
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      expect(component.length).toBe(1);
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should update countdown in minutes and seconds', () => {
      jest.useFakeTimers();
      const _initialState = initialState;
      wrapper = setupWrapper(_initialState);
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toMatch(/^(in 29 minutes, 59 seconds)|(in 30 minutes)$/);
    });

    it('should update countdown in hours, minutes and seconds', () => {
      const _props = {
        endTime: moment().add(22, 'hours'),
      };
      jest.useFakeTimers();
      const _initialState = initialState;
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toMatch(/^(in 21 hours, 59 minutes, 59 seconds)|(in 22 hours)$/);
    });

    it('should update countdown in days, hours, minutes and seconds', () => {
      const _props = {
        endTime: moment().add(22, 'days'),
      };
      jest.useFakeTimers();
      const _initialState = initialState;
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toMatch(/^(in 21 days, 23 hours, 59 minutes, 59 seconds)|(in 22 days)$/);
    });

    it('should update countdown in months, days, hours, minutes and seconds', () => {
      const _props = {
        endTime: moment().add(5, 'months'),
      };
      jest.useFakeTimers();
      const _initialState = initialState;
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toMatch(/^(in 4 months, 30 days, 23 hours, 59 minutes, 59 seconds)|(in 5 months)$/);
    });

    it('should update countdown in years, months, days, hours, minutes and seconds', () => {
      const _props = {
        endTime: moment().add(99, 'years'),
      };
      jest.useFakeTimers();
      const _initialState = initialState;
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'countDownTimerComponent').first();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(component.text()).toMatch(
        /^(in 98 years, 11 months, 28 days, 23 hours, 59 minutes, 59 seconds)|(in 99 years)$/
      );
    });
  });
});
