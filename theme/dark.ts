import { COLORS } from 'consts/colors';
import { introImageDark } from 'icons';
import { Theme } from 'theme/types';

export const dark: Theme = {
  text: {
    default: COLORS.WHITE,
    aboutText: COLORS.NEUTRAL_LIGHT[7],
  },
  button: {
    primary: {
      color: COLORS.WHITE,
      bg: COLORS.BLUE_DARK[7],
      border: COLORS.TRANSPARENT,
    },
    secondary: {
      color: COLORS.NEUTRAL_DARK[5],
      bg: COLORS.NEUTRAL_LIGHT[2],
      border: COLORS.NEUTRAL_LIGHT[5],
    },
    danger: {
      color: COLORS.WHITE,
      bg: COLORS.RED[8],
      border: COLORS.TRANSPARENT,
    },
    special: {
      color: COLORS.WHITE,
      bg: COLORS.GREEN[10],
      border: COLORS.TRANSPARENT,
    },
    orange: {
      color: COLORS.WHITE,
      bg: COLORS.ORANGE[8],
      border: COLORS.TRANSPARENT,
    },
  },
  input: {
    bg: COLORS.BLUE_DARK[13],
    color: COLORS.NEUTRAL_LIGHT[3],
    border: COLORS.NEUTRAL_DARK[3],
    focusBorder: COLORS.BLUE_MIDTONE[8],
    placeholderColor: COLORS.NEUTRAL_LIGHT[6],
  },
  inputJoin: {
    bg: COLORS.BLUE_DARK[14],
    color: COLORS.NEUTRAL_GRAY[8],
    border: COLORS.BLUE_DARK[14],
    focusBorder: COLORS.BLUE_MIDTONE[8],
    placeholderColor: COLORS.NEUTRAL_GRAY[3],
  },
  appBackground: {
    backgroundColor: COLORS.BLUE_DARK[14],
    dashboardTitleTextColor: COLORS.WHITE,
  },
  navBar: {
    contentColor: COLORS.BLUE_LIGHT[3],
    pressedBackgroundColor: COLORS.BLUE_DARK[14],
    bgColor: COLORS.BLUE_DARK[15],
    borderColor: COLORS.BLUE_DARK[15],
    pressedIconColor: COLORS.BLUE_DARK[7],
  },
  icon: {
    color: COLORS.WHITE,
  },
  imageForTheme: {
    xml: introImageDark,
  },
  header: {
    background: COLORS.BLUE_DARK[14],
    text: COLORS.BLUE_DARK[7],
  },

  questionCards: {
    background: COLORS.BLUE_DARK[15],
  },

  switch: {
    thumbColor: COLORS.WHITE,
    trackColorTrue: COLORS.BLUE_MIDTONE[9],
    trackColorFalse: COLORS.NEUTRAL_LIGHT[5],
  },
  bottomSheet: {
    bg: COLORS.BLUE_DARK[15],
    thumb: COLORS.BLUE_DARK[13],
  },
  countDownTimer: {
    color: COLORS.BLUE_DARK[7],
  },
};
