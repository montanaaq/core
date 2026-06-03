import type { DocDefinition, ResourceRegistry } from "../types/resource.js";

export const docsRegistry = {
	AGENTS: {
		name: "AGENTS",
		source: "docs/AGENTS.md",
		targetFile: "AGENTS.md",
		description: "Agent workflow guide.",
	},
	ARCHITECTURE: {
		name: "ARCHITECTURE",
		source: "docs/ARCHITECTURE.md",
		targetFile: "ARCHITECTURE.md",
		description: "Project architecture notes.",
	},
} satisfies ResourceRegistry<DocDefinition>;

export type DocName = keyof typeof docsRegistry;
