
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const TURSO_SCRIPTS_URL: string;
	export const TURSO_SCRIPTS_AUTH: string;
	export const GITHUB_CLIENT_ID: string;
	export const GITHUB_CLIENT_SECRET: string;
	export const KAKAO_CLIENT_ID: string;
	export const KAKAO_CLIENT_SECRET: string;
	export const LC_FIG_SET_PARENT: string;
	export const FIG_PID: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const MANPATH: string;
	export const npm_package_devDependencies_prettier: string;
	export const TERM_PROGRAM: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const NODE: string;
	export const npm_package_devDependencies__lucia_auth_oauth: string;
	export const NVM_CD_FLAGS: string;
	export const INIT_CWD: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_typescript: string;
	export const TERM: string;
	export const SHELL: string;
	export const npm_package_scripts_db_generate: string;
	export const npm_package_devDependencies_vite: string;
	export const FIGTERM_SESSION_ID: string;
	export const npm_package_devDependencies_hangul_js: string;
	export const TMPDIR: string;
	export const HOMEBREW_REPOSITORY: string;
	export const npm_package_devDependencies_clsx: string;
	export const npm_package_scripts_lint: string;
	export const TERM_PROGRAM_VERSION: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_devDependencies_drizzle_kit: string;
	export const npm_package_scripts_validate: string;
	export const npm_package_scripts_db_generate_empty: string;
	export const TERM_SESSION_ID: string;
	export const npm_package_devDependencies_nanoid: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const ZSH: string;
	export const PNPM_HOME: string;
	export const FIG_SET_PARENT_CHECK: string;
	export const npm_package_devDependencies__floating_ui_dom: string;
	export const USER: string;
	export const NVM_DIR: string;
	export const npm_package_devDependencies_overlayscrollbars: string;
	export const npm_package_devDependencies_tailwind_variants: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_devDependencies_dotenv: string;
	export const COMMAND_MODE: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_package_devDependencies_better_sqlite3: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_devDependencies_lucia: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const FIG_JETBRAINS_SHELL_INTEGRATION: string;
	export const npm_package_devDependencies_svelte: string;
	export const LSCOLORS: string;
	export const npm_package_scripts_sync: string;
	export const npm_package_devDependencies_drizzle_orm: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const PATH: string;
	export const npm_package_scripts_db_check: string;
	export const TERMINAL_EMULATOR: string;
	export const npm_config_engine_strict: string;
	export const __CFBundleIdentifier: string;
	export const TTY: string;
	export const PWD: string;
	export const npm_package_devDependencies_overlayscrollbars_svelte: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_devDependencies_lucide_svelte: string;
	export const EDITOR: string;
	export const npm_lifecycle_event: string;
	export const npm_package_name: string;
	export const npm_package_scripts_db_drop: string;
	export const npm_package_devDependencies_pino: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies__tailwindcss_forms: string;
	export const npm_package_devDependencies_tailwind_merge: string;
	export const npm_package_scripts_db_pull: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__lucia_auth_adapter_sqlite: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const SHLVL: string;
	export const HOME: string;
	export const npm_package_type: string;
	export const npm_package_scripts_db_push: string;
	export const HOMEBREW_PREFIX: string;
	export const npm_package_scripts_db_studio: string;
	export const FIG_SET_PARENT: string;
	export const LOGNAME: string;
	export const LESS: string;
	export const npm_package_scripts_format: string;
	export const npm_lifecycle_script: string;
	export const LC_CTYPE: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const npm_package_devDependencies__libsql_client: string;
	export const npm_package_devDependencies__melt_ui_svelte: string;
	export const npm_config_user_agent: string;
	export const INFOPATH: string;
	export const HOMEBREW_CELLAR: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_devDependencies_prettier_plugin_organize_imports: string;
	export const npm_package_scripts_check: string;
	export const FIG_TERM: string;
	export const npm_package_devDependencies_svelte_floating_ui: string;
	export const npm_node_execpath: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		TURSO_SCRIPTS_URL: string;
		TURSO_SCRIPTS_AUTH: string;
		GITHUB_CLIENT_ID: string;
		GITHUB_CLIENT_SECRET: string;
		KAKAO_CLIENT_ID: string;
		KAKAO_CLIENT_SECRET: string;
		LC_FIG_SET_PARENT: string;
		FIG_PID: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		MANPATH: string;
		npm_package_devDependencies_prettier: string;
		TERM_PROGRAM: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		NODE: string;
		npm_package_devDependencies__lucia_auth_oauth: string;
		NVM_CD_FLAGS: string;
		INIT_CWD: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_typescript: string;
		TERM: string;
		SHELL: string;
		npm_package_scripts_db_generate: string;
		npm_package_devDependencies_vite: string;
		FIGTERM_SESSION_ID: string;
		npm_package_devDependencies_hangul_js: string;
		TMPDIR: string;
		HOMEBREW_REPOSITORY: string;
		npm_package_devDependencies_clsx: string;
		npm_package_scripts_lint: string;
		TERM_PROGRAM_VERSION: string;
		npm_package_scripts_dev: string;
		npm_package_devDependencies_drizzle_kit: string;
		npm_package_scripts_validate: string;
		npm_package_scripts_db_generate_empty: string;
		TERM_SESSION_ID: string;
		npm_package_devDependencies_nanoid: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		ZSH: string;
		PNPM_HOME: string;
		FIG_SET_PARENT_CHECK: string;
		npm_package_devDependencies__floating_ui_dom: string;
		USER: string;
		NVM_DIR: string;
		npm_package_devDependencies_overlayscrollbars: string;
		npm_package_devDependencies_tailwind_variants: string;
		npm_package_scripts_check_watch: string;
		npm_package_devDependencies_dotenv: string;
		COMMAND_MODE: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_package_devDependencies_better_sqlite3: string;
		SSH_AUTH_SOCK: string;
		npm_package_devDependencies_lucia: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies_tslib: string;
		npm_execpath: string;
		PAGER: string;
		FIG_JETBRAINS_SHELL_INTEGRATION: string;
		npm_package_devDependencies_svelte: string;
		LSCOLORS: string;
		npm_package_scripts_sync: string;
		npm_package_devDependencies_drizzle_orm: string;
		npm_config_frozen_lockfile: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		PATH: string;
		npm_package_scripts_db_check: string;
		TERMINAL_EMULATOR: string;
		npm_config_engine_strict: string;
		__CFBundleIdentifier: string;
		TTY: string;
		PWD: string;
		npm_package_devDependencies_overlayscrollbars_svelte: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		npm_package_devDependencies_lucide_svelte: string;
		EDITOR: string;
		npm_lifecycle_event: string;
		npm_package_name: string;
		npm_package_scripts_db_drop: string;
		npm_package_devDependencies_pino: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		XPC_FLAGS: string;
		npm_package_devDependencies__tailwindcss_forms: string;
		npm_package_devDependencies_tailwind_merge: string;
		npm_package_scripts_db_pull: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		npm_package_version: string;
		npm_package_devDependencies__lucia_auth_adapter_sqlite: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_svelte_check: string;
		SHLVL: string;
		HOME: string;
		npm_package_type: string;
		npm_package_scripts_db_push: string;
		HOMEBREW_PREFIX: string;
		npm_package_scripts_db_studio: string;
		FIG_SET_PARENT: string;
		LOGNAME: string;
		LESS: string;
		npm_package_scripts_format: string;
		npm_lifecycle_script: string;
		LC_CTYPE: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		npm_package_devDependencies__libsql_client: string;
		npm_package_devDependencies__melt_ui_svelte: string;
		npm_config_user_agent: string;
		INFOPATH: string;
		HOMEBREW_CELLAR: string;
		npm_package_devDependencies__types_node: string;
		npm_package_devDependencies_prettier_plugin_organize_imports: string;
		npm_package_scripts_check: string;
		FIG_TERM: string;
		npm_package_devDependencies_svelte_floating_ui: string;
		npm_node_execpath: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
