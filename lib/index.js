// Host loader entry for the dsh-font-settings plugin — runs in the DSH host
// process. The host half carries the persisted Config schema (all fields
// volatile, so the settings form writes them live without remounting the
// row); every behavior — CSS application and the settings page — lives in
// the browser half (lib/client.js).

import z from '@deepseek-ai/schemastery';

/** Plugin name (also the roster entry identity). */
export const name = 'dsh-font-settings';

/**
 * Persisted font preferences, shared with the browser half through the
 * profile settings document.
 *
 * - `enable`    master switch for the font override.
 * - `uiFont`    CSS font-family stack for the whole GUI (`--dsw-font-family`).
 *               Default is Meiryo (メイリオ) so Japanese glyph shapes render
 *               natively instead of the shipped Chinese fallback stack.
 * - `codeFont`  CSS font-family stack for code (`--ds-font-family-code`).
 *               Empty string keeps the application default mono stack.
 */
export const Config = z.object({
  enable: z.boolean().default(true).volatile(),
  uiFont: z.string().default('Meiryo, "Yu Gothic UI", "Segoe UI", sans-serif').volatile(),
  codeFont: z.string().default('').volatile(),
});

/** Apply the host half (no behavior; pure browser plugin). */
function apply(_ctx) {}

export { apply };
