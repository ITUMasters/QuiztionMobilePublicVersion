import { getDefaultErrorMessage, showAlert } from 'utils/alert';

test('checking no error case', () => {
  expect(getDefaultErrorMessage()).toBeNull();
});

test('checking normal error case', () => {
  expect(
    getDefaultErrorMessage({
      response: { data: { errors: 'this is an error' } },
    }),
  ).toEqual('this is an error');
});

test('checking alerting case', () => {
  expect(
    showAlert('Faruk', { message: 'message', cancellable: false }),
  ).toBeTruthy();
});

test('checking alerting case', () => {
  expect(
    showAlert('Faruk', { message: 'message', cancellable: true }),
  ).toBeTruthy();
});

test('checking normal multiple error cases', () => {
  expect(
    getDefaultErrorMessage({
      response: {
        data: {
          errors: [
            { msg: 'this is an error' },
            { msg: 'this is another error' },
          ],
        },
      },
    }),
  ).toEqual('this is an error');
});

test('checking normal multiple error cases', () => {
  expect(
    getDefaultErrorMessage({
      response: {
        data: {
          errors: [
            { msg: 'this is an error' },
            { msg: 'this is another error' },
          ],
        },
      },
    }),
  ).toEqual('this is an error');
});
