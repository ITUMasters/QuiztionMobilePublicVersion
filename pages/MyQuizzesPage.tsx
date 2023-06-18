import { logo } from 'icons';
import { StyleSheet, View } from 'react-native';
import { useUserQuizzes } from 'react-query/hooks';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { Icon, Layout } from 'ui';
import { Container } from 'ui';
import { MyQuizCard } from 'ui/MyQuizCard';

import { Loading } from './Loading';

export function MyQuizzesPage() {
  const getUserId = useId();
  const { quizzes, isFetching } = useUserQuizzes(getUserId);
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

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        <View style={{ width: '100%' }}>
          <View style={styles().logo}>
            <Icon xml={logo} width="100%" height={'68'} />
          </View>
          {quizzes.map((element) => (
            <MyQuizCard
              key={element.id}
              name={element.name}
              type={categoryDictionary[element.category]}
              isPublished={element.is_visible}
              quizId={element.id}
              pin={element.public_id}
            />
          ))}
        </View>
      </Container>
    </Layout>
  );
}

const styles = () => {
  return StyleSheet.create({
    logo: {
      marginTop: '9.48%',
    },
  });
};
