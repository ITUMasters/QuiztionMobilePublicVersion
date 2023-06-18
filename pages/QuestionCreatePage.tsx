import { FONTS } from 'consts';
import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuestion, useSetQuestion } from 'recoil-store/questionStoreHook';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Button, Input, Layout } from 'ui';
import { Container } from 'ui/Container';
import { InputAndCheckbox } from 'ui/InputAndCheckBox';
import { QuesttionType } from 'ui/QuestionType';

export function QuestionCreationPage({ route }) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);

  const [chosenOptions, setChosenOptions] = useState(0);
  const router = useRouter();

  const question = route.params?.question;
  const isEdit = route.params?.isEdit;
  const questionIndex = route.params?.questionIndex;
  const quiz = route.params?.quiz;

  const [questionType, setQuestionType] = useState(
    question !== undefined ? question.type : 'single',
  );
  const [content, setContent] = useState(
    question !== undefined ? question.content : '',
  );

  const [answer1content, setAnswer1content] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[0]?.content
      : '',
  );
  const [answer2content, setAnswer2content] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[1]?.content
      : '',
  );
  const [answer3content, setAnswer3content] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[2]?.content
      : '',
  );
  const [answer4content, setAnswer4content] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[3]?.content
      : '',
  );

  const [isAnswer1Correct, setIsAnswer1Correct] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[0]?.is_correct
      : false,
  );
  const [isAnswer2Correct, setIsAnswer2Correct] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[1]?.is_correct
      : false,
  );
  const [isAnswer3Correct, setIsAnswer3Correct] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[2]?.is_correct
      : false,
  );
  const [isAnswer4Correct, setIsAnswer4Correct] = useState(
    question !== undefined && questionType !== 'integer'
      ? question.answers[3]?.is_correct
      : false,
  );

  const [integerContent, setIntegerContent] = useState(
    question !== undefined && questionType === 'integer'
      ? question.answers[0]?.content
      : '',
  );
  const setQuestion = useSetQuestion();
  const questions = useQuestion();

  function clearIsAnswerCorrect() {
    setIsAnswer1Correct(false);
    setIsAnswer2Correct(false);
    setIsAnswer3Correct(false);
    setIsAnswer4Correct(false);
  }

  const isButtonDisabled = useMemo(() => {
    const c1 = content === '';
    const c2 = questionType === 'integer' && integerContent === '';
    const c3 =
      questionType !== 'integer' &&
      !(
        isAnswer1Correct ||
        isAnswer2Correct ||
        isAnswer3Correct ||
        isAnswer4Correct
      );
    const c4 =
      questionType !== 'integer' &&
      (answer1content === '' ||
        answer2content === '' ||
        answer3content === '' ||
        answer4content === '');

    return c1 || c2 || c3 || c4;
  }, [
    content,
    questionType,
    integerContent,
    isAnswer1Correct,
    isAnswer2Correct,
    isAnswer3Correct,
    isAnswer4Correct,
    answer1content,
    answer2content,
    answer3content,
    answer4content,
  ]);

  return (
    <Layout>
      <Container>
        <Text style={themedStyles.textStyle}>Text</Text>
        <View style={{ marginTop: '1%', height: 88 }}>
          <Input
            testID="addQuestion-questionBody-input"
            size="medium"
            placeholder="Write your question"
            inputTextHeight={88}
            multiline={true}
            value={content}
            onChangeText={setContent}
          />
        </View>
        <Text style={themedStyles.typeStyle}>Type</Text>
        <View style={themedStyles.middleSection}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <QuesttionType
              type="rectangle"
              checked={questionType === 'single'}
              onPress={() => {
                if (questionType !== 'single') {
                  setChosenOptions(0);
                  setIsAnswer1Correct(false);
                  setIsAnswer2Correct(false);
                  setIsAnswer3Correct(false);
                  setIsAnswer4Correct(false);
                }
                setQuestionType('single');
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <QuesttionType
              type="circle"
              checked={questionType === 'multiple'}
              onPress={() => {
                setQuestionType('multiple');
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <QuesttionType
              type="polygon"
              checked={questionType === 'integer'}
              onPress={() => {
                setQuestionType('integer');
              }}
            />
          </View>
        </View>
        <View
          style={{ width: '100%', flexDirection: 'row', marginTop: '1.48%' }}
        >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontFamily: FONTS.PoppinsMedium,
                color: theme.text.default,
              }}
            >
              {questionType === 'integer' ? 'Correct Answer' : 'Answers'}
            </Text>
          </View>
          {questionType !== 'integer' && (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text
                style={{
                  color: theme.text.default,
                  alignSelf: 'flex-end',
                  fontFamily: FONTS.PoppinsMedium,
                }}
              >
                Is Correct?
              </Text>
            </View>
          )}
        </View>
        {questionType !== 'integer' && (
          <View style={{ marginTop: '1%', width: '100%' }}>
            <View style={{ marginTop: '1%' }}>
              <InputAndCheckbox
                clicked={isAnswer1Correct}
                onPress={() => {
                  setChosenOptions(chosenOptions + (isAnswer1Correct ? -1 : 1));
                  if (!isAnswer1Correct && questionType === 'single') {
                    clearIsAnswerCorrect();
                  }
                  setIsAnswer1Correct(!isAnswer1Correct);
                }}
                onChangeText={(element) => setAnswer1content(element)}
                value={answer1content}
                id={1}
              />
            </View>
            <View style={{ marginTop: '1%' }}>
              <InputAndCheckbox
                clicked={isAnswer2Correct}
                onPress={() => {
                  setChosenOptions(chosenOptions + (isAnswer2Correct ? -1 : 1));
                  if (!isAnswer2Correct && questionType === 'single') {
                    clearIsAnswerCorrect();
                  }
                  setIsAnswer2Correct(!isAnswer2Correct);
                }}
                onChangeText={(element) => setAnswer2content(element)}
                value={answer2content}
                id={2}
              />
            </View>
            <View style={{ marginTop: '1%' }}>
              <InputAndCheckbox
                clicked={isAnswer3Correct}
                onPress={() => {
                  setChosenOptions(chosenOptions + (isAnswer3Correct ? -1 : 1));
                  if (!isAnswer3Correct && questionType === 'single') {
                    clearIsAnswerCorrect();
                  }
                  setIsAnswer3Correct(!isAnswer3Correct);
                }}
                onChangeText={(element) => setAnswer3content(element)}
                value={answer3content}
                id={3}
              />
            </View>
            <View style={{ marginTop: '1%' }}>
              <InputAndCheckbox
                clicked={isAnswer4Correct}
                onPress={() => {
                  setChosenOptions(chosenOptions + (isAnswer4Correct ? -1 : 1));
                  if (!isAnswer4Correct && questionType === 'single') {
                    clearIsAnswerCorrect();
                  }
                  setIsAnswer4Correct(!isAnswer4Correct);
                }}
                onChangeText={(element) => setAnswer4content(element)}
                value={answer4content}
                id={4}
              />
            </View>
          </View>
        )}
        {questionType === 'integer' && (
          <View style={{ marginTop: '1%' }}>
            <Input
              testID="addQuestion-correctAnswer-input"
              size="medium"
              placeholder="Enter correct answer"
              value={integerContent}
              onChangeText={setIntegerContent}
            />
          </View>
        )}
        <View
          style={{
            width: '100%',
            marginTop: '3%',
          }}
        >
          <Button
            testID="addQuestion-create-button"
            disabled={isButtonDisabled}
            size="xlarge"
            color="primary"
            onPress={() => {
              if (questionType === 'integer') {
                const newQuestion = {
                  type: questionType,
                  content: content,
                  image: 'https://akasda.co',
                  answers: [{ is_correct: true, content: integerContent }],
                  quiz_id: quiz !== undefined ? quiz[0].id : null,
                  id: question !== undefined ? question.id : null,
                };
                if (!(isEdit !== undefined && isEdit === true)) {
                  setQuestion([...questions, newQuestion]);
                } else {
                  setQuestion([
                    ...questions.slice(0, questionIndex - 1),
                    newQuestion,
                    ...questions.slice(questionIndex),
                  ]);
                }
                router.route(PATHS.CREATE, {
                  isEdit: isEdit,
                  quiz: quiz,
                  fromQuestionCreate: true,
                });
              } else {
                const newQuestion = {
                  type: questionType,
                  content: content,
                  image: 'https://akasda.co',
                  answers: [
                    { is_correct: isAnswer1Correct, content: answer1content },
                    { is_correct: isAnswer2Correct, content: answer2content },
                    { is_correct: isAnswer3Correct, content: answer3content },
                    { is_correct: isAnswer4Correct, content: answer4content },
                  ],
                  quiz_id: quiz !== undefined ? quiz[0].id : null,
                  id: question !== undefined ? question.id : null,
                };
                if (!(isEdit !== undefined && isEdit === true)) {
                  setQuestion([...questions, newQuestion]);
                } else {
                  setQuestion([
                    ...questions.slice(0, questionIndex - 1),
                    newQuestion,
                    ...questions.slice(questionIndex),
                  ]);
                }

                router.route(PATHS.CREATE, {
                  isEdit: isEdit,
                  quiz: quiz,
                  fromQuestionCreate: true,
                });
              }
            }}
          >
            {isEdit !== undefined && isEdit === true ? 'EDIT' : 'CREATE'}
          </Button>
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    textStyle: {
      color: theme.text.default,
      marginTop: '2.96%',
      fontFamily: FONTS.PoppinsMedium,
      fontSize: 14,
      alignSelf: 'flex-start',
    },
    typeStyle: {
      color: theme.text.default,
      fontSize: 14,
      fontFamily: FONTS.PoppinsMedium,
      marginTop: '1.48%',
      alignSelf: 'flex-start',
    },
    middleSection: {
      marginTop: '1.48%',
      flexDirection: 'row',
      width: '100%',
    },
  });
};
