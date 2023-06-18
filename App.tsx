import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { PATHS } from 'consts/paths';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useAppFonts } from 'hooks';
import { AccountPage } from 'pages';
import { AccountEdit } from 'pages/AccountEditName';
import { DiscoverPage } from 'pages/DiscoverPage';
import { JoinPage } from 'pages/JoinPage';
import { LeaderboardPage } from 'pages/LeaderboardPage';
import { MyQuizzesPage } from 'pages/MyQuizzesPage';
import { MyResultsPage } from 'pages/MyResultsPage';
import { QuestionCreationPage } from 'pages/QuestionCreatePage';
import { QuizCreationPage } from 'pages/QuizCreationPage';
import { QuizSolvingPage } from 'pages/QuizSolvingPage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import { useAuth } from 'recoil-store/auth/AuthStoreHooks';
import { useNavbarOpen } from 'recoil-store/navbar/NavbarStoreHooks';
import { ThemeContextProvider, useTheme } from 'theme';
import { NavBar } from 'ui';
import { getHeaderOptions } from 'utils/getHeaderOptions';

import { DashboardPage } from './pages/DashboardPage';
import { IntroPage } from './pages/IntroPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { authorizedQueryClient, unauthorizedQueryClient } from './react-query';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [fontsLoaded] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <AppWithRecoil />
    </RecoilRoot>
  );
}

function AppWithRecoil() {
  const auth = useAuth();

  return (
    <NavigationContainer>
      <ThemeContextProvider>
        <View style={styles.container}>
          {auth ? <AuthorizedApp /> : <UnauthorizedApp />}
        </View>
      </ThemeContextProvider>
    </NavigationContainer>
  );
}

const AuthorizedTab = createBottomTabNavigator();
function AuthorizedApp() {
  const { theme, currentTheme } = useTheme();
  const headerOptions = { ...getHeaderOptions(theme), unmountOnBlur: true };
  const navbarOpen = useNavbarOpen();
  return (
    <QueryClientProvider client={authorizedQueryClient}>
      <AuthorizedTab.Navigator
        tabBar={(route) => (navbarOpen ? <NavBar route={route} /> : null)}
      >
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.DASHBOARD}
          component={DashboardPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.ACCOUNT}
          component={AccountPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.JOIN}
          component={JoinPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.DISCOVER}
          component={DiscoverPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.EDIT_NAME}
          component={AccountEdit}
          initialParams={{ type: 'name' }}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.EDIT_EMAIL}
          component={AccountEdit}
          initialParams={{ type: 'email' }}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.CREATE}
          component={QuizCreationPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.QUESTION_CREATE}
          component={QuestionCreationPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.MY_QUIZZES}
          component={MyQuizzesPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.MY_RESULTS}
          component={MyResultsPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.LEADERBOARD}
          component={LeaderboardPage}
        />
        <AuthorizedTab.Screen
          options={headerOptions}
          name={PATHS.QUIZ_SOLVING}
          component={QuizSolvingPage}
        />
      </AuthorizedTab.Navigator>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
    </QueryClientProvider>
  );
}

const UnauthorizedStack = createNativeStackNavigator();
function UnauthorizedApp() {
  const { theme, currentTheme } = useTheme();
  const headerOptions = getHeaderOptions(theme);
  return (
    <QueryClientProvider client={unauthorizedQueryClient}>
      <UnauthorizedStack.Navigator>
        <UnauthorizedStack.Screen
          options={headerOptions}
          name={PATHS.INTRO}
          component={IntroPage}
        />
        <UnauthorizedStack.Screen
          options={headerOptions}
          name={PATHS.REGISTER}
          component={RegisterPage}
        />
        <UnauthorizedStack.Screen
          options={headerOptions}
          name={PATHS.LOGIN}
          component={LoginPage}
        />
      </UnauthorizedStack.Navigator>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
});
