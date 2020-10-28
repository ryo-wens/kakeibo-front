export const getPathTemplateName = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[1];
};

export const getPathGroupId = (pathName: string) => {
  const paths = pathName.split('/', 3);
  return Number(paths[paths.length - 1]);
};

export const getPathYear = (pathname: string) => {
  const paths = pathname.split('/');
  return paths[2].slice(0, 4);
};

export const getPathMonth = (pathname: string) => {
  const paths = pathname.split('/');
  return paths[2].slice(5, 7);
};
