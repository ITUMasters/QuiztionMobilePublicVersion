import { ModalController } from 'hooks/useModal';
import { View } from 'react-native';

import { BottomSheet } from './BottomSheet';
import { Button } from './Button';

type CategoryBottomSheetProps = {
  categories: string[];
  selectedCategory: string;
  onPress: (e: string) => void;
  bottomSheetController: ModalController;
  onOpen: () => void;
  onClose: () => void;
};

function setCategory(onPress: (e: string) => void, category: string) {
  onPress(category);
}

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

export const CategoryBottomSheet = ({
  categories,
  selectedCategory,
  onPress,
  bottomSheetController,
  onOpen,
  onClose,
}: CategoryBottomSheetProps) => {
  return (
    <BottomSheet
      header="Categories"
      onClose={onClose}
      controller={bottomSheetController}
      onOpen={onOpen}
    >
      <View
        style={{
          width: '100%',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((element) => (
            <View
              key={element}
              style={{ marginTop: 16, marginLeft: 10, marginRight: 10 }}
            >
              <Button
                testID={element}
                size="large"
                color={selectedCategory === element ? 'primary' : 'secondary'}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                onPress={() => {
                  setCategory(onPress, element);
                  bottomSheetController.close();
                }}
              >
                {categoryDictionary[element]}
              </Button>
            </View>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
};
