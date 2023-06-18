import { FONTS } from 'consts';
import { ANIMALS } from 'consts/animalPaths';
import { COLORS } from 'consts/colors';
import { PATHS } from 'consts/paths';
import { useRouter } from 'hooks';
import { leaderboard } from 'icons';
import { Loading } from 'pages/Loading';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { authorizedQueryClient } from 'react-query';
import {
  deleteQuizMutation,
  getQuizWithId,
  useQuizEditMutation,
} from 'react-query/hooks';
import { useId } from 'recoil-store/auth/IdStoreHooks';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';
import { getDefaultErrorMessage, showAlert } from 'utils/alert';

import { Button } from './Button';
import { Icon } from './Icon';

interface MyQuizCardProps {
  name: string;
  type: string;
  isPublished: boolean;
  quizId: number;
  pin: number;
}

export function MyQuizCard({
  name,
  type,
  isPublished,
  quizId,
  pin,
}: MyQuizCardProps) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const router = useRouter();
  const { quiz, isFetching } = getQuizWithId(quizId);

  const id = useId();
  const deleteMutation = deleteQuizMutation({
    onSuccess: async (res) => {
      authorizedQueryClient.refetchQueries(['quizzes' + id]);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const deleteQuiz = () => {
    deleteMutation.mutate({
      quizId,
    });
  };

  const EditQuizMutation = useQuizEditMutation({
    onSuccess: async () => {
      authorizedQueryClient.refetchQueries(['quizzes' + id]);
    },
    onError: (err) => {
      showAlert('Error happened', { message: getDefaultErrorMessage(err) });
    },
  });

  const editQuiz = () => {
    EditQuizMutation.mutate({
      id: quizId,
      is_visible: true,
    });
  };

  const animalAvatar = useMemo(() => {
    const avatar = ANIMALS[Number(quizId) % ANIMALS.length].uri;
    return avatar;
  }, []);

  if (isFetching) {
    <Loading />;
  }

  return (
    <View style={themedStyles.wrapper}>
      <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
        <View style={themedStyles.image}></View>
        <View style={themedStyles.image}>
          <Image source={animalAvatar} style={{ width: 75, height: 75 }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View
            style={{
              width: '90%',
              flex: 5,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 22,
                marginLeft: 10,
                fontFamily: FONTS.PoppinsRegular,
                color:
                  theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 12,

                marginTop: -3,
                marginLeft: 10,
                fontFamily: FONTS.PoppinsRegular,
                color:
                  theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
              }}
            >
              {type}
            </Text>
            <Text
              style={{
                fontSize: 12,

                marginLeft: 10,
                fontFamily: FONTS.PoppinsRegular,
                color:
                  theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
              }}
            >
              {isPublished ? 'Published' : 'Not Published'}
            </Text>
            <Text style={themedStyles.PIN}>PIN: {pin}</Text>
          </View>
          {isPublished && (
            <TouchableOpacity
              testID={pin.toString()}
              onPress={() => {
                router.route(PATHS.LEADERBOARD, { quizId: quizId });
              }}
              style={themedStyles.icon}
            >
              <Icon xml={leaderboard} width={'50'} height={'50'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {!isPublished && (
          <View style={themedStyles.smallButtonWrapper}>
            <Button
              size="small"
              color="primary"
              onPress={() => {
                editQuiz();
              }}
            >
              Publish
            </Button>
          </View>
        )}

        <View
          style={
            isPublished
              ? themedStyles.bigButtonWrapper
              : themedStyles.smallButtonWrapper
          }
        >
          <Button
            testID={'edit' + pin.toString()}
            size="small"
            color="primary"
            onPress={() => {
              router.route(PATHS.CREATE, { quiz: [quiz] });
            }}
          >
            Edit
          </Button>
        </View>

        <View
          style={
            isPublished
              ? themedStyles.bigButtonWrapper
              : themedStyles.smallButtonWrapper
          }
        >
          <Button size="small" color="danger" onPress={deleteQuiz}>
            Delete
          </Button>
        </View>
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
      width: '100%',
      borderRadius: 10,
      marginTop: 10,
    },
    image: {
      justifyContent: 'center',
    },
    icon: {
      flex: 2,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    smallButtonWrapper: {
      width: '30%',
    },
    bigButtonWrapper: {
      width: '45%',
    },
    PIN: {
      marginLeft: 10,
      fontSize: 12,
      color: theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
    },
  });
};
