import { Theme } from '../theme/types';

type NavBarColorsReturnType = {
  contentColor: string;
  pressedBackgroundColor: string;
  bgColor: string;
  borderColor: string;
  pressedIconColor: string;
};

export const getNavBarColorsByTheme = (
  theme: Theme,
): NavBarColorsReturnType => {
  return {
    contentColor: theme.navBar.contentColor,
    pressedBackgroundColor: theme.navBar.pressedBackgroundColor,
    bgColor: theme.navBar.bgColor,
    borderColor: theme.navBar.borderColor,
    pressedIconColor: theme.navBar.pressedIconColor,
  };
};
