import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions';

const SmartSwitch = props => {
  let thisSubDeviceParams;
  const dispatch = useDispatch();
  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );
  const allSubDeviceParams = subDeviceParams.filter(
    subDeviceParam => subDeviceParam.deviceId === props.deviceId && subDeviceParam.paramName === 'status'
  );
  const allStatus = allSubDeviceParams.filter(subDeviceParam => subDeviceParam.paramValue === 'on');

  const filterSubDeviceParams = () =>
    subDeviceParams.filter(
      subDeviceParam =>
        subDeviceParam.paramName &&
        subDeviceParam.paramValue &&
        subDeviceParam.deviceId === props.deviceId &&
        subDeviceParam.subDeviceId === props.subDeviceId &&
        subDeviceParam.paramName === 'status'
    );

  if (props.deviceId && props.subDeviceId) {
    thisSubDeviceParams = filterSubDeviceParams();
  }

  const handleChange = _subDeviceParam => () => {
    const subDeviceParam = _subDeviceParam;
    subDeviceParam.paramValue = _subDeviceParam.paramValue === 'off' ? 'on' : 'off';
    dispatch(subDeviceParamActions.updateSubDeviceParamStatus(subDeviceParam));
  };

  const isAllOn = () => allSubDeviceParams.length > 0 && allSubDeviceParams.length === allStatus.length;

  const handleAllChange = () => {
    let status = 'off';
    if (!isAllOn()) {
      status = 'on';
    }
    dispatch(subDeviceParamActions.updateAllSubDeviceParamStatus(props.deviceId, status));
  };

  const renderSwitch =
    (props.show && props.name === 'All' && allSubDeviceParams.length > 1) ||
    (props.name !== 'All' && props.deviceId && props.subDeviceId);

  return (
    <React.Fragment>
      {renderSwitch && (
        <div>
          <EmojiObjectsIcon
            fontSize="large"
            color={
              (props.name === 'All' && props.deviceId && isAllOn()) ||
              (props.name !== 'All' &&
                thisSubDeviceParams &&
                thisSubDeviceParams.length > 0 &&
                thisSubDeviceParams[0].paramValue === 'on')
                ? 'secondary'
                : 'disabled'
            }
          />
        </div>
      )}
      <div>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={2}>
            {thisSubDeviceParams && thisSubDeviceParams.length > 0 && (
              <Grid key={thisSubDeviceParams[0].subDeviceId + thisSubDeviceParams[0].paramName} item xs={12}>
                <FormControlLabel
                  value="true"
                  control={
                    <Switch
                      color="primary"
                      checked={thisSubDeviceParams[0].paramValue === 'on'}
                      onChange={handleChange(thisSubDeviceParams[0])}
                    />
                  }
                  label={props.name}
                  labelPlacement="bottom"
                />
              </Grid>
            )}
            {props.name === 'All' && renderSwitch && (
              <Grid item xs={12}>
                <FormControlLabel
                  value="true"
                  control={<Switch color="primary" checked={isAllOn()} onChange={handleAllChange} />}
                  label={props.name}
                  labelPlacement="bottom"
                />
              </Grid>
            )}
          </Grid>
        </Typography>
      </div>
    </React.Fragment>
  );
};

SmartSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired,
  subDeviceId: PropTypes.string,
  show: PropTypes.bool,
};

export default SmartSwitch;
