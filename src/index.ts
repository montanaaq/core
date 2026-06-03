#!/usr/bin/env node

import { Command } from "commander";
import { registerAddAllCommand } from "./commands/addAll.js";
import { registerAddDocCommand } from "./commands/addDoc.js";
import { registerAddCommand } from "./commands/addPackage.js";
import { registerListCommand } from "./commands/list.js";
import { logError } from "./utils/logger.js";

const program = new Command();

program
	.name("toolkit")
	.description(
		"Copy frontend toolkit packages and docs into the current project.",
	)
	.version("0.1.0");

registerListCommand(program);
registerAddCommand(program);
registerAddDocCommand(program);
registerAddAllCommand(program);

program.exitOverride();

try {
	await program.parseAsync(process.argv);
} catch (error) {
	if (error instanceof Error && error.name === "CommanderError") {
		process.exitCode = 1;
	} else {
		logError(error);
		process.exitCode = 1;
	}
}
