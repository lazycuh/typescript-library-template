# typescript-library-template [![](https://circleci.com/gh/babybeet/typescript-library-template.svg?style=svg&logo=appveyor)](https://app.circleci.com/pipelines/github/babybeet/typescript-library-template?branch=main)

This repository contains a complete scaffold that allows you to get started creating your React libraries with ease, below is the list of features:

- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/).
- [ESLint](https://eslint.org/).
- [Webpack](https://webpack.js.org/) support.
- [Husky](https://typicode.github.io/husky/).
- [lint-staged](https://www.npmjs.com/package/lint-staged) that will run ESLint, Prettier and a custom script to automatically re-generate the table of contents on every commit.
- [Prettier](https://prettier.io/).
- Unit testing with [Jest](https://jestjs.io/).
- CI/CD with [CircleCI](https://circleci.com/).

## Table of contents

<!-- toc -->

- [Installation](#installation)
- [How to use](#how-to-use)
- [Development](#development)
- [Testing](#testing)
- [Building and publishing](#building-and-publishing)
- [Manual testing](#manual-testing)

<!-- tocstop -->

<!-- Remove this once ready to publish
## Installation

- `npm`

  ```
  npm i -S @babybeet/eslint-config-base-with-jest
  ```

- `pnpm`

  ```
  pnpm i -S @babybeet/eslint-config-base-with-jest
  ```

- `yarn`

  ```
  yarn add @babybeet/eslint-config-base-with-jest
  ```
 -->

## How to use

## Development

To develop your library code, just add it to **lib/src**.

Be sure to add anything that you'd like to export to **lib/src/index.ts**, or else, nothing can be imported from your library.

## Testing

Add your test files next to the source files that you want to test, I chose this pattern instead of placing all of the test files inside a separate folder called **\_\_tests\_\_** because it is easier to see which modules already have a corresponding test file. Your test files should end with **.test.ts** for Jest to pick up.

Execute `pnpm test` to run all of your unit tests or `pnpm test -- --watch` to run all of your tests in watch mode. If you need to run a specific test file, pass its name like this `pnpm test -- add` assuming that there exists a test file named **add.test.ts** (`npm test -- Ad` also works thanks to Jest's case-insensitive partial matching).

## Building and publishing

Before you publish your library, you should update your README file to provide some documentation about your library and choose an appropriate software license. The following items will be copied to the final package in **\<root>/dist** folder to be published:

- **\<rootDir>/README.md**
- **\<rootDir>/LICENSE**
- **\<rootDir>/docs**
- **\<rootDir>/projects/lib/package.json**

Where **\<rootDir>** is the root directory of your library.

Execute `pnpm build` to build your source code. The built package will support both [CJS](https://nodejs.org/api/modules.html#modules-commonjs-modules) and [ESM](https://nodejs.org/api/esm.html#modules-ecmascript-modules) package formats.

Once you are ready to publish, you can execute `pnpm publish-package` to upload your library code to the npm registry (Be sure to `npm login` before publishing).

_Note: It's highly recommended, that, instead of manually publishing, you should use the CircleCI pipeline to do it because it will run linting, testing, and building steps before letting the publishing step happen._

## Manual testing

You should perform a manual check of your library locally to be sure that everything works as expected, to do that, you can update the `typescript-library-template` string inside **visual-test/package.json** file to the name of your library. Be sure to `pnpm install` inside **visual-test** folder so that the symlink to your library is updated, assuming that you've already built your library code inside **lib** folder.

After `pnpm install` inside **visual-test** folder, you can start using your local library code as if it were a third-party package, in other words, your import statement should look like this:

`import { Something } from 'typescript-library-template';`

instead of

`import { Something } from '../../../lib/src/;`

To begin testing, import your library code into `index.ts` file, then you can perform one of the following to verify that everything is working correctly.

- Run `pnpm verify:browser` to run your code as a browser app.
- Run `pnpm verify:node` to run your code as a Node app.
