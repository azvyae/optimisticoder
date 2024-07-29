import { execSync } from 'child_process';

console.info('Merging test files');
if (process.platform !== 'win32') {
  execSync('cat tests/e2e/**/*.cy.ts > tests/e2e/merged.cy.ts').toString(
    'utf-8',
  );
} else {
  execSync('type tests/e2e/**/*.cy.ts > tests/e2e/merged.cy.ts', {
    shell: 'powershell',
  }).toString('utf-8');
}
console.info('Test fiels merged');
