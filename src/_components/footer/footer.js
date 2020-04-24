import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Toaster from '../toaster/toaster';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
  },
}));

const Footer = ({ appName }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <div data-test="footer">
          <Typography variant="body2" color="textSecondary" align="center" data-test="copyright">
            {'Copyright © '}
            <Link color="inherit" href="/" data-test="link">
              {appName}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </div>
        <Toaster data-test="toaster" />
      </footer>
    </React.Fragment>
  );
};

Footer.propTypes = {
  classes: PropTypes.shape({
    footer: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  'data-test': PropTypes.string.isRequired,
};

export default Footer;
