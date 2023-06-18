import { FONTS } from 'consts';
import { PATHS } from 'consts/paths';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'hooks';
import { arrowRight, mail, settings, signature } from 'icons';
import mime from 'mime';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { authorizedQueryClient } from 'react-query';
import {
  useUpdateAvatarMutation,
  useUploadMutation,
  useUser,
} from 'react-query/hooks';
import { useSetAuth } from 'recoil-store';
import { useId, useSetId } from 'recoil-store/auth/IdStoreHooks';
import { useSetQuestion } from 'recoil-store/questionStoreHook';
import { useSetQuizInfo } from 'recoil-store/quizInfoStoreHook';
import { useTheme } from 'theme';
import { Theme } from 'theme/types';
import { Button, Container, Icon, Layout, Switch } from 'ui';
import { showAlert } from 'utils/alert';
import { removeItem } from 'utils/storage';

import { Loading } from './Loading';

export function AccountPage() {
  const { toggle, currentTheme, theme } = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();
  const userId = useId();
  const { author, isFetching } = useUser(userId);
  const setId = useSetId();
  const setAuth = useSetAuth();
  const setQuestion = useSetQuestion();
  const setQuizInfo = useSetQuizInfo();
  setQuestion([]);
  setQuizInfo({
    quizName: undefined,
    duration: undefined,
    category: 'Select Category',
  });

  const [uploading, setUploading] = useState(false);

  const uploadMutation = useUploadMutation({
    onSuccess: (res) => {
      const imageUrl = res.data.url;
      updateAvatarMutation.mutate({
        userId,
        url: imageUrl,
      });
      setUploading(false);
    },
    onError: (err) => {
      setUploading(false);
    },
  });

  const updateAvatarMutation = useUpdateAvatarMutation({
    onSuccess: (res) => {
      authorizedQueryClient.refetchQueries(['author', userId]);
    },
    onError: (err) => {
      showAlert('Could not update user avatar');
    },
  });

  if (isFetching) {
    return <Loading />;
  }

  const logout = async () => {
    setId(0);
    setAuth(false);
    await removeItem('access_token');
    await removeItem('remember_me');
  };

  const uploadImage = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      showAlert('Image choose cancelled');
      return;
    }

    const uri: string = result.uri;

    const fileExtension = uri.slice(uri.lastIndexOf('.') + 1);

    const formdata = new FormData();

    formdata.append('image', {
      name: `image.${fileExtension}`,
      uri: result.uri,
      type: mime.getType(result.uri),
    } as any);

    setUploading(true);
    uploadMutation.mutate(formdata);
  };

  const userAvatarUrl = author.avatar_url;

  return (
    <Layout>
      <Container>
        <View style={themedStyles.innerContainer}>
          <View style={themedStyles.infoViewWithImage}>
            <TouchableOpacity onPress={uploadImage}>
              {uploading ? (
                <View style={themedStyles.loadingWrapper}>
                  <ActivityIndicator />
                </View>
              ) : (
                <Image
                  source={
                    userAvatarUrl
                      ? { uri: userAvatarUrl }
                      : require('../assets/images/default_avatar.jpeg')
                  }
                  style={themedStyles.image}
                />
              )}
            </TouchableOpacity>
            <View style={themedStyles.infoViewWithoutImage}>
              <Text style={themedStyles.nameText}>{author.name}</Text>
              <View style={themedStyles.mailInfo}>
                <Icon xml={mail} color={theme.icon.color} />
                <Text style={themedStyles.mailText}>{author.email}</Text>
              </View>
            </View>
          </View>
          <View style={themedStyles.buttons}>
            <Button
              testID="account-myQuizzes-button"
              onPress={() => router.route(PATHS.MY_QUIZZES)}
              style={{ width: '100%' }}
              color="primary"
              size="xlarge"
            >
              My Quizzes
            </Button>
            <Button
              testID="account-myResults-button"
              onPress={() => router.route(PATHS.MY_RESULTS)}
              style={{ width: '100%', marginTop: 12 }}
              color="secondary"
              size="xlarge"
            >
              My Results
            </Button>
          </View>
          <View style={themedStyles.settingsTitle}>
            <Icon xml={settings} color={theme.icon.color} />
            <Text style={themedStyles.settingsText}>Settings</Text>
          </View>
          <View style={{ marginTop: 12, width: '100%' }}>
            <TouchableOpacity
              testID="account-edit-name-button"
              onPress={() => router.route(PATHS.EDIT_NAME)}
              style={themedStyles.inputWrapper}
            >
              <Icon
                color={theme.text.default}
                style={themedStyles.inputIconLeft}
                xml={signature}
              />
              <Text style={themedStyles.text}>Change Name</Text>
              <Icon
                color={theme.text.default}
                style={themedStyles.inputIconRight}
                xml={arrowRight}
              />
            </TouchableOpacity>
            <TouchableOpacity
              testID="account-edit-email-button"
              onPress={() => router.route(PATHS.EDIT_EMAIL)}
              style={[themedStyles.inputWrapper, { marginTop: 12 }]}
            >
              <Icon
                color={theme.text.default}
                style={themedStyles.inputIconLeft}
                xml={mail}
              />
              <Text style={themedStyles.text}>Change Email</Text>
              <Icon
                color={theme.text.default}
                style={themedStyles.inputIconRight}
                xml={arrowRight}
              />
            </TouchableOpacity>
            <View style={themedStyles.themeChangerAndLogOut}>
              <View style={themedStyles.themeChanger}>
                <Switch
                  testID="account-switch"
                  onValueChange={toggle}
                  value={currentTheme === 'dark'}
                />
                <Text style={themedStyles.themeChangerLabel}>Dark Mode</Text>
              </View>
              <View style={themedStyles.logOutButtonWrapper}>
                <Button
                  onPress={logout}
                  style={themedStyles.logOutButton}
                  color="danger"
                  size="medium"
                >
                  Log Out
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </Layout>
  );
}

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.appBackground.backgroundColor,
      alignContent: 'center',
      paddingBottom: 0,
    },
    innerContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: theme.appBackground.backgroundColor,
      alignItems: 'center',
      marginTop: 20,
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 90,
      marginTop: 8,
    },
    loadingWrapper: {
      width: 90,
      height: 90,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoViewWithImage: {
      alignItems: 'center',
    },
    infoViewWithoutImage: {
      marginTop: 12,
      alignItems: 'center',
    },
    mailInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    nameText: {
      fontFamily: FONTS.PoppinsBold,
      fontSize: 20,
      color: theme.text.default,
    },
    locationText: {
      fontFamily: 'Poppins_500Medium',
      fontWeight: '500',
      color: theme.text.default,
      fontSize: 12,
    },
    mailText: {
      marginLeft: 8.67,
      fontFamily: 'Poppins_400Regular',
      color: theme.text.default,
      fontSize: 12,
      alignSelf: 'center',
    },
    aboutText: {
      color: theme.text.default,
      alignSelf: 'flex-start',
      marginLeft: '7.5%',
      fontFamily: 'Poppins_700Bold',
      fontWeight: '700',
      fontSize: 14,
      marginTop: '2.96%',
    },
    aboutMeInput: {
      backgroundColor: '#FFFFFF',
    },
    aboutContent: {
      color: theme.text.aboutText,
      fontFamily: FONTS.PoppinsMedium,
      fontSize: 12,
      alignSelf: 'flex-start',
    },
    settingsTitle: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      marginBottom: 8,
      marginTop: 20,
    },
    settingsText: {
      color: theme.text.default,
      marginLeft: 5,
      fontFamily: FONTS.PoppinsMedium,
      fontSize: 16,
    },
    bottom: {
      width: '100%',
      backgroundColor: theme.appBackground.backgroundColor,
    },
    saveButton: {
      width: 120,
      height: 32,
    },
    buttons: {
      width: '100%',
      marginTop: 16,
      flexDirection: 'column',
    },
    inputWrapper: {
      height: 48,
      width: '100%',
      position: 'relative',
      backgroundColor: theme.input.bg,
      borderColor: theme.input.border,
      justifyContent: 'center',
      borderRadius: 12,
      borderWidth: 1,
    },
    inputIconLeft: {
      position: 'absolute',
      top: 12,
      left: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputIconRight: {
      position: 'absolute',
      top: 12,
      right: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    themeChangerAndLogOut: {
      marginTop: 16,
      flexDirection: 'row',
    },

    themeChanger: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeChangerLabel: {
      marginLeft: 8,
      color: theme.text.default,
      fontSize: 16,
      fontFamily: FONTS.PoppinsMedium,
      lineHeight: 24,
    },
    logOutButtonWrapper: {
      alignItems: 'flex-end',
      width: '61%',
    },
    logOutButton: {
      width: 100,
    },

    text: {
      fontFamily: FONTS.PoppinsRegular,
      marginLeft: 48,
      fontSize: 16,
      color: theme.text.default,
    },
  });
};
