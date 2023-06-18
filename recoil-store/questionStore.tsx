import { atom } from 'recoil';

export const questionAtom = atom<any>({
  default: [],
  key: 'question.Atom',
});
