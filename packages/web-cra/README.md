# @woodshed/web-cra

_React web application built with Create React App_

## `react-app-rewired`

If you take a look at the scripts in package.json, you'll see that we are using [react-app-rewired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra) to override the Webpack configuration provided by [Create React App](https://github.com/facebook/create-react-app). We are doing this so that we don't have to transpile TypeScript in our dependency packages before consuming it in the web app. The inspiration for this approach comes from [this GitHub thread](https://github.com/facebook/create-react-app/issues/1333#issuecomment-593667643). Details are in `config-overrides.js`.

## Available scripts

`yarn lint`: runs ESLint against this package
`yarn test`: runs Jest unit tests
`yarn test-watch`: runs Jest unit tests in watch mode

If any of these scripts fail, the GitHub Actions workflow in the root of the monorepo at `.github/workflows/lint-and-unit-test.yml` will fail.

## ESLint configuration

Create React App has a specific way of dealing with linting. It includes a base ESLint configuration that will break the Webpack build process on linting errors. We have our own ESLint config file (`.eslintrc.js` at the monorepo root) that we want to apply across all packages. There are several ways to go about handling this, but the best approach so far has been to leave the Create React App setup alone and set up a separate linting workflow that uses our config. To accomplish this, we include an `.eslintrc.js` within `packages/web-cra` that just imports the config from the monorepo root. Our `lint-staged` script will pick up this config and lint our staged files with it. Also, there is a package.json script for running `eslint` in `--fix` mode, which you can run from `packages/web-cra` by using `yarn lint`.

You may come across [this part of the CRA docs](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config) that describes how to extend the ESLint config. Another approach is to use `react-app-rewired` and `customize-cra` to extend the CRA ESLint config. Both approaches seem to cause flaky linting that sometimes passes and sometimes fails the build without any difference in code, which leads to problems during deployment.
