import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'theme';

export const Loading = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.appBackground.backgroundColor,
      }}
    >
      <ActivityIndicator />
    </View>
  );
};
