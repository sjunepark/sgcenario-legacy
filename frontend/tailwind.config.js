import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/sjpui/dist/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Noto Sans Kr", "Roboto", ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require("@tailwindcss/forms")]
};
