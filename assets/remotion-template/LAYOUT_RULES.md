# Layout Rules

This project uses strict scene-level overlay rules to avoid component overlap.

## Default Rule

Each scene should default to one primary visual overlay.

Primary overlays include:

- `final_verdict`
- `glass_concept_card`
- `before_after_compare`
- `document_overlay`
- `data_metric_card`
- `platform_icon_compare`
- `logic_flow_loop`
- `metric_flow_compare`
- `concept_agenda_list`
- `funnel_select`
- `chat_bubble`
- `price_kpi`
- `progress_compare`
- `risk_warning`
- `calendar_output`
- `slider_gauge`
- `percent_donut_stat`

## Allowed Exceptions

- `chapter_number` may coexist with:
  - `final_verdict`
  - `glass_concept_card`
- `risk_warning` may coexist with `funnel_select` only when both overlays use explicit `placement`
- `price_kpi` may coexist with `chat_bubble` only when both overlays use explicit `placement`

## What To Avoid

- Do not combine two large fixed-position components in one scene without explicit `placement`.
- Do not mix one left-heavy KPI component with one left-heavy card component.
- Do not stack warning, metric, and selection visuals together in the same shot.

## Validation

Run:

```bash
npm run validate:layout
```

If the validation fails, either simplify the scene or add explicit `placement` so the components occupy different regions.
