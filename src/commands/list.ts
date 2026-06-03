import type { Command } from "commander";
import { getDocNames } from "../services/copyDocs.js";
import { getPackageNames } from "../services/copyPackage.js";
import { logInfo } from "../utils/logger.js";

export function registerListCommand(program: Command): void {
	program
		.command("list")
		.description("Show available packages and docs.")
		.action(() => {
			logInfo("Available packages:");
			logInfo("");

			for (const packageName of getPackageNames()) {
				logInfo(`* ${packageName}`);
			}

			logInfo("");
			logInfo("Available docs:");
			logInfo("");

			for (const docName of getDocNames()) {
				logInfo(`* ${docName}`);
			}
		});
}
