/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable @typescript-eslint/no-var-requires

const withTM = require('next-transpile-modules')([
    /**
     * IMPORTANT: all lower-level packages imported by this top-level package need to be listed
     * here
     * */
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
