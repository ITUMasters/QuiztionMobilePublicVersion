import { useModal } from 'hooks';
import { logo } from 'icons';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  useQuizzes,
  useQuizzesWithParameters,
  useUserResults,
} from 'react-query/hooks';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { useSetNavbarOpen } from 'recoil-store/navbar/NavbarStoreHooks';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { BottomSheet, Button, Icon, Input, Layout } from 'ui';
import { Container } from 'ui';
import { QuizResultCard } from 'ui/QuizResultCard';

import { Loading } from './Loading';

export function MyResultsPage() {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const setNavbarOpen = useSetNavbarOpen();

  const [selectedCategory, setSelectedCategory] = useState('none');
  const getUserId = useId();
  const userResponse = useUserResults(getUserId);
  const quizzesResponse = useQuizzesWithParameters();
  const [foundQuizzes, setFoundQuizzes] = useState([]);
  const [initializingFlag, setInitializingFlag] = useState(false);

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

  if (userResponse.isFetching && quizzesResponse.isFetching) {
    return <Loading />;
  }
  const results = userResponse.results;
  const quizzes = quizzesResponse.quizzes;

  let quizIds = [];
  for (let i = 0; i < results.length; i++) {
    quizIds.push(results[i].quiz_id);
  }

  const participatedQuizzes = quizzes.filter((element) =>
    quizIds.includes(element.id),
  );

  const quizData = participatedQuizzes.map((element, index) => ({
    quizId: element.id,
    quizName: element.name,
    category: element.category,
    owner: element.author.name,
    correctAnswer: results.find((item) => item.quiz_id == element.id)?.score,
    questionCount: element.questions.length,
    author: element.author,
  }));

  const foundQuizzesData = foundQuizzes.map((element, index) => ({
    quizId: element.id,
    quizName: element.name,
    category: element.category,
    owner: element.author.name,
    correctAnswer: results.find((item) => item.quiz_id == element.id)?.score,
    questionCount: element.questions.length,
    author: element.author,
  }));

  function searchQuiz(input) {
    setFoundQuizzes(
      participatedQuizzes.filter((element) => {
        return (
          element.name.slice(0, input.length).toLowerCase() ==
          input.toLowerCase()
        );
      }),
    );
    setInitializingFlag(true);
  }
  return (
    <Layout>
      <Container>
        <View style={{ width: '100%' }}>
          <View style={themedStyles.logo}>
            <Icon xml={logo} width="100%" height={'68'} />
          </View>
          <View style={themedStyles.utils}>
            <Input
              containerStyle={{ width: '49%' }}
              fontSize={14}
              size="medium"
              placeholder="Search"
              onChangeText={(text) => searchQuiz(text)}
            />
            <View style={themedStyles.quizTypeButton}>
              <Button
                onPress={bottomSheetController.open}
                color={'primary'}
                size="xlarge"
              >
                {categoryDictionary[selectedCategory]}
              </Button>
            </View>
          </View>
          {(initializingFlag ? foundQuizzesData : quizData).map(
            (element, index) =>
              (element.category === selectedCategory ||
                selectedCategory === 'none') && (
                <QuizResultCard
                  key={index}
                  id={element.quizId}
                  name={element.quizName}
                  type={element.category}
                  owner={element.owner}
                  correct={element.correctAnswer}
                  questionCount={element.questionCount}
                  author={element.author}
                />
              ),
          )}
        </View>
      </Container>
      <BottomSheet
        header="Categories"
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
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              paddingLeft: 20,
              paddingRight: 20,
              justifyContent: 'center',
            }}
          >
            <View>
              <Button
                size="large"
                color={selectedCategory === 'general' ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('general');
                  bottomSheetController.close();
                }}
              >
                General
              </Button>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={
                  selectedCategory === 'geography' ? 'primary' : 'secondary'
                }
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('geography');
                  bottomSheetController.close();
                }}
              >
                Geography
              </Button>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 16,
              paddingRight: 20,
              justifyContent: 'center',
            }}
          >
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={selectedCategory === 'sport' ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('sport');
                  bottomSheetController.close();
                }}
              >
                Sport
              </Button>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={
                  selectedCategory === 'literature' ? 'primary' : 'secondary'
                }
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('literature');
                  bottomSheetController.close();
                }}
              >
                Literature
              </Button>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={selectedCategory === 'music' ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('music');
                  bottomSheetController.close();
                }}
              >
                Music
              </Button>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              marginTop: 16,
              paddingRight: 20,
              width: '100%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={
                  selectedCategory === 'mathematics' ? 'primary' : 'secondary'
                }
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('mathematics');
                  bottomSheetController.close();
                }}
              >
                Mathematics
              </Button>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={selectedCategory === 'history' ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('history');
                  bottomSheetController.close();
                }}
              >
                History
              </Button>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Button
                size="large"
                color={selectedCategory === 'none' ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setSelectedCategory('none');
                  bottomSheetController.close();
                }}
              >
                None
              </Button>
            </View>
          </View>
        </View>
      </BottomSheet>
    </Layout>
  );
}

const styles = (theme: ThemeContextProps) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.theme.appBackground.backgroundColor,
      alignItems: 'center',
    },
    logo: {
      marginTop: '9.48%',
    },
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
    quizTypeButton: {
      width: '49%',
      height: 41,
      alignSelf: 'center',
      marginLeft: '2%',
    },
    utils: {
      marginTop: '4%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });
};
