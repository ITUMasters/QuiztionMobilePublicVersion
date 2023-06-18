import { Theme } from '../theme/types';
import { ButtonColor, ButtonSize } from '../ui/Button';

type ButtonSizesReturnType = {
  height: number;
  radius: number;
  fontSize: number;
};
export const getButtonSizesBySizeProp = (
  size: ButtonSize,
): ButtonSizesReturnType => {
  switch (size) {
    case 'small': {
      return {
        height: 28,
        radius: 8,
        fontSize: 16,
      };
    }
    case 'medium': {
      return {
        height: 32,
        radius: 8,
        fontSize: 18,
      };
    }
    case 'large': {
      return {
        height: 36,
        radius: 8,
        fontSize: 18,
      };
    }
    case 'xlarge': {
      return {
        height: 40,
        radius: 8,
        fontSize: 18,
      };
    }
  }
};

type ButtonColorsReturnType = {
  bg: string;
  border: string;
  color: string;
};
export const getButtonColorsByThemeAndColorProp = (
  theme: Theme,
  color: ButtonColor,
): ButtonColorsReturnType => {
  switch (color) {
    case 'primary': {
      return {
        bg: theme.button.primary.bg,
        border: theme.button.primary.border,
        color: theme.button.primary.color,
      };
    }
    case 'secondary': {
      return {
        bg: theme.button.secondary.bg,
        border: theme.button.secondary.border,
        color: theme.button.secondary.color,
      };
    }
    case 'danger': {
      return {
        bg: theme.button.danger.bg,
        border: theme.button.danger.border,
        color: theme.button.danger.color,
      };
    }
    case 'special': {
      return {
        bg: theme.button.special.bg,
        border: theme.button.special.border,
        color: theme.button.special.color,
      };
    }
    case 'orange': {
      return {
        bg: theme.button.orange.bg,
        border: theme.button.orange.border,
        color: theme.button.orange.color,
      };
    }
  }
};
