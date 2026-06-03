import cds from '@sap/cds/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';
export default [
  ...cds.recommended,
  {
    languageOptions: {
      globals: {
        QUnit: 'readonly',
      },
    },
  },
  {
    ignores: [
      '*.css',
      'dist',
      'esm/*',
      'public/*',
      'tests/*',
      'scripts/*',
      '*.config.js',
      'node_modules',
      'coverage',
      '.next',
      'build',
      'eslint.config.mjs',
      'srv/external/*',
    ],
  },
  eslintConfigPrettier,
];
