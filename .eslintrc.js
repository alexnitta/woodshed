const path = require('path');

module.exports = {
    root: true,
    extends: [
        'airbnb',
        // This part comes from: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    env: {
        browser: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'prettier',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-tsdoc',
    ],
    rules: {
        'dot-notation': [
            2,
            {
                allowPattern: '^([a-z]+(_[a-z]+)+|__[a-z]+)$',
            },
        ],
        'import/extensions': [
            // Do not require file extensions on imports for js, jsx, ts and tsx files - see: https://github.com/benmosher/eslint-plugin-import/issues/1248
            'error',
            'always',
            {
                ignorePackages: true,
                pattern: {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            },
        ],
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        'no-underscore-dangle': 'off',

        // require blank lines in specific locations
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' }, // require blank line before return
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' }, // require blank line after variable block
            {
                blankLine: 'any',
                prev: ['const', 'let', 'var'],
                next: ['const', 'let', 'var'],
            }, // require blank line between variable blocks
            { blankLine: 'always', prev: 'directive', next: '*' }, // require blank line after directive like 'use strict';
            { blankLine: 'any', prev: 'directive', next: 'directive' }, // require blank line between directives like 'use strict';
        ],

        // disable react's destructuring rules and opt in to object destructuring only
        'prefer-destructuring': ['error', { object: true, array: false }],
        'react/destructuring-assignment': 'off',

        'prettier/prettier': ['error'],
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] }, // Allow JSX in all of these extensions
        ],
        'react/prop-types': [0], // Do not require React prop types since we are using TypeScript to define types

        // Let prettier handle indentation
        indent: 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-wrap-multilines': 'off',

        // Validate that TypeScript doc comments conform to the TSDoc specification
        'tsdoc/syntax': 'warn',

        // Prefer using the @typescript/eslint version of no-use-before-define; using the regular
        // eslint version can report incorrect errors
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],

        // TypeScript is checking our prop types for us
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',

        // We have another rule that protects against explicit `any` types
        '@typescript-eslint/explicit-module-boundary-types': [
            'error',
            {
                allowArgumentsExplicitlyTypedAsAny: true,
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
            },
            'eslint-import-resolver-lerna': {
                packages: path.resolve(__dirname, 'packages'),
            },
        },
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
