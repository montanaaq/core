import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["dist", "build", "coverage", "node_modules"],
	},

	js.configs.recommended,

	...tseslint.configs.recommended,

	{
		files: ["**/*.{ts,tsx,js,jsx}"],

		plugins: {
			"jsx-a11y": jsxA11y,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},

		rules: {
			/**
			 * Аналог suspicious.noExplicitAny = off
			 */
			"@typescript-eslint/no-explicit-any": "off",

			/**
			 * Аналог style.noUnusedTemplateLiteral = off
			 */
			"no-template-curly-in-string": "off",

			/**
			 * Дополнительные полезные проверки
			 */
			"no-console": "warn",
			"no-debugger": "error",

			/**
			 * React Hooks
			 */
			...reactHooks.configs.recommended.rules,

			/**
			 * React Refresh (Vite)
			 */
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
	},

	{
		files: ["**/*.{jsx,tsx}"],

		...jsxA11y.flatConfigs.recommended,
	},
);
