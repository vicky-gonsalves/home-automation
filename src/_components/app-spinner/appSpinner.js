import React from 'react';
import './AppSpinner.scss';

const AppSpinner = () => {
  return (
    <div id="loader" data-test="appSpinner">
      <div className="center">
        <div className="logo" />
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSpinner;
