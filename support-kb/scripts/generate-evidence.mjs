import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { reportEvidence } = await server.ssrLoadModule('/src/lib/kb/investigation.ts');
  await mkdir('evidence', { recursive: true });
  await writeFile('evidence/report-causes.json', JSON.stringify(reportEvidence(), null, 2) + '\n');
  console.log('Generated evidence/report-causes.json through Vite-transformed tenant imports');
} finally {
  await server.close();
}
