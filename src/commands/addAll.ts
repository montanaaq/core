import type { Command } from "commander";
import ora from "ora";
import { copyDoc, getDocNames } from "../services/copyDocs.js";
import { copyPackage, getPackageNames } from "../services/copyPackage.js";
import type { CopyOptions } from "../types/resource.js";
import { logError } from "../utils/logger.js";
import { printCopyResult } from "../utils/results.js";

interface AddAllCommandOptions {
	force?: boolean;
	dryRun?: boolean;
}

export function registerAddAllCommand(program: Command): void {
	program
		.command("add-all")
		.description("Copy all packages and docs into the current project.")
		.option("-f, --force", "Overwrite existing files without confirmation.")
		.option("--dry-run", "Show changes without writing files.")
		.action(async (commandOptions: AddAllCommandOptions) => {
			for (const packageName of getPackageNames()) {
				const spinner = ora(`Adding package ${packageName}...`).start();
				const options = createCopyOptions(commandOptions, spinner);

				try {
					const result = await copyPackage(packageName, options);
					spinner.stop();
					printCopyResult(result);
				} catch (error) {
					spinner.fail(`Failed to add package ${packageName}.`);
					logError(error);
					process.exitCode = 1;
				}
			}

			for (const docName of getDocNames()) {
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
		});
}

function createCopyOptions(
	options: AddAllCommandOptions,
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
