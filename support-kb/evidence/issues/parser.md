# Date parser reads day-first tenant input as month-first (379 reports)

Cause key: `parser`.

## Scope and count

379 unique source reports merged into source-system ticket #4471 in the 2026-10-04 KB export, across 11 tenants; received 2026-04-01 through 2026-10-04. #4471 is the supplied ticket-system identifier, not this repository's GitHub issue number. Export overlaps are deduplicated by report ID, keeping the final row.

## Mechanism and expected behavior

The shared parser reads month first although these tenants write day first. The exported `causeOf` rule assigns day-first tenant app/email reports and booking-v2 form reports here. Expected: preserve the tenant's intended day and month. Observed: month/day reversal in the exported reports and documented parser contract. This is not a claim that a production patch has shipped.

Representative source reports: R-41200 and R-41201 (harbour.dental, app); their bodies describe April/July reversal. R-41201 corrects the direction described by the preceding report; these remain distinct source IDs.

## Caveats and reproducibility

R-41202, R-41209, R-41236, R-41344 and R-41620 are included once in this count by tenant/channel classification. Their bodies contain unresolved one-day, June-only, chronology and cross-timezone symptoms. The classifier does not prove the parser explains every symptom; obtain original inputs, timestamps and timezone reproduction before asserting another counted mechanism. Do not subtract these five or invent a third counted group.

Tenant locale/form, not browser locale or intake guesses, establishes this grouping. The complete export has 427 rows, 412 unique IDs and 15 identical overlaps. This issue plus the separate `hint` issue reconciles to 412, with no shared or unplaced IDs. Intake labels disagree with runtime cause for 38 individual reports.

Evidence: `support-kb/src/lib/kb/causes.ts`, `locales.ts`, tenant JSON, `support-kb/evidence/report-causes.json` and `support-kb/tests/investigation.test.ts`. Run `npm run evidence && npm run build && npm test` from `support-kb/`. The signed explanation is `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`; static desk view is `build/kb/decisions/0002-dedupe-by-cause/index.html`.

Reports continue after July backlog merges; neither consolidation nor silence proves a fix. Findings are bounded to the export, not current live service health.

🤖 **agent do that on behalf of human** 🤖
