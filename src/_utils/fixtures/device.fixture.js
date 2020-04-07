import uniqid from 'uniqid';
import { admin, userOne } from './user.fixture';

const deviceType = ['arduino', 'raspberrypi', 'nodeMCU'];
const deviceVariant = ['tank', 'smartSwitch'];
const email1 = admin.email;
const email2 = userOne.email;

const deviceOne = {
  id: uniqid(),
  deviceId: uniqid(),
  name: 'Motor',
  type: deviceType[0],
  variant: deviceVariant[0],
  deviceOwner: email1,
  registeredAt: '2020-02-20T10:17:46.820Z',
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

const deviceTwo = {
  id: uniqid(),
  deviceId: uniqid(),
  name: 'Light',
  type: deviceType[1],
  variant: deviceVariant[1],
  deviceOwner: email2,
  registeredAt: new Date().toISOString(),
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const deviceThree = {
  id: uniqid(),
  deviceId: uniqid(),
  name: 'Light',
  type: deviceType[1],
  variant: deviceVariant[1],
  deviceOwner: email2,
  registeredAt: new Date().toISOString(),
  isDisabled: false,
  createdBy: email2,
  updatedBy: email2,
};

const deviceFour = {
  id: uniqid(),
  deviceId: uniqid(),
  name: 'Light',
  type: deviceType[2],
  variant: deviceVariant[1],
  deviceOwner: email1,
  registeredAt: new Date().toISOString(),
  isDisabled: false,
  createdBy: email1,
  updatedBy: email1,
};

module.exports = {
  deviceOne,
  deviceTwo,
  deviceThree,
  deviceFour,
};
