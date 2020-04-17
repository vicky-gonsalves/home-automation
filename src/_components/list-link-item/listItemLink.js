import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ListItemLink = props => {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />), [
    to,
  ]);

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
};

export default ListItemLink;
