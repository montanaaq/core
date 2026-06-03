import type { PackageDefinition, ResourceRegistry } from "../types/resource.js";

export const packagesRegistry = {
	biome: {
		name: "biome",
		source: "packages/biome",
		description: "Biome configuration package.",
	},
	prettier: {
		name: "prettier",
		source: "packages/prettier",
		description: "Prettier configuration package.",
	},
	eslint: {
		name: "eslint",
		source: "packages/eslint",
		description: "ESLint configuration package.",
	},
	husky: {
		name: "husky",
		source: "packages/husky",
		description: "Husky hooks package.",
	},
	"ts-config": {
		name: "ts-config",
		source: "packages/ts-config",
		description: "TypeScript configuration package.",
	},
} satisfies ResourceRegistry<PackageDefinition>;

export type PackageName = keyof typeof packagesRegistry;
