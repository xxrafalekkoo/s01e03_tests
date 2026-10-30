# S01E03 — what the support KB shows

Investigation of the supplied 2026-10-04 support export. **Not yet accepted by the course.**

## Deliverables

- [Signed decision source](support-kb/src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx)
- [Rendered desk page](support-kb/build/kb/decisions/0002-dedupe-by-cause/index.html)
- [Rendered KB index](support-kb/build/kb/index.html)
- [Parser issue #1 — 379 reports](https://github.com/xxrafalekkoo/s01e03_tests/issues/1) ([body](support-kb/evidence/issues/parser.md))
- [Hint issue #2 — 33 reports](https://github.com/xxrafalekkoo/s01e03_tests/issues/2) ([body](support-kb/evidence/issues/hint.md))
- [Per-report runtime evidence](support-kb/evidence/report-causes.json)
- [Validation record](support-kb/evidence/validation.md)

The `.html` is actual prerendered Svelte/mdsvex content, not a screenshot or empty client shell.
Serve the **whole** `support-kb/build/` directory so local assets and root-relative navigation work;
GitHub's file viewer does not host HTML as a website. Public hosting has not been enabled.

## Reproduce

Use Node >=24 (validated with Node 26.12.1 and npm 11.20.0). From `support-kb/`:

```sh
npm ci --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org
npm run evidence
npm run build
npm test
python3 -m http.server 4173 --bind 127.0.0.1 --directory build
```

Dependency installation requires the operator's approval. `--ignore-scripts` disables package lifecycle scripts;
the explicit build command performs the reviewed application build. Tests include checks of the static artifact,
so build before testing. Evidence is generated through Vite's real `import.meta.glob` transform.

Open:

- http://127.0.0.1:4173/kb/
- http://127.0.0.1:4173/kb/incidents/4471/
- http://127.0.0.1:4173/kb/triage/dedupe/
- http://127.0.0.1:4173/kb/decisions/0002-dedupe-by-cause/

## Findings and publication gate

427 export rows reconcile to 412 unique report IDs: 379 parser and 33 hint, disjointly.
Five desk-noted anomalous bodies remain under parser by the supplied classification rule; that does not prove
the parser explains every symptom. Do not invent a separately counted timezone issue from those bodies.
Intake guesses misclassify 38 IDs. July mass merges are not incident onset or proof of recovery.

All original export files are preserved byte-for-byte, including accepted decision 0001. The new record is
truthfully `proposed`, signed by the harness, not approved on behalf of the support desk.

Two GitHub issues were created with explicit approval; the new page links their actual returned URLs.
Source and static output are prepared for separately approved commit/push. No public hosting is required
on available course evidence. Scan the publication set again before publishing a revised build.
`.idea/`, dependencies and intermediate caches are excluded; `support-kb/build/` is intentionally deliverable.

The course's authoritative submission action/field schema has not been supplied. No guessed payload has been sent.
Publication and local validation do not establish Challenge completion: explicit course acceptance is still required.
