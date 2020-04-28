/* istanbul ignore file */
import uniqid from 'uniqid';
import { subDeviceFive, subDeviceFour, subDeviceSix, subDeviceThree } from './subDevice.fixture';
import { deviceFour, deviceTwo } from './device.fixture';
import { admin } from './user.fixture';

const subDeviceSettingType = ['device', 'subDevice', 'user'];
const idType = ['deviceId', 'subDeviceId', 'email'];
const email1 = admin.email;

const subDeviceSettingOne = {
  id: uniqid(),
  type: subDeviceSettingType[1],
  idType: idType[1],
  bindedTo: subDeviceThree.subDeviceId,
  parent: deviceTwo.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 30,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSettingTwo = {
  id: uniqid(),
  type: subDeviceSettingType[1],
  idType: idType[1],
  bindedTo: subDeviceFour.subDeviceId,
  parent: deviceTwo.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 0,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSettingThree = {
  id: uniqid(),
  type: subDeviceSettingType[1],
  idType: idType[1],
  bindedTo: subDeviceFive.subDeviceId,
  parent: deviceFour.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 0,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSettingFour = {
  id: uniqid(),
  type: subDeviceSettingType[1],
  idType: idType[1],
  bindedTo: subDeviceSix.subDeviceId,
  parent: deviceFour.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 30,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSettingFive = {
  id: uniqid(),
  type: subDeviceSettingType[1],
  idType: idType[1],
  bindedTo: subDeviceThree.subDeviceId,
  parent: deviceTwo.deviceId,
  paramName: 'someFakeSetting',
  paramValue: 30,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

module.exports = {
  subDeviceSettingOne,
  subDeviceSettingTwo,
  subDeviceSettingThree,
  subDeviceSettingFour,
  subDeviceSettingFive,
};
