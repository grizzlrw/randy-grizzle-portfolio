import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Polyfill TextEncoder/TextDecoder for JSDOM environment
// Some libraries (e.g., Next.js, node-fetch, or others) may rely on these globals.
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from "util";

declare const global: typeof globalThis & {
	TextEncoder?: typeof TextEncoder;
	TextDecoder?: typeof TextDecoder;
};

if (typeof global.TextEncoder === "undefined") {
	global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
	global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
}

// Minimal Request polyfill for Next's server-side utilities in Jest
if (typeof globalThis.Request === "undefined") {
	class RequestPolyfill {
		url: string;
		constructor(input: string) {
			this.url = input;
		}
	}

	(globalThis as typeof globalThis & { Request?: typeof Request }).Request = RequestPolyfill as unknown as typeof Request;
}