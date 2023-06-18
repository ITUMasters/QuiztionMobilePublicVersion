import { formatAuthor } from 'utils/formatAuthor';

test('Author format with proper author', () => {
  expect(formatAuthor({ name: 'faruk', surname: 'avci' })).toBe('faruk');
});

test('Author format with author without name', () => {
  expect(formatAuthor({ surname: 'avci' })).toBe('');
});
