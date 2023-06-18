import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

export const useRouter = (route?: BottomTabBarProps) => {
  const navigation = useNavigation();
  const mainNavigation = route ? route.navigation : navigation;
  const state = mainNavigation.getState();
  const index = state?.index;
  const routes = state?.routeNames;
  const currentTab = routes?.[index];

  return {
    ...navigation,
    route: (to: string, params?: any) =>
      navigation.navigate(to as never, params as never),
    currentTab,
  };
};
