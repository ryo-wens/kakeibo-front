export const getPathTemplateName = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[1];
};

export const getPathGroupId = (pathName: string) => {
  const paths = pathName.split('/', 3);
  return Number(paths[paths.length - 1]);
};

export const getPathYear = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[3].slice(0, 4);
};

export const getPathMonth = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[4].slice(0, 2);
};

export const getGroupPathYear = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[5];
};

export const getGroupPathMonth = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[6];
};
