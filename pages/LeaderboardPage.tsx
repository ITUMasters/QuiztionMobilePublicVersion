import { FONTS } from 'consts';
import { ANIMALS } from 'consts/animalPaths';
import { COLORS } from 'consts/colors';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  getQuizWithId,
  useAllUsers,
  useQuizParticipationWithQuizId,
  useQuizzes,
} from 'react-query/hooks';
import { useTheme } from 'theme';
import { Layout } from 'ui';
import { Container } from 'ui';
import { RankingCard } from 'ui/RankingCard';

import { Loading } from './Loading';

export function LeaderboardPage({ route }) {
  const theme = useTheme();

  const quizId = route.params.quizId;
  const quiz = getQuizWithId(quizId);
  const quizParticipationResponse = useQuizParticipationWithQuizId(quizId);

  const allUsersResponse = useAllUsers();

  const quizAvatar = useMemo(() => {
    const avatar = ANIMALS[Number(quizId) % ANIMALS.length].uri;
    return avatar;
  }, []);

  if (
    quizParticipationResponse.isFetching &&
    allUsersResponse.isFetching &&
    quiz.isFetching
  ) {
    return <Loading />;
  }
  const quiz_participations = quizParticipationResponse.quiz_participations;
  const users = allUsersResponse.users;

  let userIds = [];
  for (let i = 0; i < quiz_participations.length; i++) {
    userIds.push(quiz_participations[i].user_id);
  }

  const participatedUsers = users.filter((element) =>
    userIds.includes(element.id),
  );

  var dict = {};
  for (let i = 0; i < participatedUsers.length; i++) {
    dict[participatedUsers[i].id] = participatedUsers[i].name;
  }

  var dictForAvatarUrl = {};
  for (let i = 0; i < participatedUsers.length; i++) {
    dictForAvatarUrl[participatedUsers[i].id] = participatedUsers[i].avatar_url;
  }

  const themedStyles = styles();

  return (
    <Layout>
      <Container>
        <View style={themedStyles.wrapper}>
          <View style={themedStyles.image}>
            <Image source={quizAvatar} style={{ width: 75, height: 75 }} />
          </View>
          <View style={themedStyles.quizName}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                fontFamily: FONTS.PoppinsRegular,
                color:
                  theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
              }}
            >
              {quiz.quiz.name}
            </Text>
          </View>
        </View>
        <View style={{ width: '100%' }}>
          {quiz_participations.map((element, index) => (
            <RankingCard
              key={index}
              rank={index + 1}
              name={dict[element.user_id]}
              score={element.score}
              avatarUrl={dictForAvatarUrl[element.user_id]}
            />
          ))}
        </View>
      </Container>
    </Layout>
  );
}

const styles = () => {
  return StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    image: {
      marginTop: 30,
      justifyContent: 'center',
    },
    quizName: {
      marginTop: 5,
    },
  });
};
