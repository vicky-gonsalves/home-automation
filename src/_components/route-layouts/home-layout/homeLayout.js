import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import LazyLoader from '../../lazy-loader/LazyLoader';
const HomePage = React.lazy(() => import('../../../modules/Home/HomePage'));

function HomeLayout({ isLoggedIn }) {
  const homeLayoutPath = ['/home'];
  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
          )
        }
      />
    );
  };

  return <PrivateRoute exact path={homeLayoutPath[0]} component={LazyLoader(HomePage)} />;
}

HomeLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default HomeLayout;
