import { FONTS } from 'consts';
import React, { ComponentPropsWithoutRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import {
  getInputPaddingByXmlProp,
  getInputSizesBySizeProp,
} from 'utils/inputStyles';

import { Icon } from './Icon';

export type InputSize = 'medium' | 'large';

interface InputProps extends ComponentPropsWithoutRef<typeof TextInput> {
  disabled?: boolean;
  onChangeText?: (value: string) => void;
  size: InputSize;
  xml?: string;
  inputTextHeight?: number;
  fontSize?: number;
  isJoinPage?: boolean;
  containerStyle?: Object;
  rightIcon?: string;
}

export function Input({
  value,
  disabled = false,
  onChangeText,
  size,
  xml,
  rightIcon,
  inputTextHeight,
  fontSize,
  isJoinPage = false,
  containerStyle,
  ...props
}: InputProps) {
  const { theme } = useTheme();

  const themedStyles = styles(
    theme,
    size,
    disabled,
    xml,
    inputTextHeight,
    fontSize,
    isJoinPage,
  );

  return (
    <View style={[themedStyles.viewStyle, containerStyle]}>
      <TextInput
        value={value}
        editable={!disabled}
        onChangeText={onChangeText}
        {...props}
        placeholderTextColor={theme.input.placeholderColor}
        style={themedStyles.wrapper}
      />

      {xml != null && xml != '' && (
        <View style={themedStyles.leftIcon}>
          <Icon color={theme.text.default} xml={xml} />
        </View>
      )}
      {rightIcon != null && (
        <View style={themedStyles.rightIcon}>
          <Icon color={theme.text.default} xml={rightIcon} />
        </View>
      )}
    </View>
  );
}

const styles = (
  theme: Theme,
  size: InputSize,
  disabled: boolean,
  xml: string,
  optionalHeight?: number,
  OptionalfontSize?: number,
  isJoinPage?: boolean,
) => {
  const { height, radius, fontSize } = getInputSizesBySizeProp(size);
  const { paddingLeft, paddingRight } = getInputPaddingByXmlProp(xml);
  return StyleSheet.create({
    wrapper: {
      backgroundColor: isJoinPage ? theme.inputJoin.bg : theme.input.bg,
      borderColor: isJoinPage ? theme.inputJoin.border : theme.input.border,
      color: theme.input.color,
      fontSize: OptionalfontSize !== undefined ? OptionalfontSize : fontSize,
      fontWeight: '400',
      borderWidth: 1,
      height: optionalHeight !== undefined ? optionalHeight : height,
      width: '100%',
      borderRadius: radius,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      paddingLeft,
      paddingRight,
      alignSelf: 'center',
      overflow: 'visible',
      fontFamily: FONTS.PoppinsRegular,
    },

    viewStyle: {
      flexDirection: 'row',
      width: '100%',
    },

    leftIcon: {
      position: 'absolute',
      left: 13,
      alignSelf:
        optionalHeight !== undefined && optionalHeight > 48
          ? 'flex-start'
          : 'center',
      top: optionalHeight !== undefined && optionalHeight > 48 ? 5 : null,
    },
    rightIcon: {
      position: 'absolute',
      right: 13,
      alignSelf:
        optionalHeight !== undefined && optionalHeight > 48
          ? 'flex-start'
          : 'center',
      top: optionalHeight !== undefined && optionalHeight > 48 ? 5 : null,
    },
  });
};
