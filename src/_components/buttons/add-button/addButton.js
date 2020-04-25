import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(0.5),
  },
  button: {
    margin: theme.spacing(1),
    width: 130,
  },
}));

const AddButton = ({ title, callback }) => {
  const classes = useStyles();
  const renderButton = () => {
    if (title && typeof callback === 'function') {
      return (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={callback}
          data-test="addButtonComponent"
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
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default AddButton;
