import { FONTS } from 'consts';
import React, { ComponentPropsWithoutRef, ReactNode, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'theme/ThemeContext';
import { Theme } from 'theme/types';
import {
  getButtonColorsByThemeAndColorProp,
  getButtonSizesBySizeProp,
} from 'utils/buttonStyles';

export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'special'
  | 'orange';

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  children: ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  size: ButtonSize;
  color?: ButtonColor;
  style?: Object;
}

export function Button({
  activeOpacity = 0.8,
  children,
  disabled,
  onPress,
  size,
  style = {},
  color = 'primary',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme, color, size, disabled);

  const animatedButtonScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale as any }],
  };

  return (
    <Animated.View>
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled}
        activeOpacity={activeOpacity}
        style={{ ...themedStyles.wrapper, ...animatedScaleStyle, ...style }}
        onPress={onPress}
        {...props}
      >
        <Text style={themedStyles.text}>{children}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = (
  theme: Theme,
  colorProp: ButtonColor,
  size: ButtonSize,
  disabled: boolean,
) => {
  const { bg, border, color } = getButtonColorsByThemeAndColorProp(
    theme,
    colorProp,
  );
  const { height, radius, fontSize } = getButtonSizesBySizeProp(size);

  return StyleSheet.create({
    wrapper: {
      backgroundColor: bg,
      borderColor: border,
      borderWidth: 1,
      height: height,
      width: '100%',
      borderRadius: radius,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      overflow: 'hidden',
    },
    text: {
      color,
      fontSize,
      fontFamily: FONTS.PoppinsRegular,
    },
    viewStyle: {
      flexDirection: 'row',
      width: '100%',
    },
  });
};
