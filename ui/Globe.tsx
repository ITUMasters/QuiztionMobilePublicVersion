import { COLORS } from 'consts/colors';
import { home } from 'icons';
import { View } from 'react-native';

import { Icon } from './Icon';

export const Globe = ({ style }: { style: Object }) => {
  return (
    <View style={style}>
      <Icon color={COLORS.BLUE_MIDTONE[6]} width="64" height="64" xml={home} />
    </View>
  );
};
