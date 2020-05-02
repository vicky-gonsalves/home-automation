import React, { useCallback, useContext, useMemo } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { UserContext } from '../../../_contexts/user/UserContext.provider';
import LazyLoader from '../../lazy-loader/LazyLoader';

const HomeLayout = () => {
  const userContext = useContext(UserContext);
  const homeLayoutPath = ['/home'];
  const HomePage = useMemo(() => React.lazy(() => import('../../../modules/Home/HomePage')), []);

  const isAuthorized = useMemo(() => userContext.isAuthorized && userContext.isLoggedIn, [
    userContext.isAuthorized,
    userContext.isLoggedIn,
  ]);

  const renderComponent = useCallback(
    (Component, props) => {
      if (isAuthorized) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />;
    },
    [isAuthorized]
  );

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => renderComponent(Component, props)} />;
  };

  return <PrivateRoute exact path={homeLayoutPath[0]} component={LazyLoader(HomePage)} />;
};

HomeLayout.propTypes = {};

export default HomeLayout;
