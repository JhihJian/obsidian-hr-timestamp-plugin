import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDir = resolve(projectRoot, "..", "..", "outputs", "obsidian-hr-timestamp-plugin");
const files = ["main.js", "manifest.json", "README.md", "styles.css"];

await mkdir(outputDir, { recursive: true });

await Promise.all(
  files.map((file) => copyFile(resolve(projectRoot, file), resolve(outputDir, file)))
);
