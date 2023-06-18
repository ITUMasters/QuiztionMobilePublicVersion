import { isValidEmail } from 'utils/validators';

test('correct email validation', () => {
  expect(isValidEmail('faruk@gmail.com')).toBeTruthy();
});

test('wrong email validation', () => {
  expect(isValidEmail('faruk@gmailcom')).toBeFalsy();
});
