import { shallow } from 'enzyme';
import React from 'react';
import { findByDataAttr } from '../../_utils';
import AppSpinner from './appSpinner';

describe('AppSpinner', function() {
  it('should render appSpinner', () => {
    const wrapper = shallow(<AppSpinner />);
    const component = findByDataAttr(wrapper, 'appSpinner');
    expect(component).toHaveLength(1);
  });
});
