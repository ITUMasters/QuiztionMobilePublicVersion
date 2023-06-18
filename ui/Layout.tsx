import { ComponentPropsWithoutRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';

interface LayoutProps extends ComponentPropsWithoutRef<typeof SafeAreaView> {
  style?: Object;
}

export const Layout = ({ style = {}, children, ...props }: LayoutProps) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  return (
    <SafeAreaView {...props} style={{ ...themedStyles.layout, ...style }}>
      {children}
    </SafeAreaView>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: theme.appBackground.backgroundColor,
      alignItems: 'center',
    },
  });
};
