import { FONTS } from 'consts';
import { COLORS } from 'consts/colors';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Author } from 'react-query/types';
import { useTheme } from 'theme';
import { ThemeContextProps } from 'theme/types';

interface RankingCardProps {
  rank: string;
  name: string;
  score: string;
  avatarUrl: string;
}

export function RankingCard({
  rank,
  name,
  score,
  avatarUrl,
}: RankingCardProps) {
  const theme = useTheme();
  const usedStyles = styles(theme);

  const userAvatarUrl = avatarUrl;
  return (
    <View style={styles(theme).wrapper}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={usedStyles.rankWrapper}>
          <Text style={usedStyles.rank}>{rank}</Text>
        </View>

        <Image
          source={
            userAvatarUrl
              ? { uri: userAvatarUrl }
              : require('../assets/images/default_avatar.jpeg')
          }
          style={usedStyles.image}
        />
        <View style={usedStyles.nameWrapper}>
          <Text style={usedStyles.name}>{name}</Text>
        </View>
        <View style={usedStyles.scoreWrapper}>
          <Text style={usedStyles.score}>{score}</Text>
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
      flexDirection: 'row',
      borderRadius: 10,
      marginTop: 20,
    },
    rankWrapper: {
      width: 40,
    },
    rank: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 5,
      fontFamily: FONTS.PoppinsRegular,
      color: theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    nameWrapper: {
      width: 210,
    },
    name: {
      marginLeft: 5,
      fontSize: 16,
      fontFamily: FONTS.PoppinsRegular,
      color: theme.currentTheme === 'light' ? COLORS.BLACK : COLORS.WHITE,
    },
    scoreWrapper: { paddingHorizontal: 10 },
    score: {
      fontFamily: FONTS.PoppinsMedium,
      color: theme.theme.text.default,
      fontSize: 20,
    },
  });
};
