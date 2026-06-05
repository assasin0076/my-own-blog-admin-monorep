export const normalizeSpaces = (str: string): string => {
  return str.trim().replace(/[\s\n\t]/g, '&');
};
