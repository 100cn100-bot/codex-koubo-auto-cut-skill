# Downstream Remotion

Read this only when the user also wants Remotion packaging.

## Purpose

This skill is upstream.

Its main role is:

- preserve original speaking rhythm
- split scenes well
- prepare bilingual packaging text

If the user also wants Remotion output:

1. Preserve scene order and durations.
2. Preserve Chinese-first hierarchy.
3. Add English as support text, not competing headline text.
4. Respect layout safety and safe bounds.

## Handoff Data

Pass through:

- scene ids
- start and duration
- voiceover
- Chinese display text
- English support text
- visual intent
- keywords

## Constraint

Do not let Remotion component limitations force bad bilingual layout.

If a component becomes too dense in bilingual mode:

- shorten English
- move English to subtitle/caption role
- choose a roomier component

Do not default to deleting meaning unless the user explicitly wants a shorter cut.
