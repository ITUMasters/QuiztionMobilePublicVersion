import { FONTS } from 'consts';
import { PATHS } from 'consts/paths';
import { logo } from 'icons';
import { StyleSheet, Text, View } from 'react-native';
import { useSetQuestion } from 'recoil-store/questionStoreHook';
import { useSetQuizInfo } from 'recoil-store/quizInfoStoreHook';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Container, Icon, Layout } from 'ui';
import { Card } from 'ui/Card';

export function DashboardPage() {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const setQuestion = useSetQuestion();
  const setQuizInfo = useSetQuizInfo();
  setQuestion([]);
  setQuizInfo({
    quizName: undefined,
    duration: undefined,
    category: 'Select Category',
  });

  return (
    <Layout>
      <Container>
        <View style={themedStyles.logo}>
          <Icon xml={logo} width="100%" height={'68'} />
        </View>
        <Text style={themedStyles.text}>
          Are you ready to explore quizzes and
        </Text>
        <Text style={themedStyles.text}>strengthen your knowledge?</Text>
        <View style={{ width: '100%' }}>
          <Card cardName={PATHS.DISCOVER} />
          <Card cardName={PATHS.JOIN} />
          <Card cardName={PATHS.CREATE} />
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    logo: {
      width: '100%',
      marginTop: 12,
    },
    text: {
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      fontFamily: FONTS.PoppinsRegular,
      fontWeight: '400',
      marginBottom: 8,
      color: theme.appBackground.dashboardTitleTextColor,
    },
    scrollView: {
      width: '100%',
      height: '100%',
    },
  });
};
