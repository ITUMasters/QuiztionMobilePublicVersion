import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { logo } from 'icons';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSetAuth } from 'recoil-store';
import { useSetId } from 'recoil-store/auth/IdStoreHooks';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Button, Icon, Layout, Switch } from 'ui';
import { Container } from 'ui/Container';
import { getItem } from 'utils/storage';

export function IntroPage() {
  const { theme, toggle, currentTheme } = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();
  const setAuth = useSetAuth();
  const setId = useSetId();

  useEffect(() => {
    const checkRememberMe = async () => {
      const accessToken = await getItem('access_token');
      const rememberMe = await getItem('remember_me');

      if (
        rememberMe === 'true' &&
        accessToken != null &&
        typeof accessToken === 'string'
      ) {
        try {
          const { _id } = jwtDecode(accessToken) as { _id?: string };
          if (_id != null) {
            setAuth(true);
            setId(Number(_id));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    checkRememberMe();
  }, []);

  return (
    <Layout>
      <Container>
        <View style={{ width: '100%' }}>
          <View style={themedStyles.logo}>
            <Icon xml={theme.imageForTheme.xml} width={'100%'} height={'200'} />
          </View>
          <View style={{ marginTop: '2%', alignItems: 'center' }}>
            <Icon xml={logo} width={'100%'} height="120" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Switch
                testID="intro-switch"
                onValueChange={() => {
                  toggle();
                }}
                value={currentTheme === 'dark'}
              />
              <Text style={themedStyles.darkMode}>Dark Mode</Text>
            </View>
            <View style={{ width: '100%', alignSelf: 'center' }}>
              <View style={{ marginTop: '10%' }}>
                <Button
                  testID="intro-login-button"
                  onPress={() => {
                    router.route(PATHS.LOGIN);
                  }}
                  size="xlarge"
                  color="primary"
                >
                  Login
                </Button>
              </View>
              <View style={{ marginTop: 8 }}>
                <Button
                  onPress={() => {
                    router.route(PATHS.REGISTER);
                  }}
                  size="xlarge"
                  color="secondary"
                >
                  Register
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBackground.backgroundColor,
      alignItems: 'center',
    },
    logo: {
      marginTop: '32.5%',
    },
    darkMode: {
      color: theme.text.default,
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Poppins_400Regular',
      lineHeight: 24,
      marginLeft: '2%',
    },
  });
};
