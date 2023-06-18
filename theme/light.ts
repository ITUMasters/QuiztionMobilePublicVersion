import { COLORS } from 'consts/colors';
import { introImage } from 'icons';
import { Theme } from 'theme/types';

export const light: Theme = {
  text: {
    default: COLORS.BLACK,
    aboutText: COLORS.NEUTRAL_DARK[2],
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
    bg: COLORS.NEUTRAL_LIGHT[1],
    color: COLORS.NEUTRAL_DARK[2],
    border: COLORS.NEUTRAL_LIGHT[5],
    focusBorder: COLORS.BLUE_MIDTONE[8],
    placeholderColor: COLORS.NEUTRAL_GRAY[3],
  },
  inputJoin: {
    bg: COLORS.WHITE,
    color: COLORS.BLACK,
    border: COLORS.WHITE,
    focusBorder: COLORS.BLUE_MIDTONE[8],
    placeholderColor: COLORS.NEUTRAL_GRAY[3],
  },
  appBackground: {
    backgroundColor: COLORS.WHITE,
    dashboardTitleTextColor: COLORS.NEUTRAL_DARK[2],
  },
  navBar: {
    contentColor: COLORS.NEUTRAL_GRAY[4],
    pressedBackgroundColor: COLORS.BLUE_DARK[1],
    bgColor: COLORS.WHITE,
    borderColor: COLORS.NEUTRAL_LIGHT[4],
    pressedIconColor: COLORS.BLUE_DARK[15],
  },
  icon: {
    color: COLORS.BLACK,
  },
  imageForTheme: {
    xml: introImage,
  },
  header: {
    background: COLORS.NEUTRAL_LIGHT[1],
    text: COLORS.BLUE_DARK[7],
  },

  questionCards: {
    background: COLORS.BLUE_DARK[1],
  },

  switch: {
    thumbColor: COLORS.WHITE,
    trackColorTrue: COLORS.BLUE_MIDTONE[9],
    trackColorFalse: COLORS.NEUTRAL_LIGHT[5],
  },
  bottomSheet: {
    bg: COLORS.WHITE,
    thumb: COLORS.NEUTRAL_GRAY[2],
  },
  countDownTimer: {
    color: COLORS.BLUE_DARK[7],
  },
};
