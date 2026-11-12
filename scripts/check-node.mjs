// Runtime security baseline: https://nodejs.org/en/blog/release/v24.22.1/
export function supportedNode(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) return false;
  const [, major, minor, patch] = match.map(Number);
  return major === 24 && (minor > 22 || (minor === 22 && patch >= 1));
}

if (!supportedNode(process.versions.node)) {
  console.error(`Node ${process.versions.node} is outside this project's supported security baseline. Use Node 24.22.1 or newer in the 24.x line (see .nvmrc). CVE-2026-111497 requires a patched Node runtime, not an npm dependency update.`);
  process.exitCode = 1;
}
