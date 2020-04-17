import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { shallow } from 'enzyme';
import React from 'react';
import { checkProps, findByDataAttr } from '../../_utils';
import ListItemLink from './listItemLink';

const props = {
  icon: <SupervisorAccountIcon />,
  primary: 'some link',
  to: '/somepath',
};

describe('ListItemLink', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(ListItemLink, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Checking Component', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<ListItemLink {...props} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should render listItemContainer without error', () => {
      const component = findByDataAttr(wrapper, 'listItemContainer');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemComponent without error', () => {
      const component = findByDataAttr(wrapper, 'listItemComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemIconComponent without error', () => {
      const component = findByDataAttr(wrapper, 'listItemIconComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });

    it('should render listItemTextComponent without error', () => {
      const component = findByDataAttr(wrapper, 'listItemTextComponent');
      expect(component.length).toBeGreaterThanOrEqual(1);
    });
  });
});
