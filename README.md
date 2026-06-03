# Frontend Toolkit

CLI tool for copying shared frontend config packages and documentation into any project.

## Install

For local development, link the CLI from this repository:

```bash
npm install
npm run build
npm link
```

Then use `toolkit` from any project directory:

```bash
toolkit list
```

After publishing to npm, you can run it with:

```bash
npx frontend-toolkit list
```

Or install it globally:

```bash
npm install -g frontend-toolkit
toolkit list
```

## Available Resources

Show all registered packages and docs:

```bash
toolkit list
```

## Add Packages

Copy one package into the current project:

```bash
toolkit add biome
```

Copy multiple packages:

```bash
toolkit add biome prettier eslint husky ts-config
```

Available packages:

- `biome`
- `prettier`
- `eslint`
- `husky`
- `ts-config`

## Add Docs

Copy one documentation file:

```bash
toolkit add-doc AGENTS
```

Copy multiple documentation files:

```bash
toolkit add-doc AGENTS ARCHITECTURE
```

Available docs:

- `AGENTS`
- `ARCHITECTURE`

## Add Everything

Copy all registered packages and docs:

```bash
toolkit add-all
```

## Flags

Preview changes without writing files:

```bash
toolkit add biome --dry-run
toolkit add-doc AGENTS --dry-run
toolkit add-all --dry-run
```

Overwrite existing files without confirmation:

```bash
toolkit add biome --force
toolkit add-doc AGENTS --force
toolkit add-all --force
```

Without `--force`, the CLI asks before overwriting existing files.

## Development

Build the CLI:

```bash
npm run build
```

Run the CLI directly during development:

```bash
npm run dev -- list
npm run dev -- add biome --dry-run
```

Register new packages in `src/registry/packages.ts`.

Register new documentation files in `src/registry/docs.ts`.
