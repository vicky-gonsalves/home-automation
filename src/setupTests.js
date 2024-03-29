// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import Enzyme from 'enzyme';
import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

require('jest-localstorage-mock');
// import '@testing-library/jest-dom/extend-expect';
configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
