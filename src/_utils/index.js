/* istanbul ignore file */
import { act } from '@testing-library/react';
import * as axios from 'axios';
import checkPropTypes from 'check-prop-types';
import React from 'react';

const initialState = {
  user: {
    name: null,
    email: null,
    role: null,
    remember: false,
    isLoggedIn: false,
    isFetching: false,
    tokens: {},
    loginError: null,
    isAuthorized: null,
    hasFetchedDevices: false,
  },
  socket: {
    isSocketFetching: false,
    connected: false,
  },
  device: {
    isFetchingDevice: false,
    hasError: false,
    devices: [],
  },
  subDevice: {
    subDevices: [],
  },
  sharedDevice: {
    sharedDevices: [],
  },
  subDeviceParam: {
    isFetching: false,
    subDeviceParamError: null,
    subDeviceParams: [],
  },
  settingDialog: {
    dialogType: null,
    open: false,
    deviceId: null,
    title: null,
  },
  deviceSetting: {
    isFetching: false,
    settingError: null,
    deviceSettings: [],
  },
  subDeviceSetting: {
    isFetching: false,
    subDeviceSettingError: null,
    subDeviceSettings: [],
  },
  onlineDevice: {
    onlineDevices: [],
  },
  deviceParam: {
    deviceParams: [],
  },
  log: {
    logs: [],
  },
  adminDrawer: {
    open: false,
    show: false,
  },
  siteSetting: {
    burger: false,
  },
  adminUser: {
    count: 0,
    isFetchingUsersList: false,
    users: [],
  },
};

const getStateClone = () => {
  return JSON.parse(JSON.stringify(initialState));
};

const findByDataAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

const findByDataAttrWhenMounted = (component, attr) => {
  return component.find(`[data-test='${attr}']`).hostNodes();
};

const checkProps = (component, expectedProps) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const updateFormikField = async (nativeFieldWrapper, targetName, value) => {
  // simulate focus event
  await act(async () => {
    nativeFieldWrapper.simulate('focus');
  });
  // updates values and errors
  await act(async () => {
    nativeFieldWrapper.simulate('change', {
      persist: () => {},
      target: { name: targetName, value },
    });
  });
  // updates touched
  await act(async () => {
    nativeFieldWrapper.simulate('blur', {
      persist: () => {},
      target: { name: targetName },
    });
  });

  await wait(0);
};

const submitFormikForm = async (nativeFormWrapper, elements = {}) => {
  await act(async () => {
    nativeFormWrapper.simulate('submit', {
      preventDefault: () => {},
      ...elements,
    });
  });
  await wait(0);
};

const clickButton = async nativeButtonWrapper => {
  await act(async () => {
    nativeButtonWrapper.simulate('click', {
      preventDefault: () => {},
    });
  });
  await wait(0);
};

// eslint-disable-next-line no-unused-vars
const mockSuccesfulResponse = (status = 200, method = 'GET', returnBody = {}) =>
  axios[method.toLowerCase()].mockResolvedValue({ status, data: returnBody });

// eslint-disable-next-line no-unused-vars
const mockErrorResponse = (status = 400, method = 'GET', returnBody = {}) =>
  axios[method.toLowerCase()].mockRejectedValue({ response: { status, data: returnBody } });

// eslint-disable-next-line no-unused-vars
const mockEmptyErrorResponse = (status = 400, method = 'GET') => axios[method.toLowerCase()].mockRejectedValue();

// eslint-disable-next-line no-unused-vars
const mockStatusTextErrorResponse = (status = 400, method = 'GET', returnBody = {}) =>
  axios[method.toLowerCase()].mockRejectedValue({ response: { status, statusText: returnBody } });

const simulateSelectChange = (selectInput, name, value) => {
  act(() => {
    selectInput.props().onChange({
      persist: () => {},
      target: { name, value },
    });
  });
};

module.exports = {
  initialState,
  getStateClone,
  findByDataAttr,
  checkProps,
  findByDataAttrWhenMounted,
  wait,
  updateFormikField,
  submitFormikForm,
  clickButton,
  mockSuccesfulResponse,
  mockErrorResponse,
  mockEmptyErrorResponse,
  mockStatusTextErrorResponse,
  simulateSelectChange,
};
