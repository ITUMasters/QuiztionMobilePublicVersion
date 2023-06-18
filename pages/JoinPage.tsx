import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { logo } from 'icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useEnterPinMutation, useQuizzesWithPublicId } from 'react-query/hooks';
import { apiGetQuizWithId, apiGetQuizWithPublicId } from 'react-query/queries';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { useSetQuestion } from 'recoil-store/questionStoreHook';
import { useSetQuizInfo } from 'recoil-store/quizInfoStoreHook';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { Button, Icon, Layout } from 'ui';
import { Container } from 'ui/Container';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';

import { Loading } from './Loading';

export function JoinPage() {
  const theme = useTheme();
  const router = useRouter();
  const [pin, setPin] = useState('');
  const id = useId();
  const setQuestion = useSetQuestion();
  const setQuizInfo = useSetQuizInfo();

  setQuestion([]);
  setQuizInfo({
    quizName: undefined,
    duration: undefined,
    category: 'Select Category',
  });

  const enterPinMutation = useEnterPinMutation({
    onSuccess: async (res) => {
      const quiz = await apiGetQuizWithId(res.data.participation.quiz_id);

      let quizId = res.data.participation.quiz_id;
      router.route(PATHS.QUIZ_SOLVING, quizId);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const enterPin = () => {
    enterPinMutation.mutate({
      public_id: parseInt(pin),
    });
  };
  return (
    <Layout>
      <Container>
        <View style={{ width: '100%', marginTop: '50%' }}>
          <View style={{ marginTop: '2%', alignItems: 'center' }}>
            <Icon xml={logo} width={'100%'} height="120" />
            <TextInput
              testID="join-pin-input"
              style={{
                fontSize: 50,
                textAlign: 'center',
                color: theme.theme.input.color,
              }}
              keyboardType="number-pad"
              placeholder="PIN"
              value={pin}
              onChangeText={setPin}
            />
            <View style={{ width: '100%', alignSelf: 'center' }}>
              <View style={{ marginTop: '10%' }}>
                <Button
                  testID="join-pin-button"
                  onPress={async () => {
                    const quiz = await apiGetQuizWithPublicId(pin);
                    const data = quiz.data;
                    if (
                      data != null &&
                      typeof data === 'object' &&
                      data.hasOwnProperty('participants')
                    ) {
                      const participants = data.participants;
                      const isUserWhitelisted =
                        participants.find((item) => item.user_id == id) != null;
                      if (isUserWhitelisted || data.description === 'public') {
                        enterPin();
                      } else {
                        showAlert('You are not allowed to join this quiz');
                      }
                    } else {
                      showAlert('Quiz with given public id does not exist');
                    }
                  }}
                  size="xlarge"
                  color="primary"
                >
                  JOIN
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
    darkMode: {
      color: theme.theme.text.default,
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Poppins_400Regular',
      lineHeight: 24,
      marginLeft: '2%',
    },
    bottom: {
      justifyContent: 'flex-end',
      backgroundColor: theme.theme.appBackground.backgroundColor,
    },
  });
};
