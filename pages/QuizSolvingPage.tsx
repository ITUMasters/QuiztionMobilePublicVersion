import { COLORS } from 'consts/colors';
import { PATHS } from 'consts/paths';
import { useModal, useRouter } from 'hooks';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { getQuizWithId, useQuizSolveMutation } from 'react-query/hooks';
import { useSetNavbarOpen } from 'recoil-store/navbar/NavbarStoreHooks';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { BottomSheet, Button, Checkbox, Layout } from 'ui';
import { Container } from 'ui/Container';
import { SolvableQuestion } from 'ui/SolvableQuestion';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';

import { Loading } from './Loading';

export function QuizSolvingPage({ route }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]);
  const theme = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const setNavbarOpen = useSetNavbarOpen();
  const router = useRouter();

  const quizId = route.params;
  const { quiz, isFetching } = getQuizWithId(quizId);

  const quizSolveMutation = useQuizSolveMutation({
    onSuccess: async (res) => {
      router.route(PATHS.DASHBOARD);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const solveQuiz = () => {
    quizSolveMutation.mutate({
      quizId: quizId,
      questions: questionsWithAnswers,
    });
  };

  if (isFetching) {
    return <Loading />;
  }

  const currentDate = new Date();
  const endDate = new Date(quiz.end_date);
  const secDiff = Math.ceil((endDate.getTime() - currentDate.getTime()) / 1000);

  const questions = quiz.questions;
  const questionCount = questions.length;

  if (questionsWithAnswers.length === 0) {
    for (let i = 0; i < questionCount; i++) {
      questionsWithAnswers.push({ id: questions[i].id, answers: [] });
    }
  }

  let questionType = 0;
  switch (questions[currentQuestionIndex - 1].type) {
    case 'integer':
      questionType = 1;
      break;
    case 'multiple':
      questionType = 2;
      break;
    case 'single':
      questionType = 3;
      break;
  }

  return (
    <Layout>
      <Container style={{}}>
        <View
          style={{
            height: '100%',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ marginTop: 20 }}>
            <CountDown
              size={30}
              until={secDiff}
              onFinish={() => {
                showAlert('Time is Up', { message: 'Sorry!' });
                router.route(PATHS.DASHBOARD);
              }}
              digitStyle={{
                backgroundColor: COLORS.WHITE,
                borderWidth: 2,
                borderColor: theme.theme.countDownTimer.color,
              }}
              digitTxtStyle={{ color: theme.theme.countDownTimer.color }}
              separatorStyle={{ color: theme.theme.countDownTimer.color }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ m: null, s: null }}
              showSeparator
            />
          </View>
          <SolvableQuestion
            quizName={quiz.name}
            questionIndex={
              currentQuestionIndex.toString() + '/' + questionCount.toString()
            }
            text={questions[currentQuestionIndex - 1].content}
            type={questionType}
            onPress={() => {
              bottomSheetController.open();
            }}
            answers={questions[currentQuestionIndex - 1].answers}
            questions={questionsWithAnswers}
            onQuestionAnswerChange={(
              index: number,
              newAnswer: { id: number; answers: [] },
            ) => {
              setQuestionsWithAnswers([
                ...questionsWithAnswers.slice(0, index),
                newAnswer,
                ...questionsWithAnswers.slice(index + 1),
              ]);
            }}
            questionNo={currentQuestionIndex}
          />

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: 20,
            }}
          >
            <View style={themedStyles.prevNextButtons}>
              <Button
                color="primary"
                size="xlarge"
                disabled={currentQuestionIndex == 1}
                onPress={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                Previous
              </Button>
            </View>
            <View style={themedStyles.prevNextButtons}>
              <Button
                testID="solveQuiz-next-button"
                color="primary"
                size="xlarge"
                onPress={() => {
                  currentQuestionIndex === questionCount
                    ? solveQuiz()
                    : setCurrentQuestionIndex(currentQuestionIndex + 1);
                }}
              >
                {currentQuestionIndex === questionCount ? 'Submit' : 'Next'}
              </Button>
            </View>
          </View>
        </View>
      </Container>
      <BottomSheet
        header="General Quiz Status"
        onClose={() => setNavbarOpen(true)}
        controller={bottomSheetController}
        onOpen={() => setNavbarOpen(false)}
      >
        <View
          style={{
            width: '100%',
            marginTop: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: 'center',
            }}
          >
            {questions.map((element, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={themedStyles.answer}
                  onPress={() => {
                    setCurrentQuestionIndex(index + 1);
                    bottomSheetController.close();
                  }}
                >
                  <Text style={themedStyles.text}>
                    {'Question: ' + (index + 1)}
                  </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 8 }}>
                  <Checkbox
                    disabled={true}
                    checked={questionsWithAnswers[index]['answers'].length > 0}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </BottomSheet>
    </Layout>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
    prevNextButtons: {
      width: '48%',
    },
    text: {
      marginTop: 8,
      fontSize: 20,
      textAlign: 'center',
      color:
        theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.NEUTRAL_LIGHT[3],
    },
    answer: {
      width: '80%',
      height: 40,
      backgroundColor:
        theme.currentTheme === 'light'
          ? COLORS.NEUTRAL_LIGHT[2]
          : theme.theme.input.bg,
      borderColor: COLORS.NEUTRAL_LIGHT[5],
      borderRadius: 8,
    },
  });
};
