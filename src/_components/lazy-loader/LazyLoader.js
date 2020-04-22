import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import AppSpinner from '../app-spinner/appSpinner';

const LazyLoader = Component => {
  return props => (
    <Suspense fallback={<AppSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

LazyLoader.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default LazyLoader;
