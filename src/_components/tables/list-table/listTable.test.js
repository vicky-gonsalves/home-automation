import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { checkProps, findByDataAttr, getStateClone } from '../../../_utils';
import AddButton from '../../buttons/add-button/addButton';
import DeleteButton from '../../buttons/delete-button/deleteButton';
import EditButton from '../../buttons/edit-button/editButton';
import ViewButton from '../../buttons/view-button/viewButton';
import ListTable from './listTable';

jest.mock('../../buttons/add-button/addButton', () => () => <div id="mockAddButton">mockAddButton</div>);
jest.mock('../../buttons/delete-button/deleteButton', () => () => <div id="mockDeleteButton">mockDeleteButton</div>);
jest.mock('../../buttons/edit-button/editButton', () => () => <div id="mockEditButton">mockEditButton</div>);
jest.mock('../../buttons/view-button/viewButton', () => () => <div id="mockViewButton">mockViewButton</div>);

jest.mock('axios');

let wrapper;
let store;
const mockStore = configureStore([thunk]);
const props = {
  classes: {
    tableContainer: '',
    table: '',
    visuallyHidden: '',
    margin: '',
    actions: '',
    highlight: '',
  },
  tableHeaders: [
    {
      id: 'actions',
      align: 'left',
      label: 'Actions',
      width: 150,
      actions: [
        { id: 'view', component: ViewButton, path: '/users/view/', buttonType: 'view' },
        { id: 'edit', component: EditButton, path: '/users/edit/', buttonType: 'edit' },
        { id: 'delete', component: DeleteButton, buttonType: 'delete' },
      ],
    },
    { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
    { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'email', width: 300 },
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
    {
      id: 'isDisabled',
      sort: true,
      search: true,
      align: 'left',
      label: 'Disabled?',
      type: 'select',
      options: ['true', 'false'],
      width: 300,
    },
    { id: 'createdAt', sort: true, search: true, align: 'right', label: 'created at', type: 'datetime', width: 330 },
  ],
  list: [
    {
      id: '5ea7f0bc9bcacc0fa4db81ec',
      email: 'johndoe5@email.com',
      name: 'John Doe5',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.412Z',
      updatedAt: '2020-04-28T09:00:44.412Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81ed',
      email: 'johndoe6@email.com',
      name: 'John Doe6',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.412Z',
      updatedAt: '2020-04-28T09:00:44.412Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81ee',
      email: 'johndoe7@email.com',
      name: 'John Doe7',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.412Z',
      updatedAt: '2020-04-28T09:00:44.412Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81ef',
      email: 'johndoe8@email.com',
      name: 'John Doe8',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.412Z',
      updatedAt: '2020-04-28T09:00:44.412Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81e9',
      email: 'johndoe2@email.com',
      name: 'John Doe2',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.411Z',
      updatedAt: '2020-04-28T09:00:44.411Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81ea',
      email: 'johndoe3@email.com',
      name: 'John Doe3',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.411Z',
      updatedAt: '2020-04-28T09:00:44.411Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81eb',
      email: 'johndoe4@email.com',
      name: 'John Doe4',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.411Z',
      updatedAt: '2020-04-28T09:00:44.411Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81e7',
      email: 'vicky.gonsalves@outlook.com',
      name: 'Vicky',
      role: 'admin',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.410Z',
      updatedAt: '2020-04-28T09:00:44.410Z',
    },
    {
      id: '5ea7f0bc9bcacc0fa4db81e8',
      email: 'johndoe@email.com',
      name: 'John Doe',
      role: 'user',
      isDisabled: false,
      createdAt: '2020-04-28T09:00:44.410Z',
      updatedAt: '2020-04-28T09:00:44.410Z',
    },
  ],
  count: 9,
  getList: jest.fn(),
  isLoggedIn: true,
  isConnected: true,
  isFetching: false,
  buttons: [{ title: 'Add User', type: 'user', component: AddButton, path: '/users/new', buttonType: 'add' }],
  title: 'Users',
  type: 'user',
  initialSort: { order: 'desc', orderBy: 'createdAt' },
};

const setupWrapper = (_initialState, _props) => {
  store = mockStore(_initialState);
  return mount(
    <Provider store={store}>
      <ListTable {..._props} />
    </Provider>
  );
};

describe('ListTable Component', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ListTable, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing with State', () => {
    const setState = jest.fn();
    const useStateMock = initState => [initState, setState];
    beforeEach(() => {});
    afterEach(() => {
      wrapper.unmount();
      if (store) {
        store.clearActions();
      }
      jest.clearAllMocks();
    });

    it('should render various components if no error', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component1 = findByDataAttr(wrapper, 'tableToolbarComponent').first();
      const component2 = findByDataAttr(wrapper, 'tableContainer').first();
      const component3 = findByDataAttr(wrapper, 'tableContainerComponent').first();
      const component4 = findByDataAttr(wrapper, 'tableComponent').first();
      const component5 = findByDataAttr(wrapper, 'tablePaginationComponent').first();
      const component6 = findByDataAttr(wrapper, 'overlayComponent');
      const component7 = findByDataAttr(wrapper, 'tableRowComponent').first();
      const component8 = findByDataAttr(wrapper, 'tableSortLabelComponent').first();
      expect(component1).toHaveLength(1);
      expect(component2).toHaveLength(1);
      expect(component3).toHaveLength(1);
      expect(component4).toHaveLength(1);
      expect(component5).toHaveLength(1);
      expect(component6).toHaveLength(0);
      expect(component7).toHaveLength(1);
      expect(component8).toHaveLength(1);
    });

    it('should have call getList on page load', () => {
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      expect(props.getList).toHaveBeenCalledWith(true, true, 'createdAt:desc', 10, 1, {});
    });

    it('should render overlay if isFetching is true', () => {
      props.isFetching = true;
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, props);
      const component = findByDataAttr(wrapper, 'overlayComponent').first();
      expect(component).toHaveLength(1);
      props.isFetching = false;
    });

    it('should render searchIconButton and handle onClick if search if true', async () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'createdAt',
          sort: true,
          search: true,
          align: 'right',
          label: 'created at',
          type: 'datetime',
          width: 330,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'searchIconButton').first();
      expect(component).toHaveLength(1);
      act(() => {
        component.props().onClick();
      });
      wrapper.update();
      const component1 = findByDataAttr(wrapper, 'dateRangePickerComponent').first();
      expect(component1).toHaveLength(1);
    });

    it('should not render searchIconButton if search if false', async () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'createdAt',
          sort: true,
          search: false,
          align: 'right',
          label: 'created at',
          type: 'datetime',
          width: 330,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'searchIconButton');
      expect(component).toHaveLength(0);
    });

    it('should render dateRangePickerComponent and not sortLabelComponent if headCell.type is datetime and is searchClicked is true', async () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'createdAt',
          sort: true,
          search: true,
          align: 'right',
          label: 'created at',
          type: 'datetime',
          width: 330,
          searchClicked: true,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component1 = findByDataAttr(wrapper, 'dateRangePickerComponent').first();
      const component2 = findByDataAttr(wrapper, 'sortLabelComponent');
      expect(component1).toHaveLength(1);
      expect(component2).toHaveLength(0);
    });

    it('should not render dateRangePickerComponent and render sortLabelComponent if headCell.type is datetime and is searchClicked is false', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'createdAt',
          sort: true,
          search: true,
          align: 'right',
          label: 'created at',
          type: 'datetime',
          width: 330,
          searchClicked: false,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component1 = findByDataAttr(wrapper, 'dateRangePickerComponent');
      const component2 = findByDataAttr(wrapper, 'sortLabelComponent').first();
      expect(component1).toHaveLength(0);
      expect(component2).toHaveLength(1);
    });

    it('should render normalFormComponent and not sortLabelComponent if headCell.type is not datetime and is searchClicked is true', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'name',
          sort: true,
          search: true,
          align: 'left',
          label: 'Name',
          type: 'text',
          width: 300,
          searchClicked: true,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component1 = findByDataAttr(wrapper, 'normalFormComponent').first();
      const component2 = findByDataAttr(wrapper, 'sortLabelComponent');
      expect(component1).toHaveLength(1);
      expect(component2).toHaveLength(0);
    });

    it('should not render normalFormComponent and render sortLabelComponent if headCell.type is not datetime and is searchClicked is false', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'name',
          sort: true,
          search: true,
          align: 'left',
          label: 'Name',
          type: 'text',
          width: 300,
          searchClicked: false,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component1 = findByDataAttr(wrapper, 'normalFormComponent');
      const component2 = findByDataAttr(wrapper, 'sortLabelComponent').first();
      expect(component1).toHaveLength(0);
      expect(component2).toHaveLength(1);
    });

    it('should handle handleSubmit and handleCancel on dateRangePickerComponent', async () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        { id: 'email', sort: true, search: true, align: 'left', label: 'Email', type: 'email', width: 300 },
        {
          id: 'createdAt',
          sort: true,
          search: true,
          align: 'right',
          label: 'created at',
          type: 'datetime',
          width: 330,
          searchClicked: true,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'dateRangePickerComponent').first();
      act(() => {
        component.props().handleSubmit(_props.tableHeaders[1].id, 'something');
      });
      expect(setState).toHaveBeenCalledWith({ [_props.tableHeaders[1].id]: 'something' });
      expect(_props.getList).toHaveBeenCalled();
      act(() => {
        component.props().handleCancel();
      });
      expect(setState).toHaveBeenCalledWith({});
      expect(_props.getList).toHaveBeenCalledWith(true, true, 'createdAt:desc', 10, 1, {});
    });

    it('should handle handleSubmit and handleCancel on normalFormComponent', async () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'name',
          sort: true,
          search: true,
          align: 'left',
          label: 'Name',
          type: 'text',
          width: 300,
          searchClicked: true,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'normalFormComponent').first();
      act(() => {
        component.props().handleSubmit(_props.tableHeaders[0].id, 'something');
      });
      expect(setState).toHaveBeenCalledWith({ [_props.tableHeaders[0].id]: 'something' });
      expect(_props.getList).toHaveBeenCalled();
      act(() => {
        component.props().handleCancel();
      });
      expect(setState).toHaveBeenCalledWith({});
      expect(_props.getList).toHaveBeenCalledWith(true, true, 'createdAt:desc', 10, 1, {});
    });

    it('should not render actions buttons if no actions provided', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'actionButtonComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render actions buttons if buttonType are invalid', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'actions',
          align: 'left',
          label: 'Actions',
          width: 150,
          actions: [
            { id: 'view', component: ViewButton, path: '/users/view/', buttonType: 'invalid' },
            { id: 'edit', component: EditButton, path: '/users/edit/', buttonType: 'invalid' },
            { id: 'delete', component: DeleteButton, buttonType: 'invalid' },
          ],
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'actionButtonComponent');
      expect(component).toHaveLength(0);
    });

    it('should not render sort button if sort is false', () => {
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        { id: 'name', sort: false, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'tableSortLabelComponent');
      expect(component).toHaveLength(0);
    });

    it('should render sort button if sort is true and handle onClick event', () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        { id: 'name', sort: true, search: true, align: 'left', label: 'Name', type: 'text', width: 300 },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'tableSortLabelComponent').first();
      act(() => {
        component.props().onClick();
      });
      expect(setState).toHaveBeenNthCalledWith(1, 'asc');
      expect(setState).toHaveBeenNthCalledWith(2, _props.tableHeaders[0].id);
      expect(_props.getList).toHaveBeenCalled();
    });

    it('should handle multiple filter if handleCancel', () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      _props.tableHeaders.length = 0;
      _props.tableHeaders = [
        {
          id: 'email',
          sort: true,
          search: true,
          align: 'left',
          label: 'Email',
          type: 'email',
          width: 300,
          searchClicked: true,
        },
        {
          id: 'name',
          sort: true,
          search: true,
          align: 'left',
          label: 'Name',
          type: 'text',
          width: 300,
          searchClicked: true,
        },
      ];
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'normalFormComponent');
      act(() => {
        component
          .at(0)
          .props()
          .handleSubmit(_props.tableHeaders[0].id, 'something@something');
      });
      expect(setState).toHaveBeenCalledWith({ [_props.tableHeaders[0].id]: 'something@something' });
      wrapper.update();
      act(() => {
        component
          .at(3)
          .props()
          .handleSubmit(_props.tableHeaders[1].id, 'something');
      });
      wrapper.update();
      act(() => {
        component
          .at(0)
          .props()
          .handleCancel();
      });
      expect(setState).toHaveBeenCalledWith({ [_props.tableHeaders[1].id]: 'something' });
      expect(_props.getList).toHaveBeenCalled();
      wrapper.update();
      act(() => {
        component
          .at(3)
          .props()
          .handleCancel();
      });
      expect(setState).toHaveBeenCalledWith({});
      expect(_props.getList).toHaveBeenCalled();
      act(() => {
        component
          .at(3)
          .props()
          .handleSubmit();
      });
      expect(setState).toHaveBeenCalledWith({});
      act(() => {
        component
          .at(3)
          .props()
          .handleCancel();
      });
      expect(setState).toHaveBeenCalledWith({});
    });

    it('should handle pagination event onChangePage', () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'tablePaginationComponent').first();
      act(() => {
        component.props().onChangePage(null, 2);
      });
      wrapper.update();
      expect(setState).toHaveBeenCalledWith(2);
      expect(_props.getList).toHaveBeenCalled();
    });

    it('should handle pagination event onChangeRowsPerPage', () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'tablePaginationComponent').first();
      act(() => {
        component.props().onChangeRowsPerPage({ target: { value: 10 } });
      });
      wrapper.update();
      expect(setState).toHaveBeenCalledWith(10);
      expect(_props.getList).toHaveBeenCalled();
      _props.getList.mockClear();
    });

    it('should sort rows descending', () => {
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const _props = jest.fn().mockReturnValue(props)();
      _props.initialSort = { order: 'asc', orderBy: 'email' };
      _props.getList.mockClear();
      const _initialState = getStateClone();
      wrapper = setupWrapper(_initialState, _props);
      const component = findByDataAttr(wrapper, 'tableSortLabelComponent').first();
      act(() => {
        component.props().onClick();
      });
      expect(setState).toHaveBeenNthCalledWith(1, 'desc');
      expect(setState).toHaveBeenNthCalledWith(2, 'email');
      expect(_props.getList).toHaveBeenCalled();
    });
  });
});
