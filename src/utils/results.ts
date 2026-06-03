import type { CopyResult } from "../types/resource.js";
import { logInfo, logSuccess, logWarning } from "./logger.js";

export function printCopyResult(result: CopyResult): void {
	if (result.wouldCopy.length > 0 || result.wouldOverwrite.length > 0) {
		logInfo(`Dry run for ${result.resourceName}:`);
		printList("Would copy", result.wouldCopy);
		printList("Would overwrite", result.wouldOverwrite);
		return;
	}

	const changedCount = result.copied.length + result.overwritten.length;

	if (changedCount > 0) {
		logSuccess(`${result.resourceName} copied.`);
		printList("Copied", result.copied);
		printList("Overwritten", result.overwritten);
	} else {
		logWarning(`${result.resourceName} copied no files.`);
	}

	printList("Skipped", result.skipped);
}

function printList(label: string, values: string[]): void {
	if (values.length === 0) {
		return;
	}

	logInfo(`${label}:`);

	for (const value of values) {
		logInfo(`* ${value}`);
	}
}
