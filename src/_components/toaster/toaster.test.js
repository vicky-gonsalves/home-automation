import { shallow } from 'enzyme';
import React from 'react';
import { findByDataAttr } from '../../_utils';
import { Toaster } from './toaster';

const props = {
  'data-test': '',
  loginError: '',
  settingError: '',
  subDeviceSettingError: '',
  subDeviceParamError: '',
  clearLoginError: jest.fn(),
  clearDeviceSettingError: jest.fn(),
  clearSubDeviceSettingError: jest.fn(),
  clearSubDeviceParamError: jest.fn(),
};

describe('Toaster Component', () => {
  describe('Store checks', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Toaster {...props} />);
    });

    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'toaster');
      expect(component.length).toBe(1);
    });

    it('should set state open true', () => {
      wrapper.setProps({ loginError: 'Error', open: false });
      wrapper.instance().componentDidUpdate();
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      expect(wrapper.props().open).toBe(true);
    });

    it('should call setLoginError and set state open to false', () => {
      wrapper.setState({ open: true });
      wrapper.setProps({ loginError: 'Error' });
      wrapper.instance().handleClose();
      expect(props.clearLoginError).toHaveBeenCalled();
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      expect(wrapper.props().open).toBe(false);
    });
  });
});
