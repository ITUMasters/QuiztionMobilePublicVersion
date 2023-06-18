import { ComponentPropsWithoutRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';

interface ContainerProps extends ComponentPropsWithoutRef<typeof ScrollView> {
  style?: Object;
}

export const Container = ({
  style = {},
  children,
  ...props
}: ContainerProps) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
      style={{ width: '100%' }}
      contentContainerStyle={{ ...themedStyles.container, ...style }}
    >
      {children}
    </ScrollView>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingLeft: 24,
      paddingRight: 24,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      paddingBottom: 20,
    },
  });
};
