// src/lib/polyfills.ts
// Ensure Buffer is available in the browser environment for Stellar SDK
if (typeof window !== 'undefined' && !(window as any).Buffer) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  (window as any).Buffer = require('buffer').Buffer;
}
