module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  printWidth: 120,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
};
