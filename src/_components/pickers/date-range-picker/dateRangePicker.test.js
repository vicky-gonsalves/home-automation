import { act } from '@testing-library/react';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, initialState } from '../../../_utils';
import DateRangePicker from './dateRangePicker';

jest.mock('axios');

const headCell = {
  id: 'createdAt',
  sort: true,
  search: true,
  align: 'right',
  label: 'created at',
  type: 'datetime',
  width: 330,
};

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return shallow(<DateRangePicker {..._props} />);
};

describe('DateRangePicker', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for DateRangePicker', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      const propsErr = checkProps(DateRangePicker, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render muiPickersUtilsProviderComponent field for type text', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'muiPickersUtilsProviderComponent').first();
      expect(component).toHaveLength(1);
    });

    it('should render dateTimePickerFromDateTime field for type text', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateTimePickerFromDateTime').first();
      expect(component).toHaveLength(1);
    });

    it('should render dateTimePickerToDateTime field for type text', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateTimePickerToDateTime').first();
      expect(component).toHaveLength(1);
    });

    it('should render dateRangeSubmitButton field for type text', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateRangeSubmitButton').first();
      expect(component).toHaveLength(1);
    });

    it('should render dateRangeCancelButton field for type text', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateRangeCancelButton').first();
      expect(component).toHaveLength(1);
    });

    it('should set From datetime', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateTimePickerFromDateTime').first();
      act(() => {
        component.props().onChange();
      });
      expect(component.props().value).toBeInstanceOf(moment);
    });

    it('should set To datetime', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateTimePickerToDateTime').first();
      act(() => {
        component.props().onChange();
      });
      expect(component.props().value).toBeInstanceOf(moment);
    });

    it('should submit datetime range', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateRangeSubmitButton').first();
      const from = findByDataAttr(wrapper, 'dateTimePickerFromDateTime').first();
      const to = findByDataAttr(wrapper, 'dateTimePickerToDateTime').first();
      component.props().onClick();
      expect(props.handleSubmit).toHaveBeenCalledWith(
        headCell.id,
        `${moment(from.props().value).valueOf()}:${moment(to.props().value).valueOf()}`
      );
    });

    it('should handle cancel button click', () => {
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'dateRangeCancelButton').first();
      component.props().onClick();
      expect(props.handleCancel).toHaveBeenCalled();
    });
  });
});
