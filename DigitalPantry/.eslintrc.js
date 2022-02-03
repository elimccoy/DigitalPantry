module.exports = {
  plugins: [
    'react',
    'react-native',
    'react-hooks'
  ],
  parser: '@babel/eslint-parser',
  env: {
    'browser': true,
    'react-native/react-native': true,
  },
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      classes: true
    },
  },
  rules: {
    'no-tabs': 'error',
    'no-var': 'error',
    'no-const-assign': 'error',
    'no-trailing-spaces': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    // 'react-native/no-raw-text': 'warn',
    'react-native/no-single-element-style-arrays': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
  },
  globals: {
    fetch: false
  }
};