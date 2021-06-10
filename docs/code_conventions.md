# Code conventions

## TypeScript configs

Each package has its own `.tsconfig.json` file that configures TypeScript and extends the base configuration in `tsconfig-package-base.json`. These files should be kept as similar as possible.

## Conventional Commits

We use the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) to write commit messages. This is important as it will be used to determine the version number during the CI workflow and to generate automated CHANGELOG.md files in each package. This is enforced with [commitlint](https://commitlint.js.org/#/) to ensure that every commit follows our format.

Keep in mind that your commit messages will become part of a change log, so you should write them to be as human-readable and user-friendly as possible.

Each commit has a **type** and an optional **scope**.

**Type** must be one of the following:

- `build`: Changes that affect the build system or external dependencies
- `chore`: Other changes that don't modify source or test files
- `ci`: Changes to our CI configuration files and scripts
- `docs`: Documentation-only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `test`: Adding missing tests or correcting existing tests

**Scope**, if included, must be a directory name within `packages/`, such as `web-cra`.

*Examples of valid commit format:*
```
fix: remove a circular dependency
```
- the type for this commit is `fix`
- there is not a scope for this commit (scopes are optional)
- a `fix` type of commit results in a patch version bump when `yarn bump-versions` is run later

```
feat(web-cra): add Profile page
```
- the type for this commit is `feat`
- the scope for this commit is `web`, which corresponds to `packages/web` (scopes are optional)
- a `feat` type of commit results in a minor version bump when `yarn bump-versions` is run later

```
feat(web-cra)!: lowercase email addresses before sending to API
```
- the type for this commit is `feat`
- the scope for this commit is `web-cra`, which corresponds to `packages/web-cra` (scopes are optional)
- a `!` denotes a breaking change, which results in a major version bump when `yarn bump-versions` is run later

## Prettier

We are using [prettier](https://prettier.io/) with a pre-commit hook to format code. We've configured prettier to work with [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/), and the two tools are performing different functions. Prettier is enforcing a consistent code style so we don't have to think about things like line breaks and semicolons. ESlint is protecting us from code smells like unused imports. We are using the widely vetted rules in the [Airbnb style guide](https://github.com/airbnb/javascript) as our base linting configuration.

There are several config files in the root of the monorepo that are used to set things up:
- .eslintrc.js => configures `eslint`
- .prettierrc.js => configures `prettier`
- .stylelintrc => configures `stylelint`

Note that each package can also include its own .eslintrc.js to extend the root configuration. The root eslint configuration assumes the use of TypeScript.

### Set up VS Code with Prettier

If you are using VSCode, it's a good idea to add the [Prettier - code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Check out the installation instructions for details on how to set up Prettier as the default code formatter for VS Code.

## Pre-commit hook

We are using [husky](https://github.com/typicode/husky) to provide a pre-commit hook that runs [lint-staged](https://github.com/okonet/lint-staged) to clean up our code. This may take a few seconds; this is because we are using lerna to run the `precommit` script in every package per [this example](https://github.com/sudo-suhas/lint-staged-multi-pkg). This setup may need to be adjusted later. There is a `.lintstagedrc.json` in each package that configures the `lint-staged` command; typically, it runs `eslint --fix` to fix TypeScript files and `stylelint --fix` to fix CSS files. This happens automatically before each commit. If there is a linting error that can't be fixed automatically, it will be shown in the console when you `git commit`.
