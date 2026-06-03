import fs from "fs-extra";
import type {
	CopyOptions,
	CopyPlanItem,
	CopyResult,
} from "../types/resource.js";
import { confirmAction } from "../utils/confirm.js";
import { collectCopyPlan, ensureReadablePath } from "../utils/files.js";

interface CopyResourceOptions extends CopyOptions {
	resourceName: string;
	sourcePath: string;
	targetFile?: string;
}

export async function copyResource(
	options: CopyResourceOptions,
): Promise<CopyResult> {
	await ensureReadablePath(options.sourcePath);

	const plan = await collectCopyPlan(
		options.sourcePath,
		options.cwd,
		options.targetFile,
	);
	const result = createEmptyResult(options.resourceName);

	if (options.dryRun) {
		for (const item of plan) {
			if (item.exists) {
				result.wouldOverwrite.push(item.relativePath);
			} else {
				result.wouldCopy.push(item.relativePath);
			}
		}

		return result;
	}

	for (const item of plan) {
		const shouldCopy = await shouldCopyItem(item, options);

		if (!shouldCopy) {
			result.skipped.push(item.relativePath);
			continue;
		}

		await fs.copy(item.sourcePath, item.targetPath, { overwrite: true });

		if (item.exists) {
			result.overwritten.push(item.relativePath);
		} else {
			result.copied.push(item.relativePath);
		}
	}

	return result;
}

function createEmptyResult(resourceName: string): CopyResult {
	return {
		resourceName,
		copied: [],
		overwritten: [],
		skipped: [],
		wouldCopy: [],
		wouldOverwrite: [],
	};
}

async function shouldCopyItem(
	item: CopyPlanItem,
	options: CopyResourceOptions,
): Promise<boolean> {
	if (!item.exists || options.force) {
		return true;
	}

	options.onBeforePrompt?.();

	try {
		return await confirmAction(
			`File "${item.relativePath}" already exists. Overwrite?`,
		);
	} finally {
		options.onAfterPrompt?.();
	}
}
