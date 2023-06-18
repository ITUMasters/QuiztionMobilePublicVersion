import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';

import { questionAtom } from './questionStore';

export const useQuestion = (): any => {
  return useRecoilValue(questionAtom);
};

export const useSetQuestion = (): SetterOrUpdater<any> => {
  return useSetRecoilState(questionAtom);
};
