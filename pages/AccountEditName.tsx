import { RouteProp } from '@react-navigation/native';
import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUser, useUserMutation } from 'react-query/hooks';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { Button, Input, Layout } from 'ui';
import { Container } from 'ui/Container';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';

import { Loading } from './Loading';

type AccountEditPageProps = {
  route: RouteProp<{ params: { type: 'name' | 'email' } }>;
};

export function AccountEdit({ route }: AccountEditPageProps) {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const router = useRouter();
  const getUserId = useId();
  const userMutation = useUserMutation({
    onSuccess: async (res) => {
      router.route(PATHS.ACCOUNT);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const changeUser = () => {
    userMutation.mutate({
      id: getUserId,
      name: type === 'name' ? value : author.name,
      email: type === 'email' ? value : author.email,
    });
  };

  const type = route.params.type;

  const inputProps = useMemo(() => {
    const placeholder = type === 'email' ? 'Enter email' : 'Enter name';

    return {
      placeholder,
    };
  }, [type]);

  useEffect(() => {
    setValue('');
  }, []);

  const { author, isFetching } = useUser(getUserId);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        <View style={{ width: '100%', paddingTop: 12 }}>
          <Input
            testID="edit-input"
            placeholder={inputProps.placeholder}
            size="large"
            onChangeText={setValue}
            value={value}
          />
          <Button
            testID="edit-save-button"
            size="xlarge"
            style={{ marginTop: 12 }}
            onPress={changeUser}
          >
            Save
          </Button>
          <Button
            onPress={() => router.route(PATHS.ACCOUNT)}
            color="secondary"
            size="xlarge"
            style={{ marginTop: 8 }}
          >
            Cancel
          </Button>
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({});
};
