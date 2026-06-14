# Montana Configs

Shared frontend configuration packages published under the `@montanaaq/*`
scope.

There is no `toolkit add` flow anymore. Install the config package you need and
wire it into the consuming project explicitly.

## Packages

- `@montanaaq/biome`
- `@montanaaq/eslint`
- `@montanaaq/husky`
- `@montanaaq/oxfmt`
- `@montanaaq/oxlint`
- `@montanaaq/prettier`
- `@montanaaq/ts-config`

## Prettier

```bash
npm install -D prettier @montanaaq/prettier
```

Use it from `package.json`:

```json
{
  "prettier": "@montanaaq/prettier"
}
```

Or from `prettier.config.cjs`:

```js
module.exports = require("@montanaaq/prettier");
```

## ESLint

```bash
npm install -D eslint typescript @eslint/js typescript-eslint @montanaaq/eslint
```

Use it from `eslint.config.js`:

```js
import config from "@montanaaq/eslint";

export default [
  ...config,
  {
    rules: {},
  },
];
```

The shared ESLint package is intentionally generic. It includes the JS/TS base
config and common rules only. Framework plugins, test runner plugins, import
rules, accessibility rules, and local overrides belong in the consuming project.

## TypeScript

```bash
npm install -D typescript @montanaaq/ts-config
```

Use it from `tsconfig.json`:

```json
{
  "extends": "@montanaaq/ts-config/tsconfig.json",
  "include": ["src"]
}
```

The shared config contains compiler rules plus the `@/* -> ./src/*` alias. It
does not include app, Node, DOM, JSX, Vite, or emit settings.

## Biome

```bash
npm install -D @biomejs/biome @montanaaq/biome
```

Use it from `biome.json`:

```json
{
  "extends": ["./node_modules/@montanaaq/biome/biome.json"]
}
```

## Oxlint

```bash
npm install -D oxlint @montanaaq/oxlint
```

Use it from `.oxlintrc.json`:

```json
{
  "extends": ["./node_modules/@montanaaq/oxlint/.oxlintrc.json"],
  "rules": {}
}
```

## Oxfmt

```bash
npm install -D oxfmt @montanaaq/oxfmt
```

Use the shared config explicitly:

```bash
oxfmt -c ./node_modules/@montanaaq/oxfmt/.oxfmtrc.json .
```

For editor auto-discovery, copy the package config into `.oxfmtrc.json` in the
consuming project.

## Husky

```bash
npm install -D husky @montanaaq/husky
```

Husky hooks must live in the consuming repository. Copy the files from
`node_modules/@montanaaq/husky/.husky` into the project's `.husky` directory.

## Development

Install workspace dependencies:

```bash
pnpm install
```

Create package tarballs for all workspace packages:

```bash
pnpm pack:all
```
