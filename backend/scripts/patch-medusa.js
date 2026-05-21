// Patches Medusa services that use model.update({}, ...) which TypeORM >=0.3.12 rejects
// Replaces with createQueryBuilder().update() which doesn't have the empty criteria restriction
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

  // Replace: model.update({}, { is_installed: false })
  // With:    model.createQueryBuilder().update().where('1=1').set({ is_installed: false }).execute()
  const pattern = /model\.update\(\{\}, \{ is_installed: false \}\)/g;
  const replacement = `model.createQueryBuilder().update().where('1=1').set({ is_installed: false }).execute()`;
  
  const matches = content.match(pattern);

  if (matches) {
    content = content.replace(pattern, replacement);
    fs.writeFileSync(filepath, content);
    console.log(`Patched ${file}: ${matches.length} occurrence(s)`);
  } else {
    console.log(`No match in ${file}`);
  }
});
