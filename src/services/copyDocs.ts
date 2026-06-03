import { docsRegistry } from "../registry/docs.js";
import type { CopyOptions, CopyResult } from "../types/resource.js";
import { resolveToolkitPath } from "../utils/paths.js";
import { copyResource } from "./copyResource.js";

export function getDocNames(): string[] {
	return Object.keys(docsRegistry);
}

export async function copyDoc(
	name: string,
	options: CopyOptions,
): Promise<CopyResult> {
	if (!isDocName(name)) {
		throw new Error(
			`Unknown doc "${name}". Available docs: ${getDocNames().join(", ")}`,
		);
	}

	const docDefinition = docsRegistry[name];

	return copyResource({
		...options,
		resourceName: docDefinition.name,
		sourcePath: resolveToolkitPath(docDefinition.source),
		targetFile: docDefinition.targetFile,
	});
}

function isDocName(name: string): name is keyof typeof docsRegistry {
	return Object.hasOwn(docsRegistry, name);
}
