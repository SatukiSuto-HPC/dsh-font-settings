// Host loader entry for the @satuki_suto/dsh-font-settings plugin — runs in
// the DSH host process. Pure browser plugin: the host half intentionally has
// no behavior and NO npm dependencies, so the package activates identically
// under every install method (npm, git clone, folder copy — where linked
// installs skip the plugin's own dependencies and a required import would
// break activation). Font choices persist in the browser's localStorage;
// the CSS application and the settings page live in the browser half
// (lib/client.js).

/** Plugin name (also the roster entry identity). */
export const name = 'dsh-font-settings';

/** Apply the host half (no-op for a pure browser plugin). */
function apply(_ctx) {}

export { apply };
