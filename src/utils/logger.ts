import process from "node:process";

export function logInfo(message: string): void {
	console.log(message);
}

export function logSuccess(message: string): void {
	console.log(`Success: ${message}`);
}

export function logWarning(message: string): void {
	console.warn(`Warning: ${message}`);
}

export function logError(error: unknown): void {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Error: ${message}`);
}

export function exitWithError(message: string): never {
	console.error(`Error: ${message}`);
	process.exit(1);
}
