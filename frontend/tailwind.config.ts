import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/sjpui/dist/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Noto Sans Kr", "Roboto", ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		forms({
			strategy: "class"
		}),
		typography
	]
} satisfies Config;
