import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import * as yup from 'yup';
import OverlayLoading from '../../overlay-loading/OverlayLoading';

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    width: '100%', // Fix IE 11 issue.
    marginTop: '0',
  },
  textField: {
    fontSize: 14,
    width: '100%',
    height: '65px',
    marginTop: '0',
  },
  select: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  switch: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    width: 100,
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  dialogAction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export const SimpleSubDeviceForm = props => {
  const classes = useStyles();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isFetching,
    handleSubmit,
    submitButtonTitle,
    onExited,
    params,
  } = props;

  const renderMenuItems = useMemo(
    () => () => {
      let types = ['camera'];
      if (params && params.variant) {
        if (params.variant === 'smartSwitch') {
          types = ['switch'];
        } else if (params.variant === 'tank') {
          types = ['motorSwitch'];
        }
      }
      return types.map(type => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ));
    },
    [params]
  );

  const renderOverlay = () => {
    if (isFetching) {
      return <OverlayLoading data-test="overlayComponent" />;
    }
  };

  const handleCancel = () => {
    if (onExited && typeof onExited === 'function') {
      onExited();
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      {renderOverlay()}
      <React.Fragment>
        <TextField
          className={classes.textField}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
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
        <FormControl className={classes.formControl} error={errors.type && touched.type}>
          <InputLabel id="roleLabel">Type</InputLabel>
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
          >
            <MenuItem value="" disabled>
              Type
            </MenuItem>
            {renderMenuItems()}
          </Select>
          <FormHelperText>{errors.type && touched.type && errors.type}</FormHelperText>
        </FormControl>
        <FormControl component="fieldset" className={classes.switch}>
          <FormLabel component="legend">Disabled?</FormLabel>
          <Switch
            checked={values.isDisabled}
            onChange={handleChange}
            name="isDisabled"
            id="isDisabled"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </FormControl>
        <div className={classes.dialogAction}>
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
          <Button type="button" disabled={isFetching} onClick={handleCancel} data-test="cancelButton">
            <span>Cancel</span>
          </Button>
        </div>
      </React.Fragment>
    </form>
  );
};

const getInitialValues = (params, isEdit) => {
  if (params && isEdit) {
    const { isDisabled, type, name } = params;
    return { name, type, isDisabled };
  }
  let type = 'camera';
  if (params && params.variant) {
    if (params.variant === 'smartSwitch') {
      type = 'switch';
    } else if (params.variant === 'tank') {
      type = 'motorSwitch';
    }
  }
  return { name: '', type, isDisabled: false };
};

export const SubDeviceForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, params }) => getInitialValues(params, isEdit),
  validationSchema: () =>
    yup.object().shape({
      name: yup
        .string()
        .required(`Please enter sub-device name`)
        .min(1),
      type: yup.string().required('Please select type'),
      isDisabled: yup.bool().required(),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(values);
  },
  displayName: 'subDeviceForm',
})(SimpleSubDeviceForm);

SimpleSubDeviceForm.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onExited: PropTypes.func,
};

export default SubDeviceForm;
