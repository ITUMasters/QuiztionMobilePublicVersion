import { atom } from 'recoil';

export const quizInfoAtom = atom<any>({
  default: {
    quizName: undefined,
    duration: undefined,
    category: 'Select Category',
  },
  key: 'quizInfo.Atom',
});
