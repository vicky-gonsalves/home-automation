import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import { history } from '../../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(1),
    width: 130,
  },
}));

const AddButton = ({ title, path, callback, width, isFetching }) => {
  const classes = useStyles();
  const hasCallback = callback && typeof callback === 'function';
  const hasPath = path && path.length;
  const handleClick = () => {
    if (hasPath) {
      history.push(path);
    } else if (hasCallback) {
      callback();
    }
  };
  const renderButton = () => {
    if (title && (hasPath || hasCallback)) {
      return (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          data-test="addButtonComponent"
          style={{ minWidth: width || 0 }}
          disabled={isFetching}
        >
          {title}
        </Button>
      );
    }
    return null;
  };
  return renderButton();
};

AddButton.propTypes = {
  classes: PropTypes.shape({
    margin: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }),
  path: (props, propName, componentName) => {
    if (!props.path && !props.callback) {
      return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
    }
  },
  callback: (props, propName, componentName) => {
    if (!props.path && !props.callback) {
      return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
    }
  },
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  isFetching: PropTypes.bool,
};

export default AddButton;
