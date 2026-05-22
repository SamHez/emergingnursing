import { rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(scriptDirectory, "..");
const nextCachePath = join(projectRoot, ".next");

try {
  await rm(nextCachePath, { recursive: true, force: true });
  console.log("Removed stale .next cache.");
} catch (error) {
  console.error("Unable to remove .next cache.", error);
  process.exitCode = 1;
}
