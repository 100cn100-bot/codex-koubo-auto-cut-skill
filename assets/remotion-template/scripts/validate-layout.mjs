import fs from "node:fs";
import path from "node:path";

const storyboardPath = path.resolve("src/data/storyboard.json");
const storyboard = JSON.parse(fs.readFileSync(storyboardPath, "utf8"));

const primaryTypes = new Set([
  "final_verdict",
  "glass_concept_card",
  "before_after_compare",
  "document_overlay",
  "data_metric_card",
  "platform_icon_compare",
  "logic_flow_loop",
  "metric_flow_compare",
  "concept_agenda_list",
  "funnel_select",
  "chat_bubble",
  "price_kpi",
  "progress_compare",
  "risk_warning",
  "calendar_output",
  "slider_gauge",
  "percent_donut_stat",
]);

const lightweightTypes = new Set([
  "chapter_number",
]);

const allowedPairs = new Set([
  "chapter_number|final_verdict",
  "chapter_number|glass_concept_card",
  "funnel_select|risk_warning",
  "chat_bubble|price_kpi",
  "risk_warning|slider_gauge",
]);

const normalizePair = (a, b) => [a, b].sort().join("|");

const violations = [];

for (const video of storyboard.videos ?? []) {
  for (const scene of video.scenes ?? []) {
    const types = (scene.overlays ?? []).map((overlay) => overlay.type);
    const primary = types.filter((type) => primaryTypes.has(type));
    const nonLightweight = types.filter((type) => !lightweightTypes.has(type));

    if (primary.length > 1) {
      const missingPlacement = (scene.overlays ?? [])
        .filter((overlay) => primaryTypes.has(overlay.type))
        .some((overlay) => !overlay.placement);

      if (missingPlacement) {
        violations.push(
          `${scene.id}: multiple primary overlays require placement -> ${primary.join(", ")}`
        );
      }
    }

    for (let i = 0; i < nonLightweight.length; i += 1) {
      for (let j = i + 1; j < nonLightweight.length; j += 1) {
        const pair = normalizePair(nonLightweight[i], nonLightweight[j]);
        if (!allowedPairs.has(pair)) {
          violations.push(
            `${scene.id}: disallowed overlay pair -> ${nonLightweight[i]} + ${nonLightweight[j]}`
          );
        }
      }
    }
  }
}

if (violations.length) {
  console.error("Layout validation failed:\n");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Layout validation passed.");
