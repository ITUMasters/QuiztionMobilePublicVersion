import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { account, create, discover, home, join } from 'icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

import { Globe } from './Globe';
import { NavButton } from './NavButton';

export const NavBar = ({ route }) => {
  const themedStyles = styles();
  const router = useRouter(route);
  const currentTab = router.currentTab;
  return (
    <View style={themedStyles.wrapper}>
      <NavButton
        onPress={() => router.route(PATHS.DISCOVER)}
        isCurrentPage={currentTab === PATHS.DISCOVER}
        as={PATHS.DISCOVER}
        text="Discover"
        xml={discover}
        buttonWidth="20%"
      />
      <NavButton
        testID="navbar-join-button"
        onPress={() => router.route(PATHS.JOIN)}
        isCurrentPage={currentTab === PATHS.JOIN}
        as={PATHS.JOIN}
        text="Join"
        xml={join}
        buttonWidth="20%"
      />

      <NavButton
        onPress={() => router.route(PATHS.DASHBOARD)}
        isCurrentPage={currentTab === PATHS.DASHBOARD}
        as={PATHS.DASHBOARD}
        text="Home"
        xml={home}
        buttonWidth="20%"
      >
        <Globe style={themedStyles.globe} />
      </NavButton>

      <NavButton
        testID="navbar-create-button"
        onPress={() => router.route(PATHS.CREATE)}
        isCurrentPage={currentTab === PATHS.CREATE}
        as={PATHS.CREATE}
        text="Create"
        xml={create}
        buttonWidth="20%"
      />
      <NavButton
        testID="navbar-account-button"
        isCurrentPage={currentTab === PATHS.ACCOUNT}
        onPress={() => router.route(PATHS.ACCOUNT)}
        as={PATHS.ACCOUNT}
        text="Account"
        xml={account}
        buttonWidth="20%"
      />
    </View>
  );
};

const styles = () => {
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 64,
    },
    globe: {
      position: 'absolute',
      top: '-50%',
      zIndex: 10,
    },
  });
};
