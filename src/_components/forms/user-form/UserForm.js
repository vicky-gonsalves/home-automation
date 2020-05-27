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

export const SimpleUserForm = props => {
  const classes = useStyles();
  const roles = ['admin', 'user'];
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, submitButtonTitle, onExited } = props;

  const renderMenuItems = useMemo(
    () => () => {
      return roles.map(role => (
        <MenuItem key={role} value={role}>
          {role}
        </MenuItem>
      ));
    },
    [roles]
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

        <TextField
          className={classes.textField}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          type="text"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
          data-test="emailInput"
          value={values.email}
        />

        <FormControl className={classes.formControl} error={errors.role && touched.role}>
          <InputLabel id="roleLabel">Role</InputLabel>
          <Select
            required
            displayEmpty
            className={classes.select}
            id="role"
            name="role"
            onChange={handleChange}
            disabled={isFetching}
            data-test="emailSelect"
            value={values.role}
            inputProps={{ 'aria-label': 'Role' }}
          >
            <MenuItem value="" disabled>
              Role
            </MenuItem>
            {renderMenuItems()}
          </Select>
          <FormHelperText>{errors.role && touched.role && errors.role}</FormHelperText>
        </FormControl>

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
    const { isDisabled, role, email, name } = params;
    return { name, email, role, isDisabled };
  }
  return { name: '', email: '', role: '', isDisabled: false };
};

export const UserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, params }) => getInitialValues(params, isEdit),
  validationSchema: () =>
    yup.object().shape({
      name: yup
        .string()
        .required(`Please enter name`)
        .min(1),
      email: yup
        .string()
        .email()
        .required('Please enter email address'),
      role: yup.string().required('Please select role'),
      isDisabled: yup.bool().required(),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(values);
  },
  displayName: 'userForm',
})(SimpleUserForm);

SimpleUserForm.propTypes = {
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

export default UserForm;
