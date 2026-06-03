export type ResourceRegistry<
	TResource extends ResourceDefinition = ResourceDefinition,
> = Record<string, TResource>;

export interface ResourceDefinition {
	name: string;
	source: string;
	description?: string;
}

export interface PackageDefinition extends ResourceDefinition {}

export interface DocDefinition extends ResourceDefinition {
	targetFile?: string;
}

export interface CopyOptions {
	cwd: string;
	dryRun: boolean;
	force: boolean;
	onBeforePrompt?: () => void;
	onAfterPrompt?: () => void;
}

export interface CopyPlanItem {
	sourcePath: string;
	targetPath: string;
	relativePath: string;
	exists: boolean;
}

export interface CopyResult {
	resourceName: string;
	copied: string[];
	overwritten: string[];
	skipped: string[];
	wouldCopy: string[];
	wouldOverwrite: string[];
}
