// Patches Medusa services that use model.update({}, ...) which TypeORM >=0.3.12 rejects
const fs = require('fs');
const path = require('path');

const services = ['payment-provider.js', 'notification.js', 'tax-provider.js'];
const base = 'node_modules/@medusajs/medusa/dist/services';

services.forEach((file) => {
  const filepath = path.join(base, file);
  if (!fs.existsSync(filepath)) {
    console.log(`Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');

  // Replace model.update({}, { is_installed: false })
  // with raw SQL query that TypeORM won't reject
  const tableName = file.replace('.js', '').replace(/-/g, '_');
  const sql = `model.query(\`UPDATE ${tableName} SET is_installed = false\`).catch(() => {})`;

  const pattern = /model\.update\(\{\}, \{ is_installed: false \}\)/g;
  const matches = content.match(pattern);

  if (matches) {
    content = content.replace(pattern, sql);
    fs.writeFileSync(filepath, content);
    console.log(`Patched ${file}: ${matches.length} occurrence(s)`);
  } else {
    console.log(`No match in ${file}`);
  }
});
