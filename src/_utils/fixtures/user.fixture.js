/* istanbul ignore file */
import faker from 'faker';

const userOne = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  role: 'user',
};

const userTwo = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  role: 'user',
};

const admin = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  role: 'admin',
};

module.exports = {
  userOne,
  userTwo,
  admin,
};
