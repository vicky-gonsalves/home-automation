import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subDeviceParamActions } from '../../../_actions';

const SmartSwitch = ({ deviceId, name, show, subDeviceId }) => {
  let thisSubDeviceParams;
  const dispatch = useDispatch();
  const subDeviceParams = useSelector(state =>
    state && state.subDeviceParam && state.subDeviceParam.subDeviceParams ? state.subDeviceParam.subDeviceParams : []
  );
  const allSubDeviceParams = subDeviceParams.filter(
    subDeviceParam => subDeviceParam.deviceId === deviceId && subDeviceParam.paramName === 'status'
  );
  const allStatus = allSubDeviceParams.filter(subDeviceParam => subDeviceParam.paramValue === 'on');

  const filterSubDeviceParams = () =>
    subDeviceParams.filter(
      subDeviceParam =>
        subDeviceParam.paramName &&
        subDeviceParam.paramValue &&
        subDeviceParam.deviceId === deviceId &&
        subDeviceParam.subDeviceId === subDeviceId &&
        subDeviceParam.paramName === 'status'
    );

  if (deviceId && subDeviceId) {
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
    dispatch(subDeviceParamActions.updateAllSubDeviceParamStatus(deviceId, status));
  };

  const renderSwitch =
    (show && name === 'All' && allSubDeviceParams.length > 1) || (name !== 'All' && deviceId && subDeviceId);

  return (
    <React.Fragment>
      {name !== 'All' && thisSubDeviceParams && thisSubDeviceParams.length <= 0 && (
        <Alert severity="error">It seems there is some issue with device. Please contact administrator!</Alert>
      )}
      {renderSwitch && (
        <div>
          <EmojiObjectsIcon
            fontSize="large"
            color={
              (name === 'All' && deviceId && isAllOn()) ||
              (name !== 'All' &&
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
                  label={name}
                  labelPlacement="bottom"
                />
              </Grid>
            )}
            {name === 'All' && renderSwitch && (
              <Grid item xs={12}>
                <FormControlLabel
                  value="true"
                  control={<Switch color="primary" checked={isAllOn()} onChange={handleAllChange} />}
                  label={name}
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
