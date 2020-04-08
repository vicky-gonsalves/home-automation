import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const CountDownTimer = ({ endTime }) => {
  const ref = useRef(null);
  const [endsAt, setEndsAt] = useState();
  // noinspection JSValidateTypes
  ref.current = { endsAt, setEndsAt };

  const getRemainingTime = () => {
    let remainingTime = '';
    const { endsAt: endsAtTime } = ref.current;
    const time = moment.duration(endsAtTime);
    const generateTimeString = (timeEntity, timeName) => {
      remainingTime += remainingTime === '' ? '' : ', ';
      remainingTime += `${timeEntity} ${timeEntity > 1 ? timeName + 's' : timeName}`;
    };

    const timeNameObject = {
      year: time.years(),
      month: time.months(),
      day: time.days(),
      hour: time.hours(),
      minute: time.minutes(),
      second: time.seconds(),
    };

    for (const key in timeNameObject) {
      if (key && timeNameObject[key] && timeNameObject[key] > 0) {
        generateTimeString(timeNameObject[key], key);
      }
    }
    return remainingTime === '' ? 'in few moments' : `in ${remainingTime}`;
  };

  useEffect(() => {
    const endsAtInterval = setInterval(() => {
      // noinspection JSUnresolvedFunction
      ref.current.setEndsAt(endTime.diff(moment(), 'milliseconds'));
    }, 1000);
    return () => {
      clearInterval(endsAtInterval);
    };
  }, [endTime]);

  ref.current.endsAt = endTime.diff(moment(), 'milliseconds');
  return <span data-test="countDownTimerComponent">{getRemainingTime()}</span>;
};

CountDownTimer.propTypes = {
  endTime: PropTypes.object.isRequired,
};

export default CountDownTimer;
