import { mail } from 'icons';
import {
  getInputPaddingByXmlProp,
  getInputSizesBySizeProp,
} from 'utils/inputStyles';

test('Input Padding with xml', () => {
  expect(getInputPaddingByXmlProp(mail)).toStrictEqual({
    paddingLeft: 40,
    paddingRight: 40,
  });
});

test('Input Padding without xml', () => {
  expect(getInputPaddingByXmlProp()).toStrictEqual({
    paddingLeft: 16,
    paddingRight: 16,
  });
});

test('Get input size medium case', () => {
  expect(getInputSizesBySizeProp('medium')).toStrictEqual({
    height: 40,
    radius: 8,
    fontSize: 16,
  });
});

test('Get input size large case', () => {
  expect(getInputSizesBySizeProp('large')).toStrictEqual({
    height: 48,
    radius: 8,
    fontSize: 18,
  });
});
