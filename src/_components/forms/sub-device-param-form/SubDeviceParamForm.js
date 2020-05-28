import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
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

export const SimpleSubDeviceParamForm = props => {
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, submitButtonTitle, onExited } = props;

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
          id="paramName"
          label="Param Name"
          type="text"
          name="paramName"
          autoComplete="paramName"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors.paramName && touched.paramName}
          helperText={errors.paramName && touched.paramName && errors.paramName}
          data-test="paramNameInput"
          value={values.paramName}
        />
        <TextField
          className={classes.textField}
          margin="normal"
          required
          fullWidth
          id="paramValue"
          label="Param Value"
          type="text"
          name="paramValue"
          autoComplete="paramValue"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors.paramValue && touched.paramValue}
          helperText={errors.paramValue && touched.paramValue && errors.paramValue}
          data-test="paramValueInput"
          value={values.paramValue}
        />
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
    const { isDisabled, paramValue, paramName } = params;
    return { paramName, paramValue, isDisabled };
  }
  return { paramName: '', paramValue: '', isDisabled: false };
};

export const SubDeviceParamForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, params }) => getInitialValues(params, isEdit),
  validationSchema: () =>
    yup.object().shape({
      paramName: yup
        .string()
        .required(`Please enter param name`)
        .min(1),
      paramValue: yup
        .string()
        .required(`Please enter param value`)
        .min(1),
      isDisabled: yup.bool().required(),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(values);
  },
  displayName: 'subDeviceParamForm',
})(SimpleSubDeviceParamForm);

SimpleSubDeviceParamForm.propTypes = {
  classes: PropTypes.shape({
    form: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onExited: PropTypes.func,
};

export default SubDeviceParamForm;
