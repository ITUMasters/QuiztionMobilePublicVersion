import { FONTS } from 'consts';
import { trash } from 'icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuestion, useSetQuestion } from 'recoil-store/questionStoreHook';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';

import { Icon } from './Icon';

type QuestionProps = {
  questionId: number;
  content: string;
  onPress: () => void;
};

export const Question = ({ questionId, content, onPress }: QuestionProps) => {
  const { theme } = useTheme();
  const setQuestion = useSetQuestion();
  const getQuestion = useQuestion();
  return (
    <TouchableOpacity
      style={styles(theme).wrapper}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        numberOfLines={1}
        style={{
          color: theme.text.default,
          fontSize: 14,
          fontFamily: FONTS.PoppinsMedium,
          paddingRight: '20%',
          paddingLeft: '2.32%',
        }}
      >
        {String(questionId)}. {content}
      </Text>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: '2.92%' }}>
        <Icon
          width="36"
          height="36"
          xml={trash}
          onPress={() => {
            setQuestion([
              ...getQuestion.slice(0, questionId - 1),
              ...getQuestion.slice(questionId),
            ]);
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: theme.questionCards.background,
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
    },
  });
};
