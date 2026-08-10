const baseConfig = require('@taoyage/configs/eslint-ts');

module.exports = {
  ...baseConfig,
  rules: {
    ...(baseConfig.rules || {}),
    // 禁用在新版 typescript-eslint 中已被移除的废弃规则
    '@typescript-eslint/no-duplicate-imports': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
  },
};
