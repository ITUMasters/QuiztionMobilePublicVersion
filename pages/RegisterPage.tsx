import { COLORS } from 'consts/colors';
import { useRouter } from 'hooks';
import { lock, logo, mail, user } from 'icons';
import { useMemo, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useUserRegisterMutation } from 'react-query/hooks';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Button, Checkbox, Container, Icon, Input, Layout } from 'ui';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';
import { isValidEmail } from 'utils/validators';

export function RegisterPage() {
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();

  const userRegisterMutation = useUserRegisterMutation({
    onSuccess: async (res) => {
      router.goBack();
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const register = () => {
    userRegisterMutation.mutate({
      name: name,
      surname: 'mockSurname',
      email: email,
      password: password,
    });
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = !isValidEmail(email);
    const c2 = password.trim() === '';
    const c3 = password !== confirmPassword;
    const c4 = !checkboxVal;
    const c5 = name.trim() === '';

    return c1 || c2 || c3 || c4 || c5;
  }, [email, password, confirmPassword, checkboxVal, name]);

  return (
    <Layout>
      <Container>
        <Icon
          xml={logo}
          width={'342'}
          height={'118'}
          style={{ marginTop: '8%' }}
        />
        <View style={{ width: '100%' }}>
          <View style={{ marginTop: '4%' }}>
            <Input
              size="large"
              xml={mail}
              placeholder={'Email'}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginTop: '1.48%' }}>
            <Input
              size="large"
              xml={user}
              placeholder={'Name'}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={{ marginTop: '1.48%' }}>
            <Input
              size="large"
              xml={lock}
              placeholder={'Password'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: '1.48%' }}>
            <Input
              size="large"
              xml={lock}
              placeholder={'Confirm Password'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={{ marginTop: '4%', flexDirection: 'row' }}>
            <Checkbox
              checked={checkboxVal}
              onPress={() => {
                setCheckboxVal(!checkboxVal);
              }}
            />
            <Text style={themedStyles.consent}>
              I read the{' '}
              <Text
                style={{ color: COLORS.BLUE_DARK[7], fontWeight: 'bold' }}
                onPress={() =>
                  Linking.openURL(
                    'https://huntrgamecompany.blogspot.com/2022/12/quiztion-privacy-policy.html',
                  )
                }
              >
                Privacy Policy
              </Text>{' '}
              and agree
            </Text>
          </View>

          <View style={{ marginTop: '4%' }}>
            <Button
              size="xlarge"
              color="primary"
              onPress={register}
              disabled={isButtonDisabled}
            >
              Register
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
    consent: {
      marginTop: '1%',
      marginLeft: '1%',
      color: theme.text.default,
    },
  });
};
