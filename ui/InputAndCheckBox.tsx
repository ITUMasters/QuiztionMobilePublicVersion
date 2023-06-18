import { View } from 'react-native';

import { Checkbox } from './Checkbox';
import { Input } from './Input';

type InputAndCheckboxProps = {
  id: number;
  clicked: boolean;
  onPress?: () => void;
  onChangeText?: (element: string) => void;
  value?: string;
};

export const InputAndCheckbox = ({
  id,
  clicked,
  onPress,
  onChangeText,
  value,
}: InputAndCheckboxProps) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: '1%' }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          flex: 0.9,
        }}
      >
        <Input
          size="medium"
          placeholder={'Answer ' + String(id)}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginLeft: '8%',
        }}
      >
        <Checkbox checked={clicked} onPress={onPress} />
      </View>
    </View>
  );
};
