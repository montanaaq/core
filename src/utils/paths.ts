import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

export function getToolkitRoot(): string {
	return path.resolve(currentDir, "..", "..");
}

export function resolveToolkitPath(relativePath: string): string {
	return path.resolve(getToolkitRoot(), relativePath);
}

export function resolveProjectPath(cwd: string, relativePath: string): string {
	return path.resolve(cwd, relativePath);
}

export function toPosixPath(filePath: string): string {
	return filePath.split(path.sep).join("/");
}
