import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const entry = "src/index.ts";
const outDir = "outputs/layers";
const storyboard = JSON.parse(readFileSync("src/data/storyboard.json", "utf8"));

const layers = ["Titles", "Cards", "Documents", "Kpis"];
const compositionBase = (video) => video.compositionId ?? video.id
  .split("_")
  .filter(Boolean)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join("");
const groups = storyboard.videos.map((video) => {
  const base = compositionBase(video);
  return {
    base,
    items: [base, ...layers.map((layer) => `${base}-${layer}`)],
  };
});

mkdirSync(outDir, { recursive: true });

let port = 3201;

for (const group of groups) {
  const groupDir = path.join(outDir, group.base);
  mkdirSync(groupDir, { recursive: true });

  for (const compositionId of group.items) {
    const output = path.join(groupDir, `${compositionId}.mp4`);
    console.log(`\nRendering ${compositionId}`);
    console.log(`-> ${output}`);

    const result = spawnSync(
      "npx",
      [
        "remotion",
        "render",
        entry,
        compositionId,
        output,
        `--port=${port++}`,
        "--ipv4",
        "--concurrency=1",
        `--browser-executable=${chrome}`,
      ],
      {
        stdio: "inherit",
        shell: false,
      },
    );

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}

console.log(`\nDone. Rendered files are in ${outDir}`);
