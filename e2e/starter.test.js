import { by, detox, device, element, expect } from 'detox';

const { reloadApp } = require('detox-expo-helpers');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await reloadApp();
    await element(by.id('intro-switch')).tap();
    await element(by.id('intro-login-button')).tap();
    await element(by.id('login-email-input')).typeText('aa@aa.com');
    await element(by.id('login-password-input')).typeText('aaaaaa');
    await element(by.id('login-login-button')).tap();
  });

  test('Switch Theme', async () => {
    await element(by.id('navbar-account-button')).tap();
    await element(by.id('account-switch')).tap();
  });

  test('Edit Profile', async () => {
    await element(by.id('navbar-account-button')).tap();

    await element(by.id('account-edit-name-button')).tap();
    await element(by.id('edit-input')).typeText('AlpKartal');
    await element(by.id('edit-save-button')).tap();

    await element(by.id('account-edit-email-button')).tap();
    await element(by.id('edit-input')).typeText('aa@aa.com');
    await element(by.id('edit-save-button')).tap();
  });

  test('See My Quizzes and My Results', async () => {
    await element(by.id('navbar-account-button')).tap();
    await element(by.id('account-myQuizzes-button')).tap();

    await element(by.id('navbar-account-button')).tap();
    await element(by.id('account-myResults-button')).tap();
  });

  test('See Leaderboard', async () => {
    await element(by.id('navbar-account-button')).tap();
    await element(by.id('account-myQuizzes-button')).tap();
    await element(by.id('106848')).tap();
  });

  test('Create Public Quiz', async () => {
    await element(by.id('navbar-create-button')).tap();
    await element(by.id('createQuiz-name-input')).typeText('FIFAWC2022');
    await element(by.id('createQuiz-duration-input')).typeText('12');
    await element(by.id('createQuiz-category-button')).tap();
    await element(by.id('sport')).tap();

    await element(by.id('createQuiz-add-button')).tap();
    await element(by.id('addQuestion-questionBody-input')).typeText(
      'What is the age of Lionel Messi at FIFA World Cup 2022?',
    );
    await element(by.id('polygon')).tap();
    await element(by.id('addQuestion-correctAnswer-input')).typeText('35');
    await element(by.id('addQuestion-create-button')).tap();

    await element(by.id('createQuiz-create-button')).tap();
  });

  test('Create Private Quiz', async () => {
    await element(by.id('navbar-create-button')).tap();
    await element(by.id('createQuiz-name-input')).typeText('FIFAWC2022');
    await element(by.id('createQuiz-duration-input')).typeText('12');
    await element(by.id('createQuiz-category-button')).tap();
    await element(by.id('sport')).tap();

    await element(by.id('createQuiz-add-button')).tap();
    await element(by.id('addQuestion-questionBody-input')).typeText(
      'What is the age of Lionel Messi at FIFA World Cup 2022?',
    );
    await element(by.id('polygon')).tap();
    await element(by.id('addQuestion-correctAnswer-input')).typeText('35');
    await element(by.id('addQuestion-create-button')).tap();

    await element(by.id('private')).tap();
    await element(by.id('createQuiz-manageParticipants-button')).tap();
    await element(by.id('createQuiz-participantEmail-input')).typeText(
      'aa@aa.com',
    );
    await element(by.id('createQuiz-addParticipant-button')).tap();
    await element(
      by.id('createQuiz-closeManageParticipantsBottomSheet-button'),
    ).tap();
    await element(by.id('createQuiz-create-button')).tap();
  });

  test('Update Quiz', async () => {
    await element(by.id('navbar-account-button')).tap();
    await element(by.id('account-myQuizzes-button')).tap();
    await element(by.id('edit106848')).tap();
    await element(by.id('createQuiz-name-input')).clearText();
    await element(by.id('createQuiz-name-input')).typeText('FIFAWC2022');
    await element(by.id('createQuiz-duration-input')).typeText('12');
    await element(by.id('createQuiz-category-button')).tap();
    await element(by.id('sport')).tap();
    await element(by.id('private')).tap();
    await element(by.id('createQuiz-create-button')).tap();
  });

  test('Join Quiz', async () => {
    await element(by.id('navbar-join-button')).tap();
    await element(by.id('join-pin-input')).typeText('106848');
    await element(by.id('join-pin-button')).tap();
  });

  test('Solve Quiz', async () => {
    await element(by.id('navbar-join-button')).tap();
    await element(by.id('join-pin-input')).typeText('154468');
    await element(by.id('join-pin-button')).tap();

    await element(by.id('2')).tap();
    await element(by.id('4')).tap();
    await element(by.id('solveQuiz-next-button')).tap();

    await element(by.id('solveQuiz-integer-input')).typeText('150190075');
    await element(by.id('solveQuiz-next-button')).tap();
  });
});
