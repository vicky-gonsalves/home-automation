import { deviceOne, deviceTwo } from './device.fixture';
import { userOne, admin } from './user.fixture';
import uniqid from 'uniqid';

const email1 = `device@${deviceOne.deviceId}.com`;
const email2 = `device@${deviceTwo.deviceId}.com`;
const email3 = userOne.email;
const email4 = admin.email;

const deviceParamOne = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  paramName: 'waterLevel',
  paramValue: 50,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceParamTwo = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  paramName: 'waterHeight',
  paramValue: 104,
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceParamThree = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  paramName: 'waterHeight',
  paramValue: 104,
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const deviceParamFour = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  paramName: 'waterHeight',
  paramValue: 104,
  isDisabled: false,
  createdBy: email3,
  updatedBy: email3,
};

const deviceParamFive = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  paramName: 'waterHeight',
  paramValue: 104,
  isDisabled: false,
  createdBy: email4,
  updatedBy: email4,
};

const deviceParamSix = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  paramName: 'waterLevel',
  paramValue: 50,
  isDisabled: false,
  createdBy: email4,
  updatedBy: email4,
};

module.exports = {
  deviceParamOne,
  deviceParamTwo,
  deviceParamThree,
  deviceParamFour,
  deviceParamFive,
  deviceParamSix,
};
