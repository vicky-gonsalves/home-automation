import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminDrawerActions } from '../../_actions/admin-drawer/adminDrawer.actions';

const ListItemLink = ({ icon, primary, to, isMobile }) => {
  const dispatch = useDispatch();
  const handleDrawerClose = useCallback(() => {
    if (isMobile) {
      setTimeout(() => {
        dispatch(adminDrawerActions.close());
      });
    }
  }, [dispatch, isMobile]);

  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} onClick={handleDrawerClose} />),
    [to, handleDrawerClose]
  );

  return (
    <li data-test="listItemContainer">
      <ListItem button component={CustomLink} data-test="listItemComponent">
        <ListItemIcon data-test="listItemIconComponent">{icon}</ListItemIcon>
        <ListItemText primary={primary} data-test="listItemTextComponent" />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element.isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default ListItemLink;
