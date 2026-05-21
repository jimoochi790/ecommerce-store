// Patches ALL Medusa services that use .update({}, { is_installed: false })
// which TypeORM >=0.3.12 rejects due to empty criteria
const fs = require('fs');
const path = require('path');

const services = [
  'payment-provider.js',
  'notification.js', 
  'fulfillment-provider.js',
  'tax-provider.js',
];
const base = 'node_modules/@medusajs/medusa/dist/services';

services.forEach((file) => {
  const filepath = path.join(base, file);
  if (!fs.existsSync(filepath)) {
    console.log(`Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filepath, 'utf8');

  // Match any variable.update({}, { is_installed: false })
  // e.g., model.update({}, ...) or fulfillmentProviderRepo.update({}, ...)
  const pattern = /(\w+)\.update\(\{\}, \{ is_installed: false \}\)/g;
  
  let count = 0;
  content = content.replace(pattern, (match, varName) => {
    count++;
    return `${varName}.createQueryBuilder().update().where('1=1').set({ is_installed: false }).execute()`;
  });

  if (count > 0) {
    fs.writeFileSync(filepath, content);
    console.log(`Patched ${file}: ${count} occurrence(s)`);
  } else {
    console.log(`No match in ${file}`);
  }
});
