export const getPathTemplateName = (pathName: string) => {
  const paths = pathName.split('/');
  return paths[1];
};

export const getPathGroupId = (pathName: string) => {
  const paths = pathName.split('/');
  return Number(paths[paths.length - 1]);
};
