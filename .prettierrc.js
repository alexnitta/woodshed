const globalConfig = require('./.globalconfig');

const { tabWidth } = globalConfig;

module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    tabWidth,
    arrowParens: 'avoid',
};
