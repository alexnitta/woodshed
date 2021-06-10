const globalConfig = require('./.globalconfig');

const { tabWidth } = globalConfig;

module.exports = {
    extends: [
        'stylelint-prettier/recommended',
    ],
    ignoreFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/lib/**',
        '**/build/**',
    ],
    rules: {
        indentation: tabWidth,
        'string-quotes': 'single',
    },
};
