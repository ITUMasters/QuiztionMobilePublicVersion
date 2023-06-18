import { useRouter } from 'hooks';
import { lock, logo, mail } from 'icons';
import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useLoginMutation } from 'react-query/hooks';
import { useSetAuth } from 'recoil-store';
import { useSetId } from 'recoil-store/auth/IdStoreHooks';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Checkbox } from 'ui';
import { Button, Icon, Input } from 'ui';
import { Container } from 'ui/Container';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';
import { setItem } from 'utils/storage';
import { isValidEmail } from 'utils/validators';

export function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();
  const setAuth = useSetAuth();
  const setId = useSetId();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLoginMutation({
    onSuccess: async (res) => {
      setAuth(true);
      setId(res.data.user.id);
      await setItem('access_token', res.data.token);
      await setItem('remember_me', rememberMe ? 'true' : 'false');
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const login = () => {
    loginMutation.mutate({
      email,
      password,
    });
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = !isValidEmail(email);
    const c2 = password.trim() === '';

    return c1 || c2;
  }, [email, password]);

  return (
    <SafeAreaView style={themedStyles.container}>
      <Container style={{ marginTop: 120 }}>
        <Icon xml={logo} width="100%" height="120" />
        <View style={{ width: '100%' }}>
          <View style={{ marginTop: '4%' }}>
            <Input
              testID="login-email-input"
              value={email}
              onChangeText={setEmail}
              size="large"
              xml={mail}
              placeholder="Email"
            />
          </View>
          <View style={{ marginTop: '1.48%' }}>
            <Input
              testID="login-password-input"
              value={password}
              onChangeText={setPassword}
              size="large"
              xml={lock}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: '4%', flexDirection: 'row' }}>
            <Checkbox
              checked={rememberMe}
              onPress={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Text style={themedStyles.rememberMe}>Remember Me</Text>
          </View>
          <View style={{ marginTop: '4%' }}>
            <Button
              testID="login-login-button"
              disabled={isButtonDisabled}
              onPress={login}
              size="xlarge"
              color="primary"
            >
              Login
            </Button>
          </View>
          <View style={{ marginTop: 8 }}>
            <Button
              onPress={() => {
                router.goBack();
              }}
              size="xlarge"
              color="secondary"
            >
              Back
            </Button>
          </View>
        </View>
      </Container>
    </SafeAreaView>
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
      marginTop: '20%',
    },
    rememberMe: {
      marginTop: '1%',
      marginLeft: '1%',
      color: theme.text.default,
    },
  });
};
