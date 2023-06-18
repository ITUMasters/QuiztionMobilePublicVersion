export type Theme = {
  text: {
    default: string;
    aboutText: string;
  };
  button: {
    primary: {
      color: string;
      bg: string;
      border: string;
    };
    secondary: {
      color: string;
      bg: string;
      border: string;
    };
    danger: {
      color: string;
      bg: string;
      border: string;
    };
    special: {
      color: string;
      bg: string;
      border: string;
    };

    orange: {
      color: string;
      bg: string;
      border: string;
    };
  };
  input: {
    bg: string;
    color: string;
    border: string;
    focusBorder: string;
    placeholderColor: string;
  };

  inputJoin: {
    bg: string;
    color: string;
    border: string;
    focusBorder: string;
    placeholderColor: string;
  };

  appBackground: {
    backgroundColor: string;
    dashboardTitleTextColor: string;
  };
  navBar: {
    contentColor: string;
    pressedBackgroundColor: string;
    bgColor: string;
    borderColor: string;
    pressedIconColor: string;
  };

  icon: {
    color: string;
  };

  imageForTheme: {
    xml: string;
  };

  header: {
    background: string;
    text: string;
  };

  switch: {
    thumbColor: string;
    trackColorTrue: string;
    trackColorFalse: string;
  };

  bottomSheet: {
    bg: string;
    thumb: string;
  };
  questionCards: {
    background: string;
  };

  countDownTimer: {
    color: string;
  };
};

export type ThemeOption = 'dark' | 'light';
export type ThemeContextProps = {
  currentTheme: ThemeOption;
  toggle: () => void;
  theme: Theme;
};
