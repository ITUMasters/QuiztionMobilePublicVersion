import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';

import { quizInfoAtom } from './quizInfoStore';

export const useQuizInfo = (): any => {
  return useRecoilValue(quizInfoAtom);
};

export const useSetQuizInfo = (): SetterOrUpdater<any> => {
  return useSetRecoilState(quizInfoAtom);
};
