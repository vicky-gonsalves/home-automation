import uniqid from 'uniqid';
import { deviceOne, deviceTwo } from './device.fixture';
import { deviceParamOne } from './deviceParam.fixture';
import { subDeviceOne, subDeviceThree } from './subDevice.fixture';
import { admin } from './user.fixture';

const email1 = `device@${deviceOne.deviceId}.com`;
const email2 = `device@${deviceTwo.deviceId}.com`;
const email4 = admin.email;

const logOne = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  logName: 'status_UPDATED',
  logDescription: `${subDeviceOne.name} turned on when water level was ${deviceParamOne.paramValue}%`,
  isDevLog: false,
  createdBy: email4,
  triggeredByDevice: false,
  createdAt: '2020-04-07T15:54:30.719Z',
};

const logTwo = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  logName: 'status_UPDATED',
  logDescription: `${subDeviceOne.name} turned off when water level was ${deviceParamOne.paramValue}%`,
  isDevLog: false,
  createdBy: email4,
  triggeredByDevice: false,
  createdAt: '2020-04-07T16:54:30.719Z',
};

const logThree = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceThree.subDeviceId,
  logName: 'status_UPDATED',
  logDescription: `${subDeviceThree.name} turned on`,
  isDevLog: false,
  createdBy: email4,
  triggeredByDevice: false,
};

const logFour = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceThree.subDeviceId,
  logName: 'status_UPDATED',
  logDescription: `${subDeviceThree.name} turned off`,
  isDevLog: false,
  createdBy: email4,
  triggeredByDevice: false,
};

const logFive = {
  id: uniqid(),
  deviceId: deviceTwo.deviceId,
  subDeviceId: subDeviceThree.subDeviceId,
  logName: 'status_UPDATED',
  logDescription: `${subDeviceThree.name} turned off`,
  isDevLog: false,
  createdBy: email2,
  triggeredByDevice: true,
};

const logSix = {
  id: uniqid(),
  deviceId: deviceOne.deviceId,
  subDeviceId: subDeviceOne.subDeviceId,
  logName: 'waterLevel_UPDATED',
  logDescription: `${subDeviceOne.name} turned on when water level was ${deviceParamOne.paramValue}%`,
  isDevLog: true,
  createdBy: email1,
  triggeredByDevice: true,
};

module.exports = {
  logOne,
  logTwo,
  logThree,
  logFour,
  logFive,
  logSix,
};
