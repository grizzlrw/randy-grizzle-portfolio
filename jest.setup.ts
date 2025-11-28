import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Polyfill TextEncoder/TextDecoder for JSDOM environment
// Some libraries (e.g., Next.js, node-fetch, or others) may rely on these globals.
import { TextEncoder, TextDecoder } from "util";

declare const global: typeof globalThis & {
	TextEncoder?: typeof TextEncoder;
	TextDecoder?: typeof TextDecoder;
};

if (typeof global.TextEncoder === "undefined") {
	global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
	global.TextDecoder = TextDecoder;
}

// Minimal Request polyfill for Next's server-side utilities in Jest
declare const globalThis: typeof globalThis & {
	Request?: typeof Request;
};

if (typeof globalThis.Request === "undefined") {
	class RequestPolyfill {
		url: string;
		constructor(input: string) {
			this.url = input;
		}
	}

	globalThis.Request = RequestPolyfill as unknown as typeof Request;
}