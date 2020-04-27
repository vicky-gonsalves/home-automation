import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  title: {
    flex: '1 1 100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
}));

const TableToolbar = ({ title, buttons }) => {
  const classes = useStyles();

  const renderButtons = () => {
    if (buttons && buttons.length) {
      return buttons.map((button, index) => (
        <div key={index}>
          <button.component path={button.path} title={button.title} />
        </div>
      ));
    }
  };

  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
      {renderButtons()}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.shape({
    title: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      buttonType: PropTypes.string.isRequired,
    })
  ),
};

export default TableToolbar;
