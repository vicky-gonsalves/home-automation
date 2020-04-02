import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const CountDownTimer = props => {
  const ref = useRef(null);
  const [endsAt, setEndsAt] = useState();
  ref.current = { endsAt, setEndsAt };

  const getRemainingTime = () => {
    let remainingTime = '';
    const time = moment.duration(ref.current.endsAt);
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
      ref.current.setEndsAt(props.endTime.diff(moment(), 'milliseconds'));
    }, 1000);
    return () => {
      clearInterval(endsAtInterval);
    };
  }, [props.endTime]);

  ref.current.endsAt = props.endTime.diff(moment(), 'milliseconds');
  return <React.Fragment>{getRemainingTime()}</React.Fragment>;
};

export default CountDownTimer;
