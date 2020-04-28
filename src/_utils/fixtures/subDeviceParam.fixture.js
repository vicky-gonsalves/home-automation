/* istanbul ignore file */
import uniqid from 'uniqid';
import { deviceFour, deviceOne, deviceTwo } from './device.fixture';
import { subDeviceFive, subDeviceFour, subDeviceOne, subDeviceSix, subDeviceThree, subDeviceTwo } from './subDevice.fixture';
import { admin, userOne } from './user.fixture';

const email1 = admin.email;
const email2 = userOne.email;

const subDeviceParamOne = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  paramName: 'waterLevel',
  paramValue: 50,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamTwo = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceTwo.subDeviceId,
  paramName: 'lastFilledAt',
  paramValue: '2020-02-21T08:46:06.124Z',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamThree = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamFour = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceThree.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const subDeviceParamFive = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceFour.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const subDeviceParamSix = {
  id: uniqid(),
  deviceId: deviceFour.deviceId,
  subDeviceId: subDeviceFive.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamSeven = {
  id: uniqid(),
  deviceId: deviceFour.deviceId,
  subDeviceId: subDeviceFive.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamEight = {
  id: uniqid(),
  deviceId: deviceFour.deviceId,
  subDeviceId: subDeviceSix.subDeviceId,
  paramName: 'status',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamNine = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  paramName: 'mode',
  paramValue: 'automatic',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceParamTen = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceFour.subDeviceId,
  paramName: 'fake',
  paramValue: 'off',
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

module.exports = {
  subDeviceParamOne,
  subDeviceParamTwo,
  subDeviceParamThree,
  subDeviceParamFour,
  subDeviceParamFive,
  subDeviceParamSix,
  subDeviceParamSeven,
  subDeviceParamEight,
  subDeviceParamNine,
  subDeviceParamTen,
};
