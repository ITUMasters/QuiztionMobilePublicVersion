import { useRouter } from 'hooks';
import { StyleSheet, Text, View } from 'react-native';
import { getCardPropertiesByCardName } from 'utils/cardStyles';

import { Button } from './Button';
import { Icon } from './Icon';

interface CardProps {
  cardName: string;
}

export function Card({ cardName }: CardProps) {
  const {
    bgColor,
    contentTextLine1,
    contentTextLine2,
    buttonColorName,
    xml,
    logoWidth,
    logoHeight,
  } = getCardPropertiesByCardName(cardName);

  const router = useRouter();

  return (
    <View style={styles(bgColor).wrapper}>
      <View style={styles(bgColor).icon}>
        <Icon xml={xml} width={logoWidth} height={logoHeight}></Icon>
      </View>
      <Text style={styles(bgColor).text}>{contentTextLine1}</Text>
      <Text style={styles(bgColor).text}>{contentTextLine2}</Text>

      <View style={styles(bgColor).button}>
        <Button
          onPress={() => router.route(cardName)}
          size="xlarge"
          color={buttonColorName}
        >
          {cardName}
        </Button>
      </View>
    </View>
  );
}

const styles = (bgColor: string) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: bgColor,
      width: '100%',
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 12,
      marginTop: '2.5%',
      marginBottom: 20,
      paddingTop: 20,
      paddingBottom: 20,
    },
    icon: {
      marginTop: 12.75,
      marginBottom: 16,
    },
    text: {
      paddingLeft: '5.33%',
      paddingRight: '5.33%',
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      color: '#3F4042',
    },
    button: {
      width: '100%',
      paddingLeft: '9.6%',
      paddingRight: '9.6%',
      marginTop: 10,
    },
  });
};
