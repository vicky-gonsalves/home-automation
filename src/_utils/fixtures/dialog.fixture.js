/* istanbul ignore file */
import { deviceOne, deviceTwo } from './device.fixture';

const dialogOne = {
  dialogType: 'tank',
  open: true,
  deviceId: deviceOne.deviceId,
  title: `${deviceOne.name}`,
};
const dialogTwo = {
  dialogType: 'smartSwitch',
  open: true,
  deviceId: deviceTwo.deviceId,
  title: `${deviceTwo.name}`,
};

module.exports = {
  dialogOne,
  dialogTwo,
};
