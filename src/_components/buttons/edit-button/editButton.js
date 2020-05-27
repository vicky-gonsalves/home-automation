import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';
import { history } from '../../../_helpers/history/history';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
}));

const EditButton = ({ path, callback, item, isFetching }) => {
  const classes = useStyles();
  const hasCallback = callback && typeof callback === 'function';
  const hasPath = path && path.length;
  const handleClick = () => {
    if (hasPath) {
      history.push(path);
    } else if (hasCallback) {
      callback(item);
    }
  };
  return (
    <IconButton
      aria-label="edit"
      className={classes.margin}
      size="small"
      onClick={handleClick}
      disabled={isFetching}
      data-test="editIconButtonComponent"
    >
      <EditIcon fontSize="small" data-test="editIconComponent" />
    </IconButton>
  );
};

EditButton.propTypes = {
  item: PropTypes.object,
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
  isFetching: PropTypes.bool,
};

export default EditButton;
