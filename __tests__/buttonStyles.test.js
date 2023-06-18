import { COLORS } from 'consts/colors';
import { introImageDark } from 'icons';
import {
  getButtonColorsByThemeAndColorProp,
  getButtonSizesBySizeProp,
} from 'utils/buttonStyles';

export const dark = {
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

test('control small button size', () => {
  expect(getButtonSizesBySizeProp('small')).toEqual({
    height: 28,
    radius: 8,
    fontSize: 16,
  });
});

test('control medium button size', () => {
  expect(getButtonSizesBySizeProp('medium')).toEqual({
    height: 32,
    radius: 8,
    fontSize: 18,
  });
});

test('control large button size', () => {
  expect(getButtonSizesBySizeProp('large')).toEqual({
    height: 36,
    radius: 8,
    fontSize: 18,
  });
});

test('control xlarge button size', () => {
  expect(getButtonSizesBySizeProp('xlarge')).toEqual({
    height: 40,
    radius: 8,
    fontSize: 18,
  });
});

test('control dark theme primary button colors', () => {
  expect(getButtonColorsByThemeAndColorProp(dark, 'primary')).toEqual({
    bg: dark.button.primary.bg,
    border: dark.button.primary.border,
    color: dark.button.primary.color,
  });
});

test('control dark theme secondary button colors', () => {
  expect(getButtonColorsByThemeAndColorProp(dark, 'secondary')).toEqual({
    bg: dark.button.secondary.bg,
    border: dark.button.secondary.border,
    color: dark.button.secondary.color,
  });
});

test('control dark theme danger button colors', () => {
  expect(getButtonColorsByThemeAndColorProp(dark, 'danger')).toEqual({
    bg: dark.button.danger.bg,
    border: dark.button.danger.border,
    color: dark.button.danger.color,
  });
});

test('control dark theme special button colors', () => {
  expect(getButtonColorsByThemeAndColorProp(dark, 'special')).toEqual({
    bg: dark.button.special.bg,
    border: dark.button.special.border,
    color: dark.button.special.color,
  });
});

test('control dark theme orange button colors', () => {
  expect(getButtonColorsByThemeAndColorProp(dark, 'orange')).toEqual({
    bg: dark.button.orange.bg,
    border: dark.button.orange.border,
    color: dark.button.orange.color,
  });
});
