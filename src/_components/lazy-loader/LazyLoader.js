import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import AppSpinner from '../app-spinner/appSpinner';

const LazyLoader = Component => {
  if (Component && typeof Component === 'object') {
    return props => (
      <Suspense fallback={<AppSpinner />} data-test="suspenseComponent">
        <Component {...props} />
      </Suspense>
    );
  }
  return null;
};

LazyLoader.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default LazyLoader;
