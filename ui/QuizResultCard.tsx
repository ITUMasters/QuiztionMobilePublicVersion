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

interface QuizResultCardProps {
  name: string;
  type: string;
  owner: string;
  correct: number;
  questionCount: number;
  id: number;
  author: Author;
}

const categoryDictionary = {
  general: 'General',
  sport: 'Sport',
  mathematics: 'Mathematics',
  geography: 'Geography',
  literature: 'Literature',
  history: 'History',
  music: 'Music',
  none: 'None',
};

export function QuizResultCard({
  name,
  type,
  owner,
  correct,
  questionCount,
  id,
  author,
}: QuizResultCardProps) {
  const router = useRouter();
  const theme = useTheme();

  const animalAvatar = useMemo(() => {
    const avatar = ANIMALS[Number(id) % ANIMALS.length].uri;
    return avatar;
  }, []);

  const userAvatarUrl = author.avatar_url;

  return (
    <View style={styles(theme).wrapper}>
      <View style={styles(theme).icon}>
        <Image source={animalAvatar} style={{ width: 75, height: 75 }} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View style={{ flexDirection: 'column', flex: 4 }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              paddingLeft: 10,
            }}
          >
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
              {categoryDictionary[type]}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}
          >
            <Image
              source={
                userAvatarUrl
                  ? { uri: userAvatarUrl }
                  : require('../assets/images/default_avatar.jpeg')
              }
              style={styles(theme).image}
            />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: FONTS.PoppinsRegular,
                color:
                  theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
              }}
            >
              {owner}
            </Text>
          </View>
        </View>
        {correct !== null && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsMedium,
                color: theme.theme.text.default,
                fontSize: 20,
              }}
            >
              {correct}/{questionCount}
            </Text>
          </View>
        )}
        {correct === null && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
              marginTop: 12,
            }}
          >
            <Button
              style={{ width: 80 }}
              size="large"
              onPress={() => router.route(PATHS.QUIZ_SOLVING, id)}
            >
              Solve
            </Button>
          </View>
        )}
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
    icon: {
      justifyContent: 'center',
    },
    button: {
      width: '40%',
      paddingRight: 10,
      marginLeft: 56,
      marginTop: 25,
      flex: 2,
    },
    image: {
      width: 25,
      height: 25,
      borderRadius: 2000,
    },
  });
};
