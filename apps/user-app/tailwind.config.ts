import sharedConfig from "@pay/tailwind-config";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
	],
	theme: {
		extend: {
			...sharedConfig?.theme?.extend,
		},
	},
	plugins: [],
} satisfies Config;
