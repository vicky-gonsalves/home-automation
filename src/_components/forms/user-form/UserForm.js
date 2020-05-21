import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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
import { withFormik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';
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

export const SimpleUserForm = props => {
  const classes = useStyles();
  const roles = ['admin', 'user'];
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isFetching,
    handleSubmit,
    submitButtonTitle,
    user,
    isEdit,
  } = props;

  const renderMenuItems = () =>
    roles.map(role => (
      <MenuItem key={role} value={role}>
        {role}
      </MenuItem>
    ));

  const renderOverlay = () => {
    if (isFetching) {
      return <OverlayLoading data-test="overlayComponent" />;
    }
  };

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
          </Grid>
          <Grid item xs={12} xl={6}>
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
          </Grid>
          <Grid item xs={12} xl={6}>
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
                  <div>{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Created By</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{user.createdBy || 'System'}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Last Updated At</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.info}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  <div>Last Updated By</div>
                </Typography>
                <Typography variant="subtitle1" display="block" gutterBottom>
                  <div>{user.updatedBy || 'System'}</div>
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

const getInitialValues = (user, isEdit) => {
  if (user && isEdit) {
    const { isDisabled, role, email, name } = user;
    return { name, email, role, isDisabled };
  }
  return { name: '', email: '', role: '', isDisabled: false };
};

export const UserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, user }) => getInitialValues(user, isEdit),
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
};

export default UserForm;
