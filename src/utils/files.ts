import path from "node:path";
import fs from "fs-extra";
import type { CopyPlanItem } from "../types/resource.js";
import { toPosixPath } from "./paths.js";

export async function pathExists(filePath: string): Promise<boolean> {
	return fs.pathExists(filePath);
}

export async function ensureReadablePath(filePath: string): Promise<void> {
	const exists = await pathExists(filePath);

	if (!exists) {
		throw new Error(`Source path does not exist: ${filePath}`);
	}
}

export async function collectCopyPlan(
	sourcePath: string,
	targetRoot: string,
	targetFile?: string,
): Promise<CopyPlanItem[]> {
	const stats = await fs.stat(sourcePath);

	if (stats.isFile()) {
		const relativePath = targetFile ?? path.basename(sourcePath);
		const targetPath = path.resolve(targetRoot, relativePath);

		return [
			{
				sourcePath,
				targetPath,
				relativePath: toPosixPath(relativePath),
				exists: await pathExists(targetPath),
			},
		];
	}

	const files = await listFiles(sourcePath);

	return Promise.all(
		files.map(async (filePath) => {
			const relativePath = path.relative(sourcePath, filePath);
			const targetPath = path.resolve(targetRoot, relativePath);

			return {
				sourcePath: filePath,
				targetPath,
				relativePath: toPosixPath(relativePath),
				exists: await pathExists(targetPath),
			};
		}),
	);
}

async function listFiles(rootPath: string): Promise<string[]> {
	const entries = await fs.readdir(rootPath, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.resolve(rootPath, entry.name);

			if (entry.isDirectory()) {
				return listFiles(entryPath);
			}

			if (entry.isFile()) {
				return [entryPath];
			}

			return [];
		}),
	);

	return files.flat();
}
