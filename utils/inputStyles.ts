import { InputSize } from '../ui/Input';

type InputSizesReturnType = {
  height: number;
  radius: number;
  fontSize: number;
};

type InputPaddingReturnType = {
  paddingLeft: number;
  paddingRight: number;
};

export const getInputPaddingByXmlProp = (
  xml: string,
): InputPaddingReturnType => {
  if (xml != null) {
    return {
      paddingLeft: 40,
      paddingRight: 40,
    };
  } else {
    return {
      paddingLeft: 16,
      paddingRight: 16,
    };
  }
};

export const getInputSizesBySizeProp = (
  size: InputSize,
): InputSizesReturnType => {
  switch (size) {
    case 'medium': {
      return {
        height: 40,
        radius: 8,
        fontSize: 16,
      };
    }
    case 'large': {
      return {
        height: 48,
        radius: 8,
        fontSize: 18,
      };
    }
  }
};
