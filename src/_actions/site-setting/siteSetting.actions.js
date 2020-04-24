import { siteSettingConstants } from '../../_constants';

const showBurger = () => dispatch => dispatch({ type: siteSettingConstants.SHOW_BURGER });

const hideBurger = () => dispatch => dispatch({ type: siteSettingConstants.HIDE_BURGER });

export const siteSettingActions = {
  showBurger,
  hideBurger,
};
