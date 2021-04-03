module.exports = {
  extends: ['airbnb', 'bliss', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'flowtype-errors/show-errors': 'off',
    'class-methods-use-this': 'off',
    'no-let': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'promise/avoid-new': 'off',
    'react/sort-comp': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-nested-ternary': 'off',
  },
  settings: {
    'import/extensions': ['.jsx', '.js', '.tsx', '.ts'],
    webpack: {
      config: './configs/webpack.config.eslint.babel.js',
    },
  },
};
