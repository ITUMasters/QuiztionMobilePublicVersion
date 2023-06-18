import { FONTS } from 'consts';
import { PATHS } from 'consts/paths';
import { useModal, useRouter } from 'hooks';
import { logo } from 'icons';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  getQuizWithId,
  useQuizEditMutation,
  useQuizMutation,
  useUser,
} from 'react-query/hooks';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { useSetNavbarOpen } from 'recoil-store/navbar/NavbarStoreHooks';
import { useQuestion, useSetQuestion } from 'recoil-store/questionStoreHook';
import { useQuizInfo, useSetQuizInfo } from 'recoil-store/quizInfoStoreHook';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import {
  BottomSheet,
  Button,
  CategoryBottomSheet,
  Checkbox,
  Icon,
  Input,
  Layout,
  NavBar,
  Question,
} from 'ui';
import { Container } from 'ui/Container';
import { StateUpdater } from 'ui/StateUpdater';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';
import { isValidEmail } from 'utils/validators';

import { Loading } from './Loading';

export function QuizCreationPage({ route }) {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();
  const bottomSheetController = useModal();
  const bottomSheetController2 = useModal();
  const setNavbarOpen = useSetNavbarOpen();

  const getQuestion = useQuestion();
  const setQuestion = useSetQuestion();
  const quizInfo = useQuizInfo();
  const setQuizInfo = useSetQuizInfo();
  const getUserId = useId();

  const categories = [
    'general',
    'geography',
    'literature',
    'music',
    'sport',
    'history',
    'mathematics',
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

  const quizMutation = useQuizMutation({
    onSuccess: async (res) => {
      setQuestion([]);
      setQuizInfo({
        quizName: undefined,
        duration: undefined,
        category: 'Select Category',
      });
      router.route(PATHS.MY_QUIZZES);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const quizCreate = () => {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() + parseInt(quizInfo.duration),
    );

    quizMutation.mutate({
      author_id: getUserId,
      category: quizInfo.category,
      is_visible: false,
      name: quizInfo.quizName,
      end_date: currentDate,
      description: isPublic === true ? 'public' : 'private',
      questions: getQuestion,
      participant_mail: whiteList as any,
    });
  };

  const editQuizMutation = useQuizEditMutation({
    onSuccess: async () => {
      setQuestion([]);
      setQuizInfo({
        quizName: undefined,
        duration: undefined,
        category: 'Select Category',
      });
      router.route(PATHS.MY_QUIZZES);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const editQuiz = () => {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() + parseInt(quizInfo.duration),
    );
    editQuizMutation.mutate({
      id: quiz[0].id,
      category: quizInfo.category,
      name: quizInfo.quizName,
      end_date: currentDate,
      questions: getQuestion,
      participant_mail: whiteList as any,
      description: isPublic ? 'public' : 'private',
    });
  };

  const quiz = route.params?.quiz;
  const fromQuestionCreate = route.params?.fromQuestionCreate;
  const isEdit = quiz !== undefined; /*|| route.params?.isEdit*/
  const participants = isEdit ? quiz[0].participants : [];
  const [isPublic, setIsPublic] = useState(
    isEdit && participants !== null && participants !== undefined
      ? participants.length === 0
      : true,
  );
  const [mailValue, setMailValue] = useState('');

  const [whiteList, setWhiteList] = useState([]);
  let authors = [];
  for (let i = 0; i < participants.length; i++) {
    let user_idd = participants[i].user_id;
    authors.push(useUser(user_idd));
  }
  useEffect(() => {
    if (fromQuestionCreate) {
      return;
    }
    let minuteDiff = undefined;
    if (isEdit) {
      const currentDate = new Date();
      const endDate = new Date(quiz[0].end_date);
      const minDiff = Math.ceil(
        (endDate.getTime() - currentDate.getTime()) / (1000 * 60),
      );
      minuteDiff = minDiff;
      if (minuteDiff <= 0) minuteDiff = undefined;
    }

    setQuizInfo(
      isEdit
        ? {
            quizName: quiz[0].name,
            duration: minuteDiff,
            category: categoryDictionary[quiz[0].category],
          }
        : {
            quizName: quizInfo.quizName,
            duration: quizInfo.duration,
            category: quizInfo.category,
          },
    );
    setQuestion(isEdit ? quiz[0].questions : getQuestion);
  }, []);

  const isButtonDisabled = useMemo(() => {
    const c1 =
      quizInfo.quizName === undefined ||
      quizInfo.quizName === '' ||
      quizInfo.quizName.length < 2;
    const c2 = quizInfo.duration === undefined || quizInfo.duration === '';
    const c3 =
      quizInfo.category === undefined ||
      quizInfo.category === 'Select Category';

    const c4 = getQuestion.length === 0;
    return c1 || c2 || c3 || c4;
  }, [quizInfo, getQuestion]);

  let lastMails = [];
  const [flag, setFlag] = useState(false);

  for (let i = 0; i < authors.length; i++) {
    if (authors[i].isFetching) {
      return <Loading />;
    }
  }

  for (let i = 0; i < authors.length; i++) {
    lastMails.push(authors[i].author.email);
  }
  let isPublicForEdit = isEdit
    ? quiz[0].description === 'public'
      ? true
      : false
    : true;
  return (
    <Layout>
      <Container>
        <View
          style={{
            width: '100%',
          }}
        >
          {!flag && (
            <StateUpdater
              updateState={() => {
                setFlag(true);
                setWhiteList(lastMails);
                setIsPublic(isPublicForEdit);
              }}
            />
          )}
          <View style={themedStyles.logo}>
            <Icon xml={logo} width="100%" height={'68'} />
          </View>
          <View style={{ marginTop: '2.5%', alignItems: 'center' }}>
            <Input
              testID="createQuiz-name-input"
              size="medium"
              placeholder="Quiz Name"
              value={quizInfo.quizName !== undefined ? quizInfo.quizName : ''}
              onChangeText={(e) => {
                setQuizInfo({
                  quizName: e,
                  duration: quizInfo.duration,
                  category: quizInfo.category,
                });
              }}
            />
          </View>
          <View style={{ marginTop: '2.5%', alignItems: 'center' }}>
            <Input
              testID="createQuiz-duration-input"
              size="medium"
              placeholder="Enter duration (in minutes)"
              keyboardType="number-pad"
              value={
                quizInfo.duration !== undefined
                  ? quizInfo.duration.toString()
                  : ''
              }
              onChangeText={(e) => {
                setQuizInfo({
                  quizName: quizInfo.quizName,
                  duration: e,
                  category: quizInfo.category,
                });
              }}
            />
          </View>
          <View style={{ marginTop: '2.5%' }}>
            <Button
              testID="createQuiz-category-button"
              size="large"
              color={
                quizInfo.category === 'Select Category'
                  ? 'secondary'
                  : 'primary'
              }
              onPress={bottomSheetController.open}
            >
              {quizInfo.category}
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '2.5%',
              width: '100%',
            }}
          >
            <Text style={themedStyles.questionsTitle}>Questions</Text>
            <View style={themedStyles.addButton}>
              <View style={{ width: 108, height: 28 }}>
                <Button
                  testID="createQuiz-add-button"
                  size="small"
                  color="special"
                  onPress={() =>
                    router.route(PATHS.QUESTION_CREATE, {
                      isEdit: false,
                      quiz: quiz,
                    })
                  }
                >
                  Add
                </Button>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            {getQuestion.map((element, index) => (
              <View key={index} style={{ marginTop: 5 }}>
                <Question
                  questionId={index + 1}
                  content={element.content}
                  onPress={() => {
                    router.route(PATHS.QUESTION_CREATE, {
                      question: element,
                      isEdit: true,
                      questionIndex: index + 1,
                      quiz: quiz,
                    });
                  }}
                />
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Checkbox
              type="private"
              checked={isPublic}
              onPress={() => {
                setIsPublic(!isPublic);
              }}
            />
            <Text
              style={{
                color: theme.text.default,
                fontSize: 14,
                fontFamily: FONTS.PoppinsMedium,
                marginLeft: 4,
              }}
            >
              Public
            </Text>
          </View>
          {!isPublic && (
            <View style={{ width: '100%', marginTop: 12 }}>
              <Button
                testID="createQuiz-manageParticipants-button"
                color="special"
                size="xlarge"
                onPress={bottomSheetController2.open}
              >
                Manage Participations
              </Button>
            </View>
          )}
          <View
            style={{
              width: '100%',
              marginTop: '2%',
            }}
          >
            <Button
              testID="createQuiz-create-button"
              size="xlarge"
              color="primary"
              onPress={() => {
                isEdit ? editQuiz() : quizCreate();
              }}
              disabled={isButtonDisabled}
            >
              {isEdit ? 'EDIT' : 'CREATE'}
            </Button>
          </View>
        </View>
      </Container>
      {!isPublic && (
        <BottomSheet
          header="Manage Participants"
          onClose={() => setNavbarOpen(true)}
          controller={bottomSheetController2}
          onOpen={() => setNavbarOpen(false)}
        >
          <View
            style={{
              width: '100%',
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                justifyContent: 'center',
                marginTop: 6,
              }}
            >
              <Input
                testID="createQuiz-participantEmail-input"
                size="medium"
                placeholder="Enter email"
                value={mailValue}
                onChangeText={setMailValue}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={{ width: '100%', marginTop: 12 }}>
                <Button
                  testID="createQuiz-addParticipant-button"
                  size="xlarge"
                  color="primary"
                  onPress={() => {
                    setMailValue('');
                    if (isValidEmail(mailValue)) {
                      setWhiteList([...whiteList, mailValue]);
                    } else {
                      showAlert('Invalid email format');
                    }
                  }}
                >
                  Add
                </Button>
                <Button
                  testID="createQuiz-closeManageParticipantsBottomSheet-button"
                  style={themedStyles.cancelButton}
                  size="xlarge"
                  color="secondary"
                  onPress={() => {
                    bottomSheetController2.close();
                  }}
                >
                  Close
                </Button>
              </View>
              <Text
                style={{
                  color: theme.text.default,
                  fontFamily: FONTS.PoppinsMedium,
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  marginTop: 16,
                }}
              >
                Whitelist:{' '}
              </Text>
              {whiteList.map((element, index) => (
                <Text
                  style={{ alignSelf: 'flex-start', color: theme.text.default }}
                  key={index + 1}
                >
                  {index + 1}. {element}
                </Text>
              ))}
            </View>
          </View>
        </BottomSheet>
      )}
      <CategoryBottomSheet
        categories={categories}
        selectedCategory={quizInfo.category.toLowerCase()}
        onPress={(e) => {
          setQuizInfo({
            quizName: quizInfo.quizName,
            duration: quizInfo.duration,
            category: categoryDictionary[e],
          });
        }}
        bottomSheetController={bottomSheetController}
        onClose={() => setNavbarOpen(true)}
        onOpen={() => setNavbarOpen(false)}
      />
    </Layout>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    logo: {
      marginTop: '9.48%',
    },
    questionsTitle: {
      color: theme.text.default,
      fontFamily: FONTS.PoppinsMedium,
      fontSize: 18,
    },
    addButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      marginTop: 12,
    },
  });
};
