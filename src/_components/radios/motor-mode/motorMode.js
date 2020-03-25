import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions/sub-device-param.actions';

const useStyles = makeStyles(theme => ({
  mode: {
    margin: theme.spacing(1, 0),
  },
}));

const MotorMode = props => {
  let thisSubDeviceParams;
  const classes = useStyles();
  const dispatch = useDispatch();
  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );

  const filterSubDeviceParams = () =>
    subDeviceParams.filter(
      subDeviceParam =>
        subDeviceParam.paramName &&
        subDeviceParam.paramValue &&
        subDeviceParam.deviceId === props.deviceId &&
        subDeviceParam.subDeviceId === props.subDeviceId &&
        subDeviceParam.paramName === 'mode'
    );

  if (props.deviceId && props.subDeviceId) {
    thisSubDeviceParams = filterSubDeviceParams();
  }

  const handleRadioChange = event => {
    const _subDeviceParam = thisSubDeviceParams[0];
    _subDeviceParam.paramValue = event.target.value;
    // const subDeviceParam = _subDeviceParam;
    // subDeviceParam.paramValue = _subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch(subDeviceParamActions.updateSubDeviceParamMode(_subDeviceParam));
  };

  //
  // const [state, setState] = useState({
  //   mode: 'automatic',
  // });
  //
  // const handleRadioChange = event => {
  //   setState({ ...state, mode: event.target.value });
  // };

  return (
    <React.Fragment>
      {thisSubDeviceParams && thisSubDeviceParams[0] && thisSubDeviceParams[0].paramValue && (
        <FormControl component="fieldset" className={classes.mode}>
          <FormLabel component="legend">Motor Mode</FormLabel>
          <RadioGroup
            aria-label="mode"
            name="mode"
            value={thisSubDeviceParams[0].paramValue}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel value="automatic" control={<Radio color="primary" />} label="Automatic" labelPlacement="end" />
            <FormControlLabel value="manual" control={<Radio color="primary" />} label="Manual" labelPlacement="end" />
          </RadioGroup>
        </FormControl>
      )}
    </React.Fragment>
  );
};

export default MotorMode;
