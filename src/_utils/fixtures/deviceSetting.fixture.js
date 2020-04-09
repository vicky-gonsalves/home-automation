import uniqid from 'uniqid';
import { admin } from './user.fixture';
import { deviceOne, deviceTwo, deviceThree, deviceFour } from './device.fixture';
import { subDeviceOne } from './subDevice.fixture';

const deviceSettingType = ['device', 'subDevice', 'user'];
const idType = ['deviceId', 'subDeviceId', 'email'];
const email1 = admin.email;

const deviceSettingOne = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceOne.deviceId,
  paramName: 'preferredSubDevice',
  paramValue: subDeviceOne.subDeviceId,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingTwo = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceOne.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 30,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingThree = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceOne.deviceId,
  paramName: 'waterLevelToStart',
  paramValue: 70,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingFour = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceTwo.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 30,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingFive = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceThree.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 0,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingSix = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceFour.deviceId,
  paramName: 'autoShutDownTime',
  paramValue: 0,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceSettingSeven = {
  id: uniqid(),
  type: deviceSettingType[0],
  idType: idType[0],
  bindedTo: deviceOne.deviceId,
  paramName: 'someFakeSetting',
  paramValue: 0,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

module.exports = {
  deviceSettingOne,
  deviceSettingTwo,
  deviceSettingThree,
  deviceSettingFour,
  deviceSettingFive,
  deviceSettingSix,
  deviceSettingSeven,
};
