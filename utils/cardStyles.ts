import { PATHS } from 'consts/paths';
import { createLogo, discoverLogo, joinLogo } from 'icons';
import { ButtonColor } from 'ui/Button';

type CardPropertiesReturnType = {
  bgColor: string;
  contentTextLine1: string;
  contentTextLine2: string;
  buttonColorName: ButtonColor;
  xml: string;
  logoWidth: string;
  logoHeight: string;
};

export const getCardPropertiesByCardName = (
  cardName: string,
): CardPropertiesReturnType => {
  let bgColor: string = '';
  let contentTextLine1: string = '';
  let contentTextLine2: string = '';
  let buttonColorName: ButtonColor = 'primary';
  let xml: string = '';
  let logoWidth: string = '0',
    logoHeight: string = '0';
  switch (cardName) {
    case PATHS.DISCOVER:
      bgColor = '#FFEEDF';
      contentTextLine1 = 'You can search for quizes with different';
      contentTextLine2 = 'categories and start solving!';
      buttonColorName = 'orange';
      xml = discoverLogo;
      (logoWidth = '163'), (logoHeight = '173.15');
      break;
    case PATHS.JOIN:
      bgColor = '#E4FAE7';
      contentTextLine1 = 'Join using the quiz code and start';
      contentTextLine2 = 'competing!';
      buttonColorName = 'special';
      xml = joinLogo;
      (logoWidth = '166'), (logoHeight = '174.62');
      break;
    case PATHS.CREATE:
      bgColor = '#DFEDFF';
      contentTextLine1 = 'Help people gaining more information';
      contentTextLine2 = 'about specific topic by creating quizes';
      buttonColorName = 'primary';
      xml = createLogo;
      (logoWidth = '178'), (logoHeight = '178');
  }
  return {
    bgColor,
    contentTextLine1,
    contentTextLine2,
    buttonColorName,
    xml,
    logoWidth,
    logoHeight,
  };
};
