import raw from '#lib/data/reports-4471.json';
import notes from '#lib/data/desk-notes.json';
import { causeOf, groupByCause, uniqueById, type Report } from '#lib/kb/causes';
import { tenantOf } from '#lib/kb/locales';

export const rows = raw as Report[];
export const reports = uniqueById(rows).filter((r) => r.mergedInto === 4471);
export const groups = groupByCause(reports, tenantOf);
export const mismatches = reports.filter((r) => causeOf(r, tenantOf(r)) !== r.meta.intakeTag);
export const anomalous = reports.filter((r) => notes.oneDayMove.includes(r.id));
export const mergedOnJuly2 = reports.filter((r) => r.mergedAt?.slice(0, 10) === '2026-07-02');
export const receivedDays = reports.map((r) => r.receivedAt.slice(0, 10)).sort();

export function reportEvidence() {
  return {
    source: 'src/lib/data/reports-4471.json',
    rule: 'src/lib/kb/causes.ts + tenant directory; uniqueById keeps final row',
    inputRows: rows.length,
    uniqueReports: reports.length,
    repeats: rows.length - uniqueById(rows).length,
    intakeMismatches: mismatches.length,
    groups: groups.map((g) => ({ cause: g.cause, count: g.reports.length, tenants: g.tenants,
      firstSeen: g.firstSeen, lastSeen: g.lastSeen })),
    anomalousIds: anomalous.map((r) => r.id).sort(),
    reports: reports.map((r) => ({ id: r.id, cause: causeOf(r, tenantOf(r)),
      tenant: r.tenant, channel: r.channel, intakeTag: r.meta.intakeTag,
      receivedAt: r.receivedAt, mergedAt: r.mergedAt })).sort((a, b) => a.id.localeCompare(b.id))
  };
}
