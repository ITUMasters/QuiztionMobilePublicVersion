import { FONTS } from 'consts';
import { ANIMALS } from 'consts/animalPaths';
import { COLORS } from 'consts/colors';
import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Author } from 'react-query/types';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';

import { Button } from './Button';

interface QuizCardProps {
  name: string;
  type: string;
  owner: string;
  quizId: number;
  author: Author;
}

export function QuizCard({ name, type, owner, quizId, author }: QuizCardProps) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();

  const quizAvatar = useMemo(() => {
    const avatar = ANIMALS[Number(quizId) % ANIMALS.length].uri;
    return avatar;
  }, []);

  const userAvatarUrl = author.avatar_url;

  return (
    <View style={themedStyles.wrapper}>
      <View style={themedStyles.quizImage}>
        <Image source={quizAvatar} style={{ width: 75, height: 75 }} />
      </View>

      <View style={{ paddingLeft: 10, flex: 5 }}>
        <View style={{ flex: 3 }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: FONTS.PoppinsRegular,
              color:
                theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              marginTop: -5,
              fontFamily: FONTS.PoppinsRegular,
              color:
                theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
            }}
          >
            {type}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={
              userAvatarUrl
                ? { uri: userAvatarUrl }
                : require('../assets/images/default_avatar.jpeg')
            }
            style={themedStyles.image}
          />
          <Text
            style={{
              marginLeft: 5,
              fontFamily: FONTS.PoppinsRegular,
              color:
                theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
            }}
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >
            {owner}
          </Text>
        </View>
      </View>
      <View style={themedStyles.button}>
        <Button
          size="large"
          onPress={() => {
            router.route(PATHS.QUIZ_SOLVING, quizId);
          }}
        >
          Enter
        </Button>
      </View>
    </View>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
    wrapper: {
      padding: 10,
      backgroundColor:
        theme.currentTheme === 'light'
          ? COLORS.ORANGE[1]
          : COLORS.BLUE_DARK[15],
      flexDirection: 'row',
      borderRadius: 10,
      marginTop: 10,
    },
    quizImage: {
      justifyContent: 'center',
    },
    button: {
      flex: 2,
      justifyContent: 'center',
    },
    image: {
      width: 25,
      height: 25,
      borderRadius: 90,
    },
  });
};
