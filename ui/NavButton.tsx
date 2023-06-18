import { FONTS } from 'consts';
import { PATHS } from 'consts/paths';
import React, { ComponentPropsWithoutRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'theme/ThemeContext';
import { Theme } from 'theme/types';
import { getNavBarColorsByTheme } from 'utils/navBarStyles';

import { Icon } from './Icon';

interface NavButtonProps
  extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  as: string;
  onPress?: () => void;
  text: string;
  xml: string;
  buttonWidth: string;
  isCurrentPage: boolean;
}

export function NavButton({
  as,
  activeOpacity = 0.8,
  onPress,
  text,
  xml,
  buttonWidth,
  children,
  isCurrentPage = false,
  ...props
}: NavButtonProps) {
  const { theme } = useTheme();
  const themedStyles = styles(theme, buttonWidth, isCurrentPage);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={themedStyles.wrapper}
      {...props}
    >
      <Icon
        color={
          isCurrentPage
            ? theme.navBar.pressedIconColor
            : theme.navBar.contentColor
        }
        style={{
          ...themedStyles.icon,
          opacity: as === PATHS.DASHBOARD ? 0 : 1,
        }}
        width="52"
        height="28"
        xml={xml}
      />
      {children}
      <Text numberOfLines={1} style={themedStyles.textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = (theme: Theme, buttonWidth: string, isCurrentPage: boolean) => {
  const {
    contentColor,
    pressedBackgroundColor,
    bgColor,
    borderColor,
    pressedIconColor,
  } = getNavBarColorsByTheme(theme);

  return StyleSheet.create({
    wrapper: {
      backgroundColor: isCurrentPage ? pressedBackgroundColor : bgColor,
      borderColor: borderColor,
      borderWidth: 1,
      width: buttonWidth,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontSize: 10,
      marginBottom: 8,
      color: isCurrentPage ? pressedIconColor : contentColor,
      fontFamily: FONTS.PoppinsMedium,
      position: 'relative',
    },
    icon: {
      marginBottom: 4,
    },
  });
};
