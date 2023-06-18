import { PATHS } from 'consts/paths';
import { createLogo, discoverLogo, joinLogo } from 'icons';
import { getCardPropertiesByCardName } from 'utils/cardStyles';

test('get discover card property', () => {
  expect(getCardPropertiesByCardName(PATHS.DISCOVER)).toEqual({
    bgColor: '#FFEEDF',
    contentTextLine1: 'You can search for quizes with different',
    contentTextLine2: 'categories and start solving!',
    buttonColorName: 'orange',
    xml: discoverLogo,
    logoWidth: '163',
    logoHeight: '173.15',
  });
});

test('get join card property', () => {
  expect(getCardPropertiesByCardName(PATHS.JOIN)).toEqual({
    bgColor: '#E4FAE7',
    contentTextLine1: 'Join using the quiz code and start',
    contentTextLine2: 'competing!',
    buttonColorName: 'special',
    xml: joinLogo,
    logoWidth: '166',
    logoHeight: '174.62',
  });
});

test('get create card property', () => {
  expect(getCardPropertiesByCardName(PATHS.CREATE)).toEqual({
    bgColor: '#DFEDFF',
    contentTextLine1: 'Help people gaining more information',
    contentTextLine2: 'about specific topic by creating quizes',
    buttonColorName: 'primary',
    xml: createLogo,
    logoWidth: '178',
    logoHeight: '178',
  });
});
