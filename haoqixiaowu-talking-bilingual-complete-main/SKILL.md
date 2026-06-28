---
name: haoqixiaowu-talking-bilingual
description: Split a spoken-video script or 口播稿 into storyboard scenes that preserve the original speaking rhythm and generate bilingual Chinese-English packaging that English-speaking audiences can also understand. Use when the user wants longform rhythm-preserving scene splitting, bilingual subtitles or packaging text, Chinese-led layouts with English support text, American audience readability, numbers mapped into visual data modules, company names mapped to icons, and complex concepts expanded into explanation scenes before Remotion or other video packaging.
---

# Haoqixiaowu Talking Bilingual

This skill is for turning raw spoken-video scripts into storyboard scenes while preserving the original speaking rhythm and producing bilingual packaging that works for both Chinese-speaking and English-speaking audiences.

## Use This Skill When

- the user provides a raw talking script
- the storyboard should stay close to the original script pacing
- the packaging should be bilingual
- the Chinese layout should remain primary
- English-speaking viewers should still understand the message clearly
- the user wants a longform talking-head storyboard before downstream packaging

## Core Principle

Preserve the speaker's original progression first.

Then add bilingual packaging in a way that improves comprehension without breaking the visual hierarchy.

Chinese remains the primary display language unless the user explicitly asks for equal-weight bilingual layout.

## Workflow

1. Read the raw script as performance rhythm.
2. Split it into semantic beats in original order.
3. Group only tightly related beats into scenes.
4. Preserve the original argumentative flow, objections, analogies, examples, workflow moments, and CTA.
5. For each scene, define one main visual intent and optional support visual.
6. Write Chinese packaging text first.
7. Add English support text that helps international viewers understand the scene.
8. Check that bilingual text does not damage layout clarity.
9. Output a longform rhythm-preserving storyboard first.
10. Only produce shorter cuts if the user asks.

## Rhythm Rules

- Do not aggressively compress the script by default.
- Preserve repeated questions or repeated claims when they carry speaking rhythm.
- Keep “但是”, “你有没有想过”, “比如说”, “那当然”, and similar pivots when they shape scene progression.
- Prefer one scene per sentence group.
- Use `longform-preserve` as default mode.

Read [references/scene-rhythm.md](references/scene-rhythm.md) before splitting a raw script.

## Bilingual Packaging Rules

The goal is not literal translation. The goal is bilingual understanding.

- Chinese is the main headline language.
- English is the support layer.
- English should help an American viewer quickly understand what the Chinese card is saying.
- Use concise English meaning, not word-for-word translation.
- Preserve emotional emphasis and argumentative intent, not only lexical meaning.

Default layout pattern:

- Chinese headline or primary label
- English subtitle, support line, or caption
- Chinese keeps larger font size and stronger visual weight
- English uses smaller type and secondary emphasis

Do not create equal-size bilingual headline blocks unless the user explicitly asks.

Read [references/bilingual-packaging.md](references/bilingual-packaging.md) before writing bilingual text.

## Visual Mapping

Map meaning before selecting packaging modules.

- Numeric claims:
  Use KPI, compare, percentage, table, or metric flow visuals.
- Company, platform, and product names:
  Turn them into icon-based relationship scenes.
- Complex concepts:
  Expand them into explanatory scenes instead of leaving them only in subtitles.
- Workflow descriptions:
  Turn them into step-by-step process scenes.
- Risks or boundaries:
  Turn them into threshold or warning scenes.

Read [references/visual-mapping.md](references/visual-mapping.md) when choosing visual modules.

## Output Modes

- `longform-preserve`:
  Default. Closely follows the original speaking rhythm.
- `midform-tighten`:
  Keeps the original order with some light reduction.
- `shortform-compress`:
  Use only when the user explicitly wants a short promotional cut.

## Required Output Shape

For each scene, include:

- `id`
- `start`
- `duration`
- `voiceover`
- Chinese subtitle or packaging line
- English subtitle or support line
- scene keywords
- one main visual choice
- optional support visual only if layout can safely hold both

If the downstream target is Remotion, also generate Remotion-friendly overlay mappings.

## Layout Discipline

Do not sacrifice readability for bilingual completeness.

- Keep one primary component per scene by default.
- If two components coexist, they must occupy different regions.
- Respect safe bounds for large components.
- Keep English shorter than Chinese in most scenes.
- If bilingual text becomes too long, simplify English first before shrinking everything.

## Bundled Template

This skill ships with a bundled bilingual Remotion template in:

- `assets/remotion-template/`

Use the scaffold helper to create a runnable project:

```bash
python scripts/scaffold_project.py --out <target-dir>
```

The bundled template already includes:

- bilingual-safe layout behavior
- safe bounds support
- adaptive card sizing for longer text
- emphasis components such as large banners, speech-bubble cards, and focus-list stacks

## When To Read References

- Read [references/scene-rhythm.md](references/scene-rhythm.md) before splitting raw scripts.
- Read [references/bilingual-packaging.md](references/bilingual-packaging.md) before writing bilingual scene text.
- Read [references/visual-mapping.md](references/visual-mapping.md) when converting semantics to visuals.
- Read [references/downstream-remotion.md](references/downstream-remotion.md) only when the user also wants Remotion packaging.
