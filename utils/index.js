export const getParamsFromUrl = (path) => {
  return new URL(path, 'http://ru.ru').searchParams;
};
