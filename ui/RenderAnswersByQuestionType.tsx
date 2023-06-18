import { COLORS } from 'consts/colors';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';

import { Checkbox } from './Checkbox';
import { Input } from './Input';

export enum QuestionTypes {
  integerValue = 1,
  multiOption = 2,
  singleOption = 3,
}

interface AnswerProps {
  type: QuestionTypes;
  texts?: string[];
  answersOfQuestion: [{ id: number; content: string }];
  questionNo: number;
  questions: any;
  onQuestionAnswerChange: (
    index: number,
    newAnswer: { id: number; answers: [] },
  ) => void;
}

export function RenderAnswersByQuestionType({
  type,
  texts,
  answersOfQuestion,
  questionNo,
  questions,
  onQuestionAnswerChange,
}: AnswerProps) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const checkboxArray = [0, 1, 2, 3];

  switch (type) {
    case QuestionTypes.singleOption:
    case QuestionTypes.multiOption:
      return (
        <View>
          {checkboxArray.map((index) => {
            return (
              <View
                key={index}
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={themedStyles.answer}>
                  <Text style={themedStyles.text}>{texts[index]}</Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <Checkbox
                    type={(index + 1).toString()}
                    checked={
                      questions[questionNo - 1]['answers'].filter(
                        (element) => element.id === answersOfQuestion[index].id,
                      ).length > 0
                    }
                    onPress={() => {
                      if (type === QuestionTypes.singleOption) {
                        if (questions[questionNo - 1]['answers'].length === 0) {
                          onQuestionAnswerChange(questionNo - 1, {
                            id: questions[questionNo - 1].id,
                            answers: [
                              { id: answersOfQuestion[index].id },
                            ] as any,
                          });
                        } else {
                          onQuestionAnswerChange(questionNo - 1, {
                            id: questions[questionNo - 1].id,
                            answers: [],
                          });
                          onQuestionAnswerChange(questionNo - 1, {
                            id: questions[questionNo - 1].id,
                            answers: [
                              { id: answersOfQuestion[index].id },
                            ] as any,
                          });
                        }
                      } else {
                        if (
                          questions[questionNo - 1]['answers'].filter(
                            (element) =>
                              element.id === answersOfQuestion[index].id,
                          ).length === 0
                        ) {
                          let currentArray =
                            questions[questionNo - 1].answers.length === 0
                              ? []
                              : questions[questionNo - 1].answers;
                          currentArray.push({
                            id: answersOfQuestion[index].id,
                          }),
                            onQuestionAnswerChange(questionNo - 1, {
                              id: questions[questionNo - 1].id,
                              answers: currentArray,
                            });
                        } else {
                          let currentArray =
                            questions[questionNo - 1]['answers'];
                          let filteredArray = currentArray.filter(
                            (element) =>
                              element.id !== answersOfQuestion[index].id,
                          );
                          onQuestionAnswerChange(questionNo - 1, {
                            id: questions[questionNo - 1].id,
                            answers: filteredArray,
                          });
                        }
                      }
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      );

    case QuestionTypes.integerValue:
      return (
        <View style={{ marginTop: 20 }}>
          <Input
            testID="solveQuiz-integer-input"
            size="large"
            placeholder="Enter the integer valued answer"
            keyboardType="numeric"
            value={
              questions[questionNo - 1]['answers'].length > 0
                ? questions[questionNo - 1]['answers'][0].content
                : ''
            }
            onChangeText={(element) => {
              onQuestionAnswerChange(questionNo - 1, {
                id: questions[questionNo - 1].id,
                answers: element === '' ? [] : ([{ content: element }] as any),
              });
            }}
          ></Input>
        </View>
      );
  }
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
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
