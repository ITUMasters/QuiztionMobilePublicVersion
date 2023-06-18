import { ButtonColor } from 'ui/Button';

type quizCardPropertiesReturnType = {
  bgColor: string;
  buttonColorName: ButtonColor;
};

export const getQuizCardPropertiesByQuizCardName = (
  name: string,
): quizCardPropertiesReturnType => {
  let bgColor: string = '';
  let buttonColorName: ButtonColor = 'primary';

  return {
    bgColor,
    buttonColorName,
  };
};
