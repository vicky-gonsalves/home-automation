import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withFormik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { adminUserActions } from '../../../_actions';
import { AdminUserContext } from '../../../_contexts/admin-user/AdminUserContext.provider';
import OverlayLoading from '../../overlay-loading/OverlayLoading';

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    width: '100%', // Fix IE 11 issue.
    padding: theme.spacing(0, 2),
  },
  textField: {
    fontSize: 14,
    width: '100%',
  },
  select: {
    width: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    width: 150,
  },
  info: {
    marginBottom: theme.spacing(2),
  },
}));

export const SimpleDeviceForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminUserContext = useContext(AdminUserContext);
  const adminUser = adminUserContext.adminUser;
  const deviceTypes = ['arduino', 'raspberrypi', 'nodeMCU'];
  const deviceVariants = ['tank', 'smartSwitch'];
  const isFetchingDeviceOwner = adminUser.isFetchingUsersList;
  const [deviceOwnerOpen, setDeviceOwnerOpen] = React.useState(false);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitButtonTitle,
    device,
    isEdit,
    isFetching,
    setFieldTouched,
  } = props;

  const renderDeviceTypesItems = () =>
    deviceTypes.map(type => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ));

  const renderDeviceVariantsItems = () =>
    deviceVariants.map(variant => (
      <MenuItem key={variant} value={variant}>
        {variant}
      </MenuItem>
    ));

  const renderOverlay = () => {
    if (isFetching) {
      return <OverlayLoading data-test="overlayComponent" />;
    }
  };

  const getList = useMemo(
    () => (sortBy, limit, page, searchFilter) => {
      const fetchList = () => {
        dispatch(adminUserActions.getUsers({ sortBy, limit, page, ...searchFilter }));
      };
      fetchList();
    },
    [dispatch]
  );

  const handleDeviceOwnerInputChange = useMemo(
    () => (event, value) => {
      adminUserActions.clearUser(dispatch); // Cleanup
      if (value === '') {
        // on clear
        values.deviceOwner = '';
      } else {
        setFieldTouched('deviceOwner', false, false);
        let searchFilter = {};
        if (value.length > 0) {
          searchFilter = { email: value };
          values.deviceOwner = value;
        }
        if (deviceOwnerOpen) {
          getList(`deviceOwner:asc`, 10, 1, searchFilter);
        }
      }
    },
    [deviceOwnerOpen, dispatch, getList, setFieldTouched, values.deviceOwner]
  );

  const validDeviceOwner = () =>
    adminUser.users &&
    adminUser.users.length &&
    adminUser.users.filter(user => user.email === values.deviceOwner).length > -1;

  const handleDeviceOwnerOnBlur = () => {
    if (!validDeviceOwner()) {
      values.deviceOwner = '';
      adminUserActions.clearUser(dispatch); // Cleanup
    }
    setFieldTouched('deviceOwner', true, true);
  };

  // just for autocomplete
  useEffect(() => {
    if (deviceOwnerOpen) {
      adminUserActions.clearUser(dispatch); // Cleanup
      getList(`deviceOwner:asc`, 10, 1, {});
    }
  }, [deviceOwnerOpen, dispatch, getList]);

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      {renderOverlay()}
      <Grid container className={classes.root} spacing={10}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} xl={6}>
            <TextField
              className={classes.textField}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Device Name"
              type="text"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isFetching}
              error={errors.name && touched.name}
              helperText={errors.name && touched.name && errors.name}
              data-test="nameInput"
              value={values.name}
            />
          </Grid>

          <Grid item xs={12} xl={6}>
            <FormControl className={classes.formControl} error={errors.type && touched.type}>
              <InputLabel id="roleLabel">Device Type</InputLabel>
              <Select
                required
                displayEmpty
                className={classes.select}
                id="type"
                name="type"
                onChange={handleChange}
                disabled={isFetching}
                data-test="typeSelect"
                value={values.type}
                inputProps={{ 'aria-label': 'Type' }}
              >
                <MenuItem value="" disabled>
                  Device Type
                </MenuItem>
                {renderDeviceTypesItems()}
              </Select>
              <FormHelperText>{errors.type && touched.type && errors.type}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} xl={6}>
            <FormControl className={classes.formControl} error={errors.variant && touched.variant}>
              <InputLabel id="roleLabel">Device Variant</InputLabel>
              <Select
                required
                displayEmpty
                className={classes.select}
                id="variant"
                name="variant"
                onChange={handleChange}
                disabled={isFetching}
                data-test="variantSelect"
                value={values.variant}
                inputProps={{ 'aria-label': 'Variant' }}
              >
                <MenuItem value="" disabled>
                  Device Variant
                </MenuItem>
                {renderDeviceVariantsItems()}
              </Select>
              <FormHelperText>{errors.variant && touched.variant && errors.variant}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} xl={6}>
            <FormControl className={classes.formControl} error={errors.deviceOwner && touched.deviceOwner}>
              <Autocomplete
                id="deviceOwner"
                name="deviceOwner"
                onInputChange={handleDeviceOwnerInputChange}
                onChange={(event, value) => {
                  if (value && value.email && validDeviceOwner()) {
                    values.deviceOwner = value.email;
                  }
                }}
                open={deviceOwnerOpen}
                value={values.deviceOwner || null}
                filterOptions={x => x}
                autoComplete
                includeInputInList
                filterSelectedOptions
                getOptionLabel={option => (typeof option === 'string' ? option : option.email)}
                options={adminUser.users}
                onOpen={() => {
                  setDeviceOwnerOpen(true);
                }}
                onClose={() => {
                  setDeviceOwnerOpen(false);
                }}
                getOptionSelected={(option, value) => option.email === value.email}
                renderOption={option => (
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <span style={{ fontWeight: 700 }}>{option.name}</span>
                      <Typography variant="body2" color="textSecondary">
                        {option.email}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                loading={isFetchingDeviceOwner}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Device Owner"
                    error={errors.deviceOwner && touched.deviceOwner}
                    onBlur={handleDeviceOwnerOnBlur}
                    InputProps={{
                      ...params.InputProps,
                      autoComplete: 'disabled',
                      endAdornment: (
                        <React.Fragment>
                          {isFetchingDeviceOwner ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <FormHelperText>{errors.deviceOwner && touched.deviceOwner && errors.deviceOwner}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} xl={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Disabled?</FormLabel>
              <Switch
                checked={values.isDisabled}
                onChange={handleChange}
                name="isDisabled"
                id="isDisabled"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {isEdit && (
          <Hidden smDown>
            <Grid item xs={12} md={6}>
              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Created At</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{moment(device.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Created By</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{device.createdBy || 'System'}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Last Updated At</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{moment(device.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Last Updated By</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{device.updatedBy || '-'}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Registered At</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>
                    {device.registeredAt ? moment(device.registeredAt).format('MMMM Do YYYY, h:mm:ss a') : 'Not Registered'}
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Hidden>
        )}

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isFetching}
            data-test="submitButton"
          >
            <span>{submitButtonTitle}</span>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const getInitialValues = (device, isEdit) => {
  if (device && isEdit) {
    const { isDisabled, type, variant, deviceOwner, name } = device;
    return { name, variant, type, deviceOwner, isDisabled };
  }
  return { name: '', variant: '', deviceOwner: '', type: '', isDisabled: false };
};

export const DeviceForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, device }) => getInitialValues(device, isEdit),
  validationSchema: () =>
    yup.object().shape({
      name: yup
        .string()
        .required(`Please enter device name`)
        .min(1),
      type: yup.string().required('Please select device type'),
      variant: yup.string().required('Please select device variant'),
      deviceOwner: yup
        .string()
        .email()
        .required('Please select device owner from the dropdown list'),
      isDisabled: yup.bool().required(),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(values);
  },
  displayName: 'deviceForm',
})(SimpleDeviceForm);

SimpleDeviceForm.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

export default DeviceForm;
