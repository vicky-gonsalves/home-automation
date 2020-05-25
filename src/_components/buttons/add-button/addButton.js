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

const AddButton = ({ title, path, width }) => {
  const classes = useStyles();
  const handleClick = () => {
    history.push(path);
  };
  const renderButton = () => {
    if (title && path) {
      return (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          data-test="addButtonComponent"
          style={{ minWidth: width || 0 }}
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
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
};

export default AddButton;
