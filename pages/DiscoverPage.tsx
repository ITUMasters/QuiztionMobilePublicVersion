import { useModal } from 'hooks';
import { logo } from 'icons';
import { Loading } from 'pages/Loading';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { usePublicQuizzes, useQuizzes } from 'react-query/hooks';
import { useSetNavbarOpen } from 'recoil-store/navbar/NavbarStoreHooks';
import { useSetQuestion } from 'recoil-store/questionStoreHook';
import { useSetQuizInfo } from 'recoil-store/quizInfoStoreHook';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { Button, CategoryBottomSheet, Icon, Input, Layout } from 'ui';
import { Container } from 'ui';
import { QuizCard } from 'ui/QuizCard';
import { formatAuthor } from 'utils/formatAuthor';

export function DiscoverPage() {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const bottomSheetController = useModal();
  const setNavbarOpen = useSetNavbarOpen();
  const [selectedCategory, setSelectedCategory] = useState('none');
  let { quizzes, isFetching } = usePublicQuizzes();
  const [foundQuizzes, setFoundQuizzes] = useState([]);
  const [initializingFlag, setInitializingFlag] = useState(false);
  const setQuestion = useSetQuestion();
  const setQuizInfo = useSetQuizInfo();
  setQuestion([]);
  setQuizInfo({
    quizName: undefined,
    duration: undefined,
    category: 'Select Category',
  });

  if (isFetching) {
    return <Loading />;
  }

  const currentDate = new Date();

  quizzes = quizzes.filter((element) => {
    const endDate = new Date(element.end_date);
    return endDate.getTime() > currentDate.getTime();
  });

  const categories = [
    'general',
    'geography',
    'literature',
    'music',
    'sport',
    'history',
    'mathematics',
    'none',
  ];

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

  function searchQuiz(input) {
    setFoundQuizzes(
      quizzes.filter((element) => {
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
                color="primary"
                size="xlarge"
              >
                {categoryDictionary[selectedCategory]}
              </Button>
            </View>
          </View>
          {(initializingFlag ? foundQuizzes : quizzes).map(
            (item) =>
              (item.category === selectedCategory ||
                selectedCategory === 'none') && (
                <QuizCard
                  key={item.id}
                  name={item.name}
                  type={categoryDictionary[item.category]}
                  owner={formatAuthor(item.author)}
                  quizId={item.id}
                  author={item.author}
                />
              ),
          )}
        </View>
      </Container>
      <CategoryBottomSheet
        categories={categories}
        selectedCategory={selectedCategory}
        onPress={(e) => setSelectedCategory(e)}
        bottomSheetController={bottomSheetController}
        onClose={() => setNavbarOpen(true)}
        onOpen={() => setNavbarOpen(false)}
      />
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
