import PropTypes from 'prop-types';
import React from 'react';
import './tank.scss';

const Tank = props => {
  return (
    <div className="tank">
      <div className="bowl">
        <div className="inner">
          <div className="fill" style={{ transform: `translate(0,${100 - (100 * props.waterLevel) / 100}px)` }}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100px"
              height="100px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 100 100"
              xmlSpace="preserve"
            >
              <path
                className="waveShape"
                d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
              />
            </svg>
          </div>
        </div>
      </div>
      <h1 className="overlap">{props.waterLevel}%</h1>
    </div>
  );
};

Tank.propTypes = {
  waterLevel: PropTypes.number,
};

export default Tank;
