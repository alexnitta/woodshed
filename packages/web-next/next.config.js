/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable @typescript-eslint/no-var-requires

const withTM = require('next-transpile-modules')([
    '@woodshed/components',
    '@woodshed/utils',
]);

module.exports = () => {
    const transpileModules = withTM();

    return {
        ...transpileModules,
        debug: true,
    };
};
