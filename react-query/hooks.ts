import { useMutation, useQuery } from '@tanstack/react-query';
import {
  apiEditQuiz,
  apiEnterPin,
  apiGetAllPublicQuizzes,
  apiGetAllQuizzes,
  apiGetAllUsers,
  apiGetQuizParticipationWithQuizId,
  apiGetQuizWithId,
  apiGetQuizWithPublicId,
  apiGetQuizzesWithParams,
  apiGetUser,
  apiGetUserQuizzes,
  apiGetUserResults,
  apiLogin,
  apiPostQuiz,
  apiPostUser,
  apiRegisterUser,
  apiSolveQuiz,
  apiUpdateUserAvatar,
  apiUploadImage,
  deleteQuiz,
} from 'react-query/queries';
import { QUERY_KEYS } from 'react-query/queryKeys';
import { Author, QuizResponseData } from 'react-query/types';

type CustomMutationProps = {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
};

const defaultQueryOptions = { cacheTime: 0, refetchOnWindowFocus: false };

export const useLoginMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useQuizMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiPostQuiz,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useQuizzes = () => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.quizzes,
    queryFn: apiGetAllQuizzes,
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};

export const useQuizzesWithParameters = () => {
  const { data, ...rest } = useQuery({
    queryKey: QUERY_KEYS.quizzes_with_params,
    queryFn: apiGetQuizzesWithParams,
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};

export const useQuizzesWithPublicId = (publicId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['quizwithpublicId', publicId],
    queryFn: () => apiGetQuizWithPublicId(publicId),
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};

export const usePublicQuizzes = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['public_quizzes'],
    queryFn: apiGetAllPublicQuizzes,
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};

export const getQuizWithId = (quizId: number): any => {
  const { data, ...rest } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => apiGetQuizWithId(quizId),
    ...defaultQueryOptions,
  });
  const quiz: QuizResponseData = data?.data;
  return { quiz: quiz ?? {}, ...rest };
};

export const deleteQuizMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUser = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['author', userId],
    queryFn: () => apiGetUser(userId),
    ...defaultQueryOptions,
  });
  const author: Author = data?.data;
  return { author: author ?? ({} as Author), ...rest };
};

export const useAllUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiGetAllUsers(),
    ...defaultQueryOptions,
  });
  const users: Author[] = data?.data?.users;
  return { users: users ?? [], ...rest };
};

export const useUserMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiPostUser,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUserQuizzes = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['quizzes' + userId],
    queryFn: () => apiGetUserQuizzes(userId),
    ...defaultQueryOptions,
  });
  const quizzes: QuizResponseData[] = data?.data?.quizzes;
  return { quizzes: quizzes ?? [], ...rest };
};

export const useUserRegisterMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiRegisterUser,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useQuizSolveMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiSolveQuiz,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useEnterPinMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiEnterPin,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUserResults = (userId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['quiz_participation', userId],
    queryFn: () => apiGetUserResults(userId),
    ...defaultQueryOptions,
  });

  const results = data?.data?.participations;

  return { results: results ?? [], ...rest };
};

export const useQuizParticipationWithQuizId = (quizId: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ['quiz_participation', quizId],
    queryFn: () => apiGetQuizParticipationWithQuizId(quizId),
    ...defaultQueryOptions,
  });

  const quiz_participations = data?.data?.participations;

  return { quiz_participations: quiz_participations ?? [], ...rest };
};

export const useQuizEditMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiEditQuiz,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUploadMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUploadImage,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};

export const useUpdateAvatarMutation = ({
  onSuccess,
  onError,
}: CustomMutationProps = {}) => {
  return useMutation({
    mutationFn: apiUpdateUserAvatar,
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (err) => {
      onError?.(err);
    },
  });
};
