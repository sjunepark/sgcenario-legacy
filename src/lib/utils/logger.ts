import { dev } from "$app/environment";
import pino from "pino";

const logLevel = dev ? "trace" : "info";

const pinoConfig = {
	browser: {
		asObject: true,
	},
	level: logLevel,
};

export const logger = pino(pinoConfig);
