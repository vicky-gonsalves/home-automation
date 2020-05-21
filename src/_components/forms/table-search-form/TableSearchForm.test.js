import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  checkProps,
  findByDataAttr,
  initialState,
  simulateSelectChange,
  submitFormikForm,
  updateFormikField,
} from '../../../_utils';
import TableSearchForm, { SimpleTableSearchForm } from './TableSearchForm';

jest.mock('axios');

const headCells = [
  { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
  { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'email', width: 300 },
  { id: 'id', sort: true, search: true, align: 'left', label: 'Id', type: 'number', width: 300 },
  {
    id: 'role',
    sort: true,
    search: true,
    align: 'left',
    label: 'Role',
    type: 'select',
    options: ['admin', 'user'],
    width: 300,
  },
];

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <TableSearchForm {..._props} />
    </Provider>
  );
};

describe('TableSearchForm', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning for TableSearchForm', () => {
      const propsErr = checkProps(TableSearchForm, {});
      expect(propsErr).toBeUndefined();
    });

    it('should not throw a warning for SimpleTableSearchForm', () => {
      const props = {
        headCell: headCells[0],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      const propsErr = checkProps(SimpleTableSearchForm, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    beforeEach(() => {});

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should render tableSearchFormFieldInput field for type text', () => {
      const props = {
        headCell: headCells[0],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(component).toHaveLength(1);
    });

    it('should render tableSearchFormFieldInput field for type email', () => {
      const props = {
        headCell: headCells[1],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(component).toHaveLength(1);
    });

    it('should render tableSearchFormFieldInput field for type number', () => {
      const props = {
        headCell: headCells[2],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(component).toHaveLength(1);
    });

    it('should not render tableSearchFormFieldSelectInput field for type text', () => {
      const props = {
        headCell: headCells[0],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput');
      expect(component).toHaveLength(0);
    });

    it('should not render tableSearchFormFieldSelectInput field for type email', () => {
      const props = {
        headCell: headCells[1],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput');
      expect(component).toHaveLength(0);
    });

    it('should not render tableSearchFormFieldSelectInput field for type number', () => {
      const props = {
        headCell: headCells[2],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput');
      expect(component).toHaveLength(0);
    });

    it('should render tableSearchFormFieldSelectInput field for type select', () => {
      const props = {
        headCell: headCells[3],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput').first();
      expect(component).toHaveLength(1);
    });

    it('should render tableSearchFormSubmitButton', () => {
      const props = {
        headCell: headCells[0],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormSubmitButton').first();
      expect(component).toHaveLength(1);
    });

    it('should render tableSearchFormCancelButton', () => {
      const props = {
        headCell: headCells[0],
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const component = findByDataAttr(wrapper, 'tableSearchFormCancelButton').first();
      expect(component).toHaveLength(1);
    });

    it('should submit form if valid and if type is text', async () => {
      const headCell = headCells[0];
      const name = headCell.id;
      const value = 'some name';
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      let formikTableSearchFormFieldInput = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(formikTableSearchFormFieldInput.props().error).toBeUndefined();
      expect(spy).toHaveBeenCalledWith(name, value);
    });

    it('should not submit form if invalid and if type is text', async () => {
      const headCell = headCells[0];
      const name = headCell.id;
      const value = null;
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should submit form if valid and if type is email', async () => {
      const headCell = headCells[1];
      const name = headCell.id;
      const value = 'someemail@email.com';
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      let formikTableSearchFormFieldInput = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(formikTableSearchFormFieldInput.props().error).toBeUndefined();
      expect(spy).toHaveBeenCalledWith(name, value);
    });

    it('should not submit form if invalid and if type is email', async () => {
      const headCell = headCells[1];
      const name = headCell.id;
      const value = null;
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should submit form if valid and if type is number', async () => {
      const headCell = headCells[2];
      const name = headCell.id;
      const value = 2;
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      let formikTableSearchFormFieldInput = findByDataAttr(wrapper, 'tableSearchFormFieldInput').first();
      expect(formikTableSearchFormFieldInput.props().error).toBeUndefined();
      expect(spy).toHaveBeenCalledWith(name, value);
    });

    it('should not submit form if invalid and if type is number', async () => {
      const headCell = headCells[2];
      const name = headCell.id;
      const value = null;
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldInput = wrapper.find(`input[name="${name}"]`).first();
      await updateFormikField(tableSearchFormFieldInput, name, value);
      tableSearchFormFieldInput.update();
      await submitFormikForm(form);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should submit form if valid and if type is select', async () => {
      const headCell = headCells[3];
      const name = headCell.id;
      const value = headCell.options[0];
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldSelectInput = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput').first();
      simulateSelectChange(tableSearchFormFieldSelectInput, name, value);
      await submitFormikForm(form);
      expect(spy).toHaveBeenCalledWith(name, value);
    });

    it('should not submit form if invalid and if type is select', async () => {
      const headCell = headCells[3];
      const name = headCell.id;
      const value = '';
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const form = wrapper.find(`form`).first();
      const spy = jest.spyOn(wrapper.props().children.props, 'handleSubmit');
      const tableSearchFormFieldSelectInput = findByDataAttr(wrapper, 'tableSearchFormFieldSelectInput').first();
      simulateSelectChange(tableSearchFormFieldSelectInput, name, value);
      await submitFormikForm(form);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should call handleCancel if cancel button is clicked', async () => {
      const headCell = headCells[3];
      const props = {
        headCell,
        handleSubmit: jest.fn(),
        handleCancel: jest.fn(),
        isFetching: false,
      };
      wrapper = setupWrapper(initialState, props);
      const spy = jest.spyOn(wrapper.props().children.props, 'handleCancel');
      const tableSearchFormCancelButton = findByDataAttr(wrapper, 'tableSearchFormCancelButton').first();
      tableSearchFormCancelButton.props().onClick();
      expect(spy).toHaveBeenCalled();
    });
  });
});
