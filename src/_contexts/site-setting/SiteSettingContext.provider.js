import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { history } from '../../_helpers/history/history';

export const SiteSettingContext = React.createContext();
const SiteSettingContextProvider = props => {
  const open = useSelector(state => state.adminDrawer.open, shallowEqual);
  const drawerPath = ['admin', 'users'];

  const toShow = useCallback(
    () =>
      Boolean(
        drawerPath.filter(path => {
          return history.location.pathname.match(new RegExp(`(${path}?.+)`, 'gi'));
        }).length
      ),
    [drawerPath]
  );

  const [show, setShow] = useState(toShow);
  const ref = useRef(null);
  // noinspection JSValidateTypes
  ref.current = { show, setShow };

  useEffect(() => {
    history.listen(() => {
      ref.current.setShow(toShow);
    });
  }, [drawerPath, toShow]);

  return (
    <SiteSettingContext.Provider value={{ drawer: { show: ref.current.show, open }, burger: ref.current.show }}>
      {props.children}
    </SiteSettingContext.Provider>
  );
};

export default SiteSettingContextProvider;
