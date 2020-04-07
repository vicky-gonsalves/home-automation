import faker from 'faker';
import uniqid from 'uniqid';
import { deviceOne, deviceTwo } from './device.fixture';
import { admin, userOne } from './user.fixture';

const socketUserType = ['device', 'user'];
const socketUserIdType = ['deviceId', 'email'];
const email1 = admin.email;
const email2 = userOne.email;

const socketIdOne = {
  id: uniqid(),
  type: socketUserType[0],
  idType: socketUserIdType[0],
  bindedTo: deviceOne.deviceId,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

const socketIdTwo = {
  id: uniqid(),
  type: socketUserType[1],
  idType: socketUserIdType[1],
  bindedTo: email1,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

const socketIdThree = {
  id: uniqid(),
  type: socketUserType[1],
  idType: socketUserIdType[1],
  bindedTo: email1,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

const socketIdFour = {
  id: uniqid(),
  type: socketUserType[1],
  idType: socketUserIdType[1],
  bindedTo: email2,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

const socketIdFive = {
  id: uniqid(),
  type: socketUserType[1],
  idType: socketUserIdType[1],
  bindedTo: email2,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

// -----------------------deviceTwo---------------------------

const socketIdSix = {
  id: uniqid(),
  type: socketUserType[0],
  idType: socketUserIdType[0],
  bindedTo: deviceTwo.deviceId,
  isDisabled: false,
  socketId: faker.random.uuid(),
};

module.exports = {
  socketIdOne,
  socketIdTwo,
  socketIdThree,
  socketIdFour,
  socketIdFive,
  socketIdSix,
};
