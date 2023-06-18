import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { IdAtom } from 'recoil-store/auth/IdStore';

export const useId = (): number => {
  return useRecoilValue(IdAtom);
};

export const useSetId = (): SetterOrUpdater<number> => {
  return useSetRecoilState(IdAtom);
};
