module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prefer-template': ['error']
  }
};
