import { Theme } from 'theme/types';

export const getHeaderOptions = (theme: Theme) => {
  return {
    headerStyle: {
      backgroundColor: theme.header.background,
    },
    headerTitleStyle: { color: theme.header.text },
  };
};
