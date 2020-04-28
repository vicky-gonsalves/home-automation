import { siteSettingConstants } from '../../_constants';

const initialState = {
  burger: false,
};

const siteSetting = (state = initialState, action) => {
  switch (action.type) {
    case siteSettingConstants.SHOW_BURGER:
      return {
        ...state,
        burger: true,
      };

    case siteSettingConstants.HIDE_BURGER:
      return {
        ...state,
        burger: false,
      };

    default:
      return state;
  }
};
export default siteSetting;
