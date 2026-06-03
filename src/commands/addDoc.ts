import type { Command } from "commander";
import ora from "ora";
import { copyDoc } from "../services/copyDocs.js";
import type { CopyOptions } from "../types/resource.js";
import { logError } from "../utils/logger.js";
import { printCopyResult } from "../utils/results.js";

interface AddDocCommandOptions {
	force?: boolean;
	dryRun?: boolean;
}

export function registerAddDocCommand(program: Command): void {
	program
		.command("add-doc")
		.description(
			"Copy one or more documentation files into the current project.",
		)
		.argument("<docs...>", "Documentation names to copy.")
		.option("-f, --force", "Overwrite existing files without confirmation.")
		.option("--dry-run", "Show changes without writing files.")
		.action(
			async (docNames: string[], commandOptions: AddDocCommandOptions) => {
				for (const docName of docNames) {
					const spinner = ora(`Adding doc ${docName}...`).start();
					const options = createCopyOptions(commandOptions, spinner);

					try {
						const result = await copyDoc(docName, options);
						spinner.stop();
						printCopyResult(result);
					} catch (error) {
						spinner.fail(`Failed to add doc ${docName}.`);
						logError(error);
						process.exitCode = 1;
					}
				}
			},
		);
}

function createCopyOptions(
	options: AddDocCommandOptions,
	spinner: ReturnType<typeof ora>,
): CopyOptions {
	return {
		cwd: process.cwd(),
		dryRun: options.dryRun === true,
		force: options.force === true,
		onBeforePrompt: () => {
			spinner.stop();
		},
		onAfterPrompt: () => {
			spinner.start();
		},
	};
}
