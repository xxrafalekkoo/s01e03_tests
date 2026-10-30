import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { anomalous, groups, mergedOnJuly2, mismatches, receivedDays, reports, reportEvidence, rows } from '../src/lib/kb/investigation';
import { causeOf, dayFirst, readAs, sameCause, uniqueById } from '../src/lib/kb/causes';
import { tenantHandles, tenantOf } from '../src/lib/kb/locales';
import { DEDUPE_CASES } from '../src/lib/kb/dedupe-cases';
import { deskRef } from '../src/lib/kb/desk-ref';

describe('export reconciliation through actual Vite glob imports', () => {
  it('counts unique reports, not overlapping export rows', () => {
    expect(rows).toHaveLength(427);
    expect(reports).toHaveLength(412);
    expect(rows.length - uniqueById(rows).length).toBe(15);
    for (const r of rows) expect(r).toEqual(reports.find((u) => u.id === r.id));
    expect(reports.every((r) => r.mergedInto === 4471)).toBe(true);
    expect(uniqueById([rows[0], { ...rows[0], body: 'final' }])[0].body).toBe('final');
  });
  it('places every ID once and reconciles tenant rules with an independent JSON calculation', () => {
    expect(groups.map((g) => [g.cause, g.reports.length])).toEqual([['parser', 379], ['hint', 33]]);
    expect(new Set(groups.flatMap((g) => g.reports.map((r) => r.id))).size).toBe(412);
    expect(tenantHandles()).toHaveLength(11);
    expect(tenantHandles().every((tenant) => dayFirst(tenantOf({ tenant })!.locale))).toBe(true);
    const tenants = readdirSync('src/lib/data/tenants').map((file) => JSON.parse(readFileSync(`src/lib/data/tenants/${file}`, 'utf8')));
    const independent = { parser: 0, hint: 0 };
    for (const r of reports) {
      const t = tenants.find((t) => t.handle === r.tenant);
      const order = new Intl.DateTimeFormat(t.locale).formatToParts(new Date('2026-01-02T12:00:00Z')).map((p) => p.type);
      expect(order.indexOf('day')).toBeLessThan(order.indexOf('month'));
      independent[r.channel === 'form' && t.form === 'booking-v3' ? 'hint' : 'parser']++;
    }
    expect(independent).toEqual({ parser: 379, hint: 33 });
    expect(mismatches).toHaveLength(38);
    expect(reports.filter((r) => r.meta.intakeTag === 'hint')).toHaveLength(41);
    expect(reports.filter((r) => r.meta.intakeTag === 'parser')).toHaveLength(371);
  });
  it('keeps all desk anomalies once without inventing a mechanism', () => {
    expect(anomalous).toHaveLength(5);
    expect(anomalous.every((r) => causeOf(r, tenantOf(r)) === 'parser')).toBe(true);
    expect(readAs(groups[0], anomalous.map((r) => r.id))).toBe(5);
    expect(readAs(groups[1], anomalous.map((r) => r.id))).toBe(0);
  });
  it('separates arrival dates from merge activity', () => {
    expect([receivedDays[0], receivedDays.at(-1)]).toEqual(['2026-04-01', '2026-10-04']);
    expect(mergedOnJuly2).toHaveLength(184);
    expect(groups.map((g) => [g.tenants, g.firstSeen, g.lastSeen])).toEqual([
      [11, '2026-04-01', '2026-10-04'], [3, '2026-04-17', '2026-09-22']
    ]);
  });
  it.each(DEDUPE_CASES.map((c, i) => ({ ...c, expected: [true, false, false, true, false][i] })))('$why', ({ a, b, expected }) => {
    expect(sameCause(a, tenantOf(a), b, tenantOf(b))).toBe(expected);
  });
  it('commits evidence generated from exactly the current runtime', () => {
    expect(JSON.parse(readFileSync('evidence/report-causes.json', 'utf8'))).toEqual(reportEvidence());
  });
});

describe('real static desk artifact', () => {
  it('contains rendered counts, layout metadata, signature reference, and all timeline bars', () => {
    const source = readFileSync('src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx', 'utf8');
    const signature = source.match(/^signature: '([^']+)'$/m)?.[1];
    // Read the one public signature input, never duplicate the course ticket in fixtures or failure output.
    expect(Boolean(signature?.match(/^v1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/))).toBe(true);
    expect(source.trimEnd().endsWith('<RenderStamp {signature} />')).toBe(true);
    const html = readFileSync('build/kb/decisions/0002-dedupe-by-cause/index.html', 'utf8');
    expect(html).toContain('0002 · Group reports by cause, not subject');
    expect(html).toContain('mega-dev-agent');
    expect(html).toContain('proposed');
    expect(html).toContain('379');
    expect(html).toContain('33');
    expect(html).toContain('412');
    expect(html.includes(deskRef(signature!))).toBe(true);
    expect(html).not.toContain('no desk ref:');
    expect(html).toContain('https://github.com/xxrafalekkoo/s01e03_tests/issues/1');
    expect(html).toContain('https://github.com/xxrafalekkoo/s01e03_tests/issues/2');
    expect(html).not.toContain('Ticket publication is pending approval');
    expect((html.match(/<rect /g) ?? []).length).toBe(54);
    expect(readFileSync('build/kb/index.html', 'utf8')).toContain('/kb/decisions/0002-dedupe-by-cause');
  });
});
