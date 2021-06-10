/* eslint-disable */
const {
    addWebpackAlias,
    babelInclude,
    override,
} = require('customize-cra');
const path = require('path');

// Do not use the `useEslintRc` plugin from customize-cra here; it creates flaky linting that
// intermittently breaks the build.

module.exports = override(
    babelInclude([
        path.resolve('src'),
        // All TypeScript package dependencies need to be listed here
        path.resolve('../components/src'),
        path.resolve('../utils/src'),
    ]),
    // Added to prevent 'invalid hook call warning'. This is also why we have 'nohoist' set up
    // in packages/web/package.json.
    // See: https://reactjs.org/warnings/invalid-hook-call-warning.html
    // and: https://github.com/facebook/react/issues/13991
    addWebpackAlias({
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    }),
);
