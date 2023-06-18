import { ComponentPropsWithoutRef } from 'react';
import { Switch as SwitchRN } from 'react-native';
import { useTheme } from 'theme';

interface Props extends ComponentPropsWithoutRef<typeof SwitchRN> {}

export const Switch = ({ ...props }: Props) => {
  const { theme } = useTheme();

  return (
    <SwitchRN
      trackColor={{
        false: theme.switch.trackColorFalse,
        true: theme.switch.trackColorTrue,
      }}
      thumbColor={theme.switch.thumbColor}
      {...props}
    />
  );
};
