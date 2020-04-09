import uniqid from 'uniqid';
import { deviceFour, deviceOne, deviceTwo } from './device.fixture';
import { admin, userOne } from './user.fixture';

const subDeviceType = ['motorSwitch', 'switch', 'camera'];
const email1 = admin.email;
const email2 = userOne.email;
const type1 = subDeviceType[0];
const type2 = subDeviceType[1];

const subDeviceOne = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: uniqid(),
  name: 'ASomeName',
  type: type1,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceTwo = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: uniqid(),
  name: 'BSomeOtherName',
  type: type1,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceThree = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: uniqid(),
  name: 'CSomething',
  type: type2,
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const subDeviceFour = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: uniqid(),
  name: 'DSomeMore',
  type: type2,
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const subDeviceFive = {
  id: uniqid(),
  deviceId: deviceFour.deviceId,
  subDeviceId: uniqid(),
  name: 'ESomeMore',
  type: type2,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSix = {
  id: uniqid(),
  deviceId: deviceFour.deviceId,
  subDeviceId: uniqid(),
  name: 'FSomeMore',
  type: type2,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const subDeviceSeven = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: uniqid(),
  name: 'FSomeMore',
  type: type1,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

module.exports = {
  subDeviceOne,
  subDeviceTwo,
  subDeviceThree,
  subDeviceFour,
  subDeviceFive,
  subDeviceSix,
  subDeviceSeven,
};
