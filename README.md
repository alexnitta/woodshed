# Woodshed

> A monorepo boilerplate based on Lerna, TypeScript and React

_by Alex Nitta @ [alexnitta.com](https://alexnitta.com/)_

This project is a reflection of lessons learned when building applications with [Lerna](https://lerna.js.org/), [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org/). I'm writing a blog post to describe how I arrived at this particular setup which will link back to this repo.

## Caveats

It's worth noting that you should do your own research into how each of these tools work before you chose this path; this readme is not going to go into the fundamentals of any of them.

Reasons why you might want to clone this repo to start your own project:

1. You want to be able to split your code into multiple npm packages to support code reuse and separation of concerns
2. You want to work on a team of multiple developers while using multiple npm packages
3. You understand the tradeoffs of using TypeScript and React and have decided to use both
4. You want flexibility in all the other choices aside from these ones; in other words, you have your own ideas about how to implement other layers of your stack, such as a database and API.

Alternatives you could choose instead:

- [RedwoodJS](https://redwoodjs.com/) is a React-based framework that makes more choices for you and is more prescriptive in its structure. At the time I'm writing this, RedwoodJS is in beta and TypeScript support is not fully implemented, but it should be coming soon in v1.
- [Blitz](https://blitzjs.com/) is a fullstack framework built on top of [NextJS](https://nextjs.org/) with a novel approach to the data layer. TypeScript is fully supported. Also in beta, with a v1 promised soon.

In some places, you'll see me writing from the first person, in other places, I use "we." This is because this readme is serving both as an explanation of how the project is structured and a mock version of a readme in a real project being built by a team.

This boilerplate is intentionally bare-bones in some regards to give you more flexibility. Features that are missing include:

- any sort of backend database / API
- a styling library, such as [TailwindCSS](https://tailwindcss.com/) or [styled components](https://styled-components.com/)
- a deployment pipeline, such as a GitHub Actions workflow, to deploy your code to the web

If you choose to implement a GraphQL API, make sure to use a tool like [graphql-code-generator](https://www.graphql-code-generator.com/) to generate TypeScript definitions from your GraphQL schema. This will save time and prevent bugs inherent in manually declaring TypeScript type definitions that work with your GraphQL schema.

### Cloning the boilerplate

When cloning this boilerplate to start your own project, you'll want to do a find-and-replace for all instances of `@woodshed` and replace it with your own project name. There are a few other places where the "woodshed" name shows up (like in packages/web-cra/public/index.html) that you will also need to update. It goes without saying, but you should also edit this readme to avoid confusion as well.

## Project structure

The core monorepo workflow is to develop separate npm packages that address specific concerns, so that they can be portable and reusable. These separate npm packages are controlled by a single Git history, so that developers can work together on these packages without the additional complexity caused by merging changes in multiple repositories. We're using Lerna to make the monorepo workflow more manageable.

Per the Lerna convention, there is a folder within `/packages` for each npm package. Each of these folders contains a package.json and README.md along with any config files specific to that package. There is also a top-level package.json and README.md (this file), which are responsible for setting up tools used across the packages, including Lerna and others.

### Types of packages

Broadly speaking, there are two types of packages here: top-level packages, which only import other packages, and lower-level packages, which are imported by one or more packages. A top-level package is typically the thing that is built and deployed as a client-facing application. For a React web application, that usually means a package that is built using [Create React App](https://create-react-app.dev/), or a React-based framework such as [NextJS](https://nextjs.org/) or [Gatsby](https://www.gatsbyjs.com/).

In this boilerplate, the two top-level packages are `packages/web-cra` (built with Create React App) and `packages/web-next` (built with NextJS). All other packages are lower-level; i.e. they are not built into a client-facing app. You would not necessarily use both of these top-level packages; they are here for illustrative purposes only.

## Core feature: the TypeScript setup

In a typical TypeScript project, you would have a single `package.json` file that exposes the details of an NPM package written in TypeScript. The general workflow would be to write TypeScript code and transpile the code to JavaScript before publishing the package. Consumers of the package would be able to import the transpiled code as plain JavaScript. If a consumer was also working in TypeScript, they would import the `.d.ts` files as well, which are type definitions that allow interoperability between TypeScript projects.

To use such a workflow while developing several packages at once which depend on each other, you would have to run a process for each package that watches for changes in the `src` folder and transpiles them to JavaScript (and the various type definitions and sourcemaps). This is possible with either the `tsc` CLI (for pure TypeScript) or Webpack (when importing other file types like CSS or images). Each package would have its own `start` script which would watch for changes and transpile the TypeScript source into JavaScript within that package.

This workflow breaks down when running a local dev server like `webpack-dev-server` to run the top-level application. You run into race conditions and intermittent crashes that are very hard to debug - not to mention poor performance from all these running build processes. TypeScript has a feature called Project References which is intended to solve this problem for pure TypeScript projects with several interdependent packages. However, this isn't a solution when you need to use Webpack because you import stylesheets or images in your TypeScript. There is a Webpack loader for TypeScript called `ts-loader` which supports project references, but you still are stuck with the fact that each dependency package is bundled into a single JS file, which kills a lot of the benefit of hot module reloading in Webpack.

To avoid all these issues, this boilerplate uses a different approach. There is no `build` script set up for the lower-level packages because we do not intend to publish them individually. They exist only to share code within the monorepo. Instead, we are using `babel-loader` in the top-level package to resolve the imports for each dependency. In the `web-cra` package, this is accomplished by using [react-app-rewired](https://github.com/timarney/react-app-rewired) and [customize-cra](https://github.com/arackaf/customize-cra) to override the Webpack configuration provided by [Create React App](https://github.com/facebook/create-react-app). In the `web-next` package, this is accomplished by using [next-transpile-modules](https://github.com/kutlugsahin/next-transpile-modules) in the NextJS config file.

### How to know it's working

You'll know that this particular way of transpiling TypeScript is working because you can do this:

1. Start up the dev server for either `packages/web-cra` or `packages/web-next`:
    - cd to `packages/web-cra` or `packages/web-next`
    - run `yarn start`
2. Make some changes in any package imported by the top-level package, i.e. in `packages/components` or `packages/utils`
3. Notice that your changes in a lower-level package are immediately available in the top-level package, without any separate process watching for changes in the lower-level package. Hot module reloading works as you would expect.

**This is the core feature of this boilerplate, and the thing that is hard to figure out when you're trying to set things up from scratch.**

## Bonus features

### Code conventions

It's easy to spend a lot of time just setting up various tools like ESLint and prettier to enforce code conventions. Since I had already done this setup work, it seemed a shame to throw it out before sharing this project. Feel free to change or discard these configs however it best suits your needs. Out of the box, these conventions are enforced with a pre-commit hook. More detailed notes are in [./docs/code_conventions.md](./docs/code_conventions.md).

### GitHub Actions workflow

A GitHub Actions workflow is included in [./.github/workflows/lint-and-unit-test.yml](./.github/workflows/lint-and-unit-test.yml). This is a good example of how to leverage Lerna in a CI capacity by running scripts declared in the root package.json file. Every time this workflow runs, it will run `yarn lint-all` and `yarn test-all`, which is using `lerna run test --parallel --stream`. More detailed notes on these scripts are included below.

## Getting started

1. If you don't have `yarn` installed yet, run `brew install yarn`. Other installation options [are available](https://yarnpkg.com/en/docs/install).
2. Install and symlink all dependencies by running `lerna bootstrap` from the root of the monorepo.

Generally, you can find more detailed instructions on each package within its README.md file.

## Available scripts

These scripts are available in the top-level package.json and can be run from the root of the monorepo.

### Workflow scripts

These scripts are used by the GitHub Actions workflow, so any errors you see when running them locally will make the workflow fail. Use these to check your code before creating a PR.

1. **`yarn test-all`**: runs `yarn test` in every package.
2. **`yarn lint-all`**: runs three commands: `lint-js`, `lint-styles` and `check-types` (see details below).

### More scripts

#### `yarn clean-all`

This will delete the node_modules folder in each of the packages as well as the root node_modules folder. You will be required to answer "yes" to a prompt when deleting the node_modules within the packages.

#### `yarn fix-js`

Run `eslint` with the `--fix` flag to automatically fix linting issues across all packages. This is useful if you've just copy-pasted some code from elsewhere or done a find-and-replace with your editor that might have mangled your formatting.

#### `yarn lint-js`

Run `eslint` across all packages. You will not usually need to do this, since it's part of the pre-commit hook.

#### `yarn lint-styles`

Run `stylelint` across all packages. You will not usually need to do this, since it's part of the pre-commit hook.

#### `yarn check-types`

Run the TypeScript compiler in `--noEmit` mode to check your types without generating any JavaScript output files.

## Common tasks

### Install package dependencies

To install all dependencies, run:

```bash
yarn
```

Since we are using yarn workspaces, dependencies are installed in the root node_modules folder whenever possible (i.e. "hoisted" up) and then symlinked.

### Add a new dependency

#### For a single package

Most often, you will need to add a dependency for a specific project in `/packages`. An example would be installing `lodash` in `packages/web-cra`. To do this, you would do:
```bash
# from woodshed root folder
lerna add lodash --scope=@woodshed/web-cra # adds lodash as a production dependency
lerna add -D lodash --scope=@woodshed/web-cra # adds lodash as a development dependency
```

Note the `--scope=` part - this is because we are using npm [scoped packages](https://docs.npmjs.com/misc/scope). This is why our package names start with the namespace `@woodshed/`.

#### To the root of the monorepo

If you need to add a dependency to the root of woodshed, you would do:
```bash
# from woodshed root folder
yarn add lodash -W
```

This is a rare use case, and you have to pass `-W` to do it.

#### To all packages

To add a dependency to all the packages managed by the monorepo, you would do:

```
lerna add lodash
```

This is another rare use case. Read more on [`lerna add`](https://github.com/lerna/lerna/tree/main/commands/add#readme).

### Remove a dependency

#### For a single package

To remove a dependency from a package in `/packages`, you would run:
```bash
# from monorepo root folder
yarn workspace @woodshed/desktop remove lodash
```

#### From the root of the monorepo

If you need to remove a dependency from the root of the woodshed, you would do:
```bash
# from monorepo root folder
yarn remove lodash -W
```

### Create a new lerna-managed package within woodshed

Note that we are using [scoped npm packages](https://docs.npmjs.com/about-scopes) so each name starts with `@woodshed/`:

```
lerna create @woodshed/foo
```
