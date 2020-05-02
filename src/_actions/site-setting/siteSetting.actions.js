import { siteSettingConstants } from '../../_constants';

const showBurger = () => dispatch => dispatch({ type: siteSettingConstants.SHOW_BURGER });

const hideBurger = () => dispatch => dispatch({ type: siteSettingConstants.HIDE_BURGER });

const showLoader = () => dispatch => dispatch({ type: siteSettingConstants.SHOW_LOADER });

const hideLoader = () => dispatch => dispatch({ type: siteSettingConstants.HIDE_LOADER });

export const siteSettingActions = {
  showBurger,
  hideBurger,
  showLoader,
  hideLoader,
};
