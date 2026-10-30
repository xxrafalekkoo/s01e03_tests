<script lang="ts">
  import { rows, reports, mismatches, anomalous, mergedOnJuly2, receivedDays } from '#lib/kb/investigation';
</script>

<p>{rows.length} exported rows represent {reports.length} unique reports; {rows.length - reports.length} overlapping rows count only once.
  Intake labels disagree with tenant-based classification for {mismatches.length} reports.</p>
<p>Reports arrived from {receivedDays[0]} through {receivedDays.at(-1)}.
  {mergedOnJuly2.length} reports were merged on 2026-07-02: that is queue activity, not the start of the failure or proof of a fix.</p>
<p>{anomalous.length} desk-noted reports remain included once under parser. Their IDs are
  {#each anomalous as r, i}<code>{r.id}</code>{i < anomalous.length - 1 ? ', ' : '.'}{/each}</p>
