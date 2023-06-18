import { axios } from 'react-query';

import { Question } from './types';

export const apiLogin = (data: { email: string; password: string }) => {
  return axios({ url: '/user/login', method: 'post', data });
};

export const apiGetAllQuizzes = () => {
  return axios({ url: '/quiz', method: 'get' });
};

export const apiGetQuizzesWithParams = () => {
  return axios({ url: '/quiz', method: 'get', params: { is_visible: 1 } });
};

export const apiGetAllPublicQuizzes = () => {
  return axios({
    url: '/quiz',
    method: 'get',
    params: { description: 'public', is_visible: 1 },
  });
};

export const apiGetQuizWithId = (quizId: number) => {
  return axios({ url: '/quiz/' + quizId, method: 'get' });
};

export const apiGetQuizWithPublicId = (public_id: string) => {
  return axios({
    url: '/quiz',
    method: 'get',
    params: { public_id },
  });
};

export const apiPostQuiz = (data: {
  name: string;
  category: string;
  remaining_time?: string;
  is_visible: boolean;
  author_id: number;
  description: string;
  end_date: Date;
  questions: Question[];
  participant_mail: [];
}) => {
  return axios({ url: '/quiz', method: 'post', data });
};

export const apiEditQuiz = (data: {
  id: number;
  name?: string;
  category?: string;
  is_visible?: boolean;
  remaining_time?: string;
  end_date?: Date;
  questions?: Question[];
  participant_mail?: [];
  description?: string;
}) => {
  return axios({ url: '/quiz/' + data.id, method: 'put', data });
};

export const deleteQuiz = (data: { quizId: number }) => {
  return axios({ url: '/quiz/' + data.quizId, method: 'delete' });
};

export const apiGetUser = (userId: number) => {
  return axios({ url: '/user/' + userId, method: 'get' });
};

export const apiGetAllUsers = () => {
  return axios({ url: '/user', method: 'get' });
};

export const apiPostUser = (data: {
  id: number;
  name: string;
  email: string;
}) => {
  return axios({ url: '/user/' + data.id, method: 'put', data });
};

export const apiGetUserQuizzes = (userId: number) => {
  return axios({ url: '/quiz', method: 'get', params: { author_id: userId } });
};

export const apiRegisterUser = (data: {
  name: string;
  surname: string;
  email: string;
  password: string;
}) => {
  return axios({ url: '/user/register', method: 'post', data });
};

export const apiSolveQuiz = (data: { quizId: number; questions: any }) => {
  return axios({ url: '/quiz/solve/' + data.quizId, method: 'post', data });
};

export const apiEnterPin = (data: { public_id: number }) => {
  return axios({ url: '/quiz/join', method: 'post', data });
};

export const apiGetUserResults = (userId: number) => {
  return axios({
    url: '/quiz_participation',
    method: 'get',
    params: { user_id: userId },
  });
};

export const apiGetQuizParticipationWithQuizId = (quizId: number) => {
  return axios({
    url: '/quiz_participation',
    method: 'get',
    params: { quiz_id: quizId },
  });
};

export const apiUploadImage = (formData: FormData) => {
  return axios({
    url: '/image',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
};

export const apiUpdateUserAvatar = ({
  userId,
  url,
}: {
  userId: number;
  url: string;
}) => {
  return axios({
    url: `/user/${userId}`,
    method: 'put',
    data: {
      avatar_url: url,
    },
  });
};
