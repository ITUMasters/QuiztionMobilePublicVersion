import { ellipses, polygon, rectangle } from 'icons';
import { Text, View } from 'react-native';
import { useTheme } from 'theme';

import { Checkbox } from './Checkbox';
import { Icon } from './Icon';

type QuestionTypeProps = {
  type: string;
  checked: boolean;
  onPress: () => void;
};

export const QuesttionType = ({
  type,
  checked,
  onPress,
}: QuestionTypeProps) => {
  let xml: string = '';
  let firstText: string = '';
  let secondText: string = '';
  const { theme } = useTheme();
  switch (type) {
    case 'rectangle':
      xml = rectangle;
      firstText = 'Single';
      secondText = 'Option';
      break;
    case 'circle':
      xml = ellipses;
      firstText = 'Multiple';
      secondText = 'Option';
      break;
    case 'polygon':
      xml = polygon;
      firstText = 'Integer';
      secondText = 'Input';
      break;
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Icon width="75" height="75" xml={xml} />
      <View style={{ marginTop: 10 }}>
        <Checkbox type={type} checked={checked} onPress={onPress} />
      </View>
      <Text style={{ marginTop: 10, color: theme.text.default }}>
        {firstText}
      </Text>
      <Text style={{ color: theme.text.default }}>{secondText}</Text>
    </View>
  );
};
