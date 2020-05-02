import React, { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { history } from '../../_helpers/history/history';

export const SiteSettingContext = React.createContext();
const SiteSettingContextProvider = props => {
  const pathname = history.location.pathname;
  const open = useSelector(state => state.adminDrawer.open, shallowEqual);

  const show = useMemo(() => {
    const drawerPath = ['admin', 'users'];
    return Boolean(
      drawerPath.filter(path => {
        return pathname.match(new RegExp(`(${path}?.+)`, 'gi'));
      }).length
    );
  }, [pathname]);

  return (
    <SiteSettingContext.Provider value={{ drawer: { show, open }, burger: show }}>
      {props.children}
    </SiteSettingContext.Provider>
  );
};

export default SiteSettingContextProvider;
