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

const PageToolbar = ({ title, buttons }) => {
  const classes = useStyles();

  const renderButton = button => {
    if (button.component) {
      return (
        <button.component
          path={button.path}
          callback={button.callback}
          title={button.title}
          width={button.width || null}
          data-test="toolbarButtonComponent"
        />
      );
    }
    return null;
  };

  const renderButtons = () => {
    if (buttons && buttons.length) {
      return buttons.map((button, index) => (
        <div key={index} data-test="toolBarButtons">
          {renderButton(button)}
        </div>
      ));
    }
    return null;
  };

  const renderButtonsContainer = () => {
    return (
      <Toolbar className={classes.toolbar} data-test="toolbarContainer">
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div" data-test="tableTitleComponent">
          {title}
        </Typography>
        {renderButtons()}
      </Toolbar>
    );
  };

  return renderButtonsContainer();
};

PageToolbar.propTypes = {
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
    })
  ),
};

export default PageToolbar;
