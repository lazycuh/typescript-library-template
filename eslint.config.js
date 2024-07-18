import tsEslint from 'typescript-eslint';

import baseConfig from '@lazycuh/eslint-config-base-with-vitest';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default tsEslint.config({
  extends: [...baseConfig]
});
