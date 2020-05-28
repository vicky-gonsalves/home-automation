import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withFormik } from 'formik';
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

export const SimpleSharedDeviceAccessForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const adminUserContext = useContext(AdminUserContext);
  const adminUser = adminUserContext.adminUser;
  const isFetchingEmail = adminUser.isFetchingUsersList;
  const [emailOpen, setEmailOpen] = React.useState(false);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    submitButtonTitle,
    isFetching,
    setFieldTouched,
    onExited,
    isEdit,
  } = props;

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

  const handleEmailInputChange = useMemo(
    () => (event, value) => {
      adminUserActions.clearUser(dispatch); // Cleanup
      if (value === '') {
        // on clear
        values.email = '';
      } else {
        setFieldTouched('email', false, false);
        let searchFilter = {};
        if (value.length > 0) {
          searchFilter = { email: value };
          values.email = value;
        }
        if (emailOpen) {
          getList(`email:asc`, 10, 1, searchFilter);
        }
      }
    },
    [emailOpen, dispatch, getList, setFieldTouched, values.email]
  );

  const validEmail = () =>
    adminUser.users && adminUser.users.length && adminUser.users.filter(user => user.email === values.email).length > -1;

  const handleEmailOnBlur = () => {
    if (!validEmail()) {
      values.email = '';
      adminUserActions.clearUser(dispatch); // Cleanup
    }
    setFieldTouched('email', true, true);
  };

  const handleCancel = () => {
    if (onExited && typeof onExited === 'function') {
      onExited();
    }
  };

  // just for autocomplete
  useEffect(() => {
    if (emailOpen) {
      adminUserActions.clearUser(dispatch); // Cleanup
      getList(`email:asc`, 10, 1, {});
    }
  }, [emailOpen, dispatch, getList]);

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      {renderOverlay()}
      <React.Fragment>
        <FormControl className={classes.formControl} error={errors.email && touched.email}>
          <Autocomplete
            id="email"
            name="email"
            onInputChange={handleEmailInputChange}
            onChange={(event, value) => {
              if (value && value.email && validEmail()) {
                values.email = value.email;
              }
            }}
            open={emailOpen}
            value={values.email || null}
            filterOptions={x => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            getOptionLabel={option => (typeof option === 'string' ? option : option.email)}
            options={adminUser.users}
            onOpen={() => {
              setEmailOpen(true);
            }}
            onClose={() => {
              setEmailOpen(false);
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
            loading={isFetchingEmail}
            disabled={isEdit || isFetching}
            renderInput={params => (
              <TextField
                {...params}
                label="User"
                error={errors.email && touched.email}
                onBlur={handleEmailOnBlur}
                disabled={isEdit || isFetching}
                InputProps={{
                  ...params.InputProps,
                  autoComplete: 'disabled',
                  endAdornment: (
                    <React.Fragment>
                      {isFetchingEmail ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <FormHelperText>{errors.email && touched.email && errors.email}</FormHelperText>
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
    const { isDisabled, email } = params;
    return { email, isDisabled };
  }
  return { email: '', isDisabled: false };
};

export const SharedDeviceAccessForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ isEdit, params }) => getInitialValues(params, isEdit),
  validationSchema: () =>
    yup.object().shape({
      email: yup
        .string()
        .email()
        .required('Please select user from the dropdown list'),
      isDisabled: yup.bool().required(),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(values);
  },
  displayName: 'sharedDeviceAccessForm',
})(SimpleSharedDeviceAccessForm);

SimpleSharedDeviceAccessForm.propTypes = {
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

export default SharedDeviceAccessForm;
