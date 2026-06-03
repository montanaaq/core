import ora from "ora";
import type { Command } from "commander";
import { copyPackage } from "../services/copyPackage.js";
import type { CopyOptions } from "../types/resource.js";
import { logError } from "../utils/logger.js";
import { printCopyResult } from "../utils/results.js";

interface AddPackageCommandOptions {
	force?: boolean;
	dryRun?: boolean;
}

export function registerAddCommand(program: Command): void {
	program
		.command("add")
		.description("Copy one or more packages into the current project.")
		.argument("<packages...>", "Package names to copy.")
		.option("-f, --force", "Overwrite existing files without confirmation.")
		.option("--dry-run", "Show changes without writing files.")
		.action(
			async (
				packageNames: string[],
				commandOptions: AddPackageCommandOptions,
			) => {
				for (const packageName of packageNames) {
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
			},
		);
}

function createCopyOptions(
	options: AddPackageCommandOptions,
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
