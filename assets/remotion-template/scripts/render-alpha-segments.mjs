import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const entry = "src/index.ts";
const outDir = "outputs/alpha-segments";
const storyboard = JSON.parse(readFileSync("src/data/storyboard.json", "utf8"));
const fps = storyboard.canvas.fps;

const layerName = (layer) => `${layer.charAt(0).toUpperCase()}${layer.slice(1)}`;
const compositionBase = (video) => video.compositionId ?? video.id
  .split("_")
  .filter(Boolean)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join("");

const transparentLayers = new Set([
  "titles",
  "cards",
  "documents",
  "kpis"
]);

mkdirSync(outDir, { recursive: true });

let port = 3401;
let count = 0;

for (const video of storyboard.videos) {
  const base = compositionBase(video);
  const videoDir = path.join(outDir, base);
  mkdirSync(videoDir, { recursive: true });

  for (const scene of video.scenes) {
    const layers = [
      ...new Set(
        scene.overlays
          .map((overlay) => overlay.layer)
          .filter((layer) => transparentLayers.has(layer)),
      ),
    ];

    const startFrame = Math.round(scene.start * fps);
    const endFrame = Math.max(startFrame, Math.round((scene.start + scene.duration) * fps) - 1);
    const sceneLabel = `${scene.id}_${String(Math.round(scene.start)).padStart(3, "0")}s-${String(Math.round(scene.start + scene.duration)).padStart(3, "0")}s`;

    for (const layer of layers) {
      const compositionId = `${base}-${layerName(layer)}`;
      const output = path.join(videoDir, `${sceneLabel}_${layerName(layer)}.mov`);

      console.log(`\nRendering ${compositionId} scene ${scene.id}`);
      console.log(`Frames ${startFrame}-${endFrame}`);
      console.log(`-> ${output}`);

      const result = spawnSync(
        "npx",
        [
          "remotion",
          "render",
          entry,
          compositionId,
          output,
          `--frames=${startFrame}-${endFrame}`,
          "--codec=prores",
          "--prores-profile=4444",
          "--pixel-format=yuva444p10le",
          "--image-format=png",
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

      count++;
    }
  }
}

console.log(`\nDone. Rendered ${count} transparent segment files in ${outDir}`);
