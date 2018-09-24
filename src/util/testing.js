/* eslint-disable import/prefer-default-export */

export function mockStyles(style) {
  const mockedClasses = {};

  Object.keys(style).forEach((property) => {
    mockedClasses[property] = '';
  });

  return mockedClasses;
}
