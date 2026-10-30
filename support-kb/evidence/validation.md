# Local validation — 2026-10-30

This is a local-preparation checkpoint, not a publication receipt or course acceptance.

## Repeatable commands

From `support-kb/`: `npm run evidence && npm run build && npm test`.
Result: production adapter-static build succeeded; 11 Vitest tests passed (one test file).
SvelteKit emits an informational test-run notice that it overrides Vite `base`; no build/runtime error occurred.

- Actual Vite-transformed `locales.ts` directory imports classify 379 parser + 33 hint = 412 unique reports.
- 427 source rows, 15 identical overlaps, final-row dedupe semantics, no conflicting rows, no missing/unplaced/shared IDs.
- Independent tenant-JSON/Intl calculation agrees with runtime counts; all 11 configured locales day-first.
- Intake tags: 371 parser / 41 hint; 38 per-ID disagreements with runtime cause.
- All five exported dedupe cases pass: merge / keep apart / keep apart / merge / do not merge.
- All five desk-note IDs remain once under parser; zero under hint.
- Arrivals: 2026-04-01 through 2026-10-04; 184 merges on 2026-07-02.
- Current generated report mapping equals the runtime output exactly.
- Static HTML contains actual title, owner/status, count output, derived signature stamp, 54 timeline bars and index discovery.

## Browser checks against the saved build

Served `build/` using Python's static server, bound to `127.0.0.1:4173`, not public interfaces.
Chrome snapshots inspected KB index, incident #4471, triage and new decision; all five routes including
accepted decision 0001 returned HTTP 200. The new decision appears in `KbIndex` with `proposed` metadata.

The new page shows 412 reports, 379/33 split, tenant scopes, five anomaly IDs, timeline and caveats.
Layout metadata: owner `mega-dev-agent`, proposed, reviewed 2026-10-30. Frontmatter signature reaches
`RenderStamp` and produces `DR-5GKQ-6G0W` through `deskRef`; “no desk ref” is absent.
The old triage page visibly warns that its 2024 review is stale (871 days at validation).
All five dedupe case results appear in the rendered table; controls and chart are present after hydration.
Changing report B to alder.physio while keeping a different subject changes the live verdict to
“same cause — merge”, with hint/hint displayed: client-side behavior, not merely server-rendered controls.
No console errors/warnings across inspected pages; 32 locally referenced stylesheet/script/module assets returned 200,
with no failed checked assets. No horizontal overflow in the inspected desktop viewport.
Navigation links resolve to the intended local routes. After approved issue creation, source and rendered HTML
link actual returned URLs for parser issue #1 and hint issue #2. Tests assert both URLs and absence of pending
publication prose. Public issue bodies have not been independently re-read; that requires an announced GitHub read.

## Provenance and boundaries

All 30 extracted original files compared byte-for-byte equal to the original ZIP after implementation.
Accepted decision 0001 SHA256: `41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9`.
No original source/data file was altered; only renderer, analysis/tests, drafts and new decision were added.

Two explicitly approved issue creations succeeded: parser https://github.com/xxrafalekkoo/s01e03_tests/issues/1
and hint https://github.com/xxrafalekkoo/s01e03_tests/issues/2. Approved body files were re-read before execution
and not altered afterwards. Evidence generation, production build and all 11 tests passed again after URL updates.
No Git commit, push, hosting change or course/MCP submission occurred. Coordinator accepted committed static
HTML/assets plus `.svx` as bounded delivery on available course evidence; no public hosting required.
The missing course submission action/schema still blocks submission; no Challenge acceptance is claimed.
