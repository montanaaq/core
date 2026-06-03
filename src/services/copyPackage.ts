import { packagesRegistry } from "../registry/packages.js";
import type { CopyOptions, CopyResult } from "../types/resource.js";
import { resolveToolkitPath } from "../utils/paths.js";
import { copyResource } from "./copyResource.js";

export function getPackageNames(): string[] {
	return Object.keys(packagesRegistry);
}

export async function copyPackage(
	name: string,
	options: CopyOptions,
): Promise<CopyResult> {
	if (!isPackageName(name)) {
		throw new Error(
			`Unknown package "${name}". Available packages: ${getPackageNames().join(", ")}`,
		);
	}

	const packageDefinition = packagesRegistry[name];

	return copyResource({
		...options,
		resourceName: packageDefinition.name,
		sourcePath: resolveToolkitPath(packageDefinition.source),
	});
}

function isPackageName(name: string): name is keyof typeof packagesRegistry {
	return Object.hasOwn(packagesRegistry, name);
}
