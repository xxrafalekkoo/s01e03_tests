# booking-v3 date hint conflicts with tenant date interpretation (33 reports)

Cause key: `hint`.

## Scope and count

33 unique source reports merged into source-system ticket #4471 in the 2026-10-04 KB export, across alder.physio, copper.studio and pale.harbour; received 2026-04-17 through 2026-09-22. #4471 is the supplied ticket-system identifier, not this repository's GitHub issue number. Export overlaps are deduplicated by report ID, keeping the final row.

## Mechanism and expected behavior

These day-first tenants run booking-v3. Its form prints `MM/DD/YYYY`, prompting month-first input, but interprets it in the tenant's day-first order. This differs from the shared parser's month-first interpretation. Expected: printed hint and input interpretation agree, so the intended booking date is preserved. No production fix is claimed.

Representative source reports: R-41230 (copper.studio, form: June/January reversal), R-41241 (alder.physio, form: June/August reversal), R-41251 (pale.harbour, form: January/July reversal). Tenant form version plus `channel === 'form'` is decisive; the same tenant's app report can belong to parser instead.

## Reproducibility and boundaries

Evidence: `support-kb/src/lib/kb/causes.ts` (`DATE_HINT` and `causeOf`), `locales.ts`, tenant JSON, `support-kb/evidence/report-causes.json` and `support-kb/tests/investigation.test.ts`. Run `npm run evidence && npm run build && npm test` from `support-kb/`. The signed explanation is `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`; static desk view is `build/kb/decisions/0002-dedupe-by-cause/index.html`.

This issue's 33 plus parser's 379 equals all 412 unique source IDs, disjointly. Raw intake labels would instead suggest 41 hint and 371 parser and misclassify 38 IDs; browser locale is not tenant context. The five desk-noted anomalous IDs remain under parser and are not moved here. Identical subjects do not establish a duplicate; unknown tenant context does not justify merging.

The snapshot cannot prove live service health or fix delivery. Arrival time and merge time are distinct; a July consolidation spike does not establish incident onset or resolution.

🤖 **agent do that on behalf of human** 🤖
