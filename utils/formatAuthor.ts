export const formatAuthor = (owner: { name: string; surname: string }) => {
  if (owner.name != null) {
    return `${owner.name}`;
  }
  return '';
};
