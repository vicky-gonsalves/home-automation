import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: 0,
    padding: 0,
    height: theme.spacing(2),
    marginTop: theme.spacing(-2),
  },
  input: {
    fontSize: 14,
  },
  select: {
    fontSize: 14,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  noLabel: {
    marginTop: theme.spacing(0),
  },
}));

export const SimpleTableSearchForm = props => {
  const classes = useStyles();
  const { values, touched, errors, handleChange, handleBlur, isFetching, handleSubmit, headCell, handleCancel } = props;

  const renderInput = () => {
    if (headCell.type === 'text' || headCell.type === 'number' || headCell.type === 'email') {
      return (
        <Input
          autoFocus
          style={{ minWidth: headCell.width - 100 }}
          className={classes.input}
          required
          placeholder={headCell.label}
          type={headCell.type}
          id={headCell.id}
          name={headCell.id}
          label={headCell.label}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isFetching}
          error={errors[headCell.id] && touched[headCell.id]}
          data-test="tableSearchFormFieldInput"
        />
      );
    }
  };

  const renderSelect = () => {
    const renderMenuItems = () => {
      return headCell.options.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ));
    };
    if (headCell.type === 'select' && headCell.options && headCell.options.length) {
      return (
        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
          <Select
            required
            displayEmpty
            className={classes.select}
            id={headCell.id}
            name={headCell.id}
            value={values[props.headCell.id]}
            onChange={handleChange}
            disabled={isFetching}
            error={errors[headCell.id] && touched[headCell.id]}
            data-test="tableSearchFormFieldSelectInput"
            inputProps={{ 'aria-label': headCell.label }}
          >
            <MenuItem value="" disabled>
              {headCell.label}
            </MenuItem>
            {renderMenuItems()}
          </Select>
        </FormControl>
      );
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate>
      {renderInput()}
      {renderSelect()}
      <IconButton
        aria-label="search"
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        disabled={isFetching}
        data-test="tableSearchFormSubmitButton"
      >
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton
        disabled={isFetching}
        type="button"
        aria-label="search"
        size="small"
        onClick={handleCancel}
        data-test="tableSearchFormCancelButton"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </form>
  );
};

export const TableSearchForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({ [props.headCell.id]: '' }),
  validationSchema: props =>
    yup.object().shape({
      [props.headCell.id]: yup
        .string()
        .required(`Please enter ${props.headCell.id}`)
        .min(0),
    }),
  handleSubmit: (values, bag) => {
    bag.props.handleSubmit(bag.props.headCell.id, values[bag.props.headCell.id]);
  },
  displayName: 'tableSearchForm',
})(SimpleTableSearchForm);

SimpleTableSearchForm.propTypes = {
  headCell: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default TableSearchForm;
