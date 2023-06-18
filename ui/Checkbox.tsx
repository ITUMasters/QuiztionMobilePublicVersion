import { checkbox_checked, checkbox_unchecked } from 'icons';
import { ComponentPropsWithoutRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

type CheckboxProps = {
  type?: string;
  checked: boolean;
  onPress?: () => void;
  disabled?: boolean;
  buttonProps?: ComponentPropsWithoutRef<typeof TouchableOpacity>;
};

export const Checkbox = ({
  type,
  checked,
  onPress,
  disabled,
  buttonProps,
  ...props
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      testID={type}
      disabled={disabled}
      onPress={onPress}
      {...buttonProps}
    >
      <SvgXml
        color={checked ? '#006FFF' : '#AAADB3'}
        xml={checked ? checkbox_checked : checkbox_unchecked}
        {...props}
      />
    </TouchableOpacity>
  );
};
