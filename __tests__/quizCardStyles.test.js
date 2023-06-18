import { getQuizCardPropertiesByQuizCardName } from 'utils/quizCardStyles';

test('quiz card styles', () => {
  expect(getQuizCardPropertiesByQuizCardName('card')).toStrictEqual({
    bgColor: '',
    buttonColorName: 'primary',
  });
});
