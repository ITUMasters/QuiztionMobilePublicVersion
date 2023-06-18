import { FONTS } from 'consts';
import { COLORS } from 'consts/colors';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';

import { Button } from './Button';
import {
  QuestionTypes,
  RenderAnswersByQuestionType,
} from './RenderAnswersByQuestionType';

interface SolvableQuestionProps {
  quizName: string;
  questionIndex: string;
  imageSource?: ImageSourcePropType;
  text: string;
  type: QuestionTypes;
  onPress?: () => void;
  answers: any;
  questions: any;
  onQuestionAnswerChange: (
    index: number,
    newAnswer: { id: number; answers: [] },
  ) => void;
  questionNo: number;
}

export function SolvableQuestion({
  quizName,
  questionIndex,
  text,
  type,
  onPress,
  answers,
  questions,
  onQuestionAnswerChange,
  questionNo,
}: SolvableQuestionProps) {
  const theme = useTheme();
  const themedStyles = styles(theme);

  let answerTexts = [];
  for (let i = 0; i < answers.length; i++) {
    answerTexts.push(answers[i].content);
  }

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: FONTS.PoppinsRegular,
              color:
                theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
            }}
          >
            {quizName}
          </Text>
        </View>
        <View style={themedStyles.button}>
          <Button onPress={onPress} size="large" color="special">
            {questionIndex}
          </Button>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginTop: 12 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins_400Regular',
              color:
                theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
            }}
          >
            {text}
          </Text>
        </View>
      </View>
      <RenderAnswersByQuestionType
        type={type}
        texts={answerTexts}
        answersOfQuestion={answers}
        questionNo={questionNo}
        questions={questions}
        onQuestionAnswerChange={onQuestionAnswerChange}
      ></RenderAnswersByQuestionType>
    </View>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 16 / 9,
      borderRadius: 20,
      marginTop: 8,
    },
    button: {
      shadowColor: COLORS.BLACK,
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1,
      },
      borderColor: theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
      width: '30%',
    },
  });
};
