// Direct DB setup — adapts to current migration state
const { Pool } = require('pg')
const scrypt = require('scrypt-kdf')

async function setup() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    const hash = await scrypt.kdf('admin123', { logN: 1, r: 1, p: 1 })

    // Helper: check if column exists
    async function colExists(table, column) {
      const r = await pool.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND column_name = $2`,
        [table, column]
      )
      return r.rows.length > 0
    }

    // 1. Region
    let r = await pool.query('SELECT COUNT(*) FROM region')
    if (parseInt(r.rows[0].count) === 0) {
      await pool.query(`INSERT INTO region (id, name, currency_code, tax_rate, created_at, updated_at) VALUES ('reg_default', 'Worldwide', 'usd', 0, NOW(), NOW())`)
      await pool.query(`UPDATE country SET region_id = 'reg_default' WHERE iso_2 = 'us'`)
      console.log('✓ Region')
    }

    // 2. Admin
    let u = await pool.query("SELECT id FROM \"user\" WHERE email = 'admin@hermes.store'")
    if (u.rows.length === 0) {
      await pool.query(`INSERT INTO "user" (id, email, password_hash, first_name, last_name, created_at, updated_at) VALUES ('usr_admin', 'admin@hermes.store', $1, 'Admin', 'User', NOW(), NOW())`, [hash.toString('base64')])
      console.log('✓ Admin: admin@hermes.store / admin123')
    }

    // 3. Shipping profile
    let sp = await pool.query("SELECT id FROM shipping_profile WHERE type = 'default' LIMIT 1")
    if (sp.rows.length === 0) {
      await pool.query(`INSERT INTO shipping_profile (id, name, type, created_at, updated_at) VALUES ('sp_default', 'Default Shipping Profile', 'default', NOW(), NOW())`)
      sp = { rows: [{ id: 'sp_default' }] }
    }
    const profileId = sp.rows[0].id
    const hasProfileCol = await colExists('product', 'profile_id')
    const hasVariantCol = await colExists('money_amount', 'variant_id')

    // 4. Products
    const products = [
      { id: 'prod_tee', title: 'Hermes Logo Tee', desc: 'Premium cotton t-shirt', variants: [{ id: 'var_tee_s', title: 'S', price: 2900 }, { id: 'var_tee_m', title: 'M', price: 2900 }, { id: 'var_tee_l', title: 'L', price: 2900 }] },
      { id: 'prod_hoodie', title: 'Hermes Hoodie', desc: 'Cozy fleece hoodie', variants: [{ id: 'var_hoodie_m', title: 'M', price: 5900 }, { id: 'var_hoodie_l', title: 'L', price: 5900 }] },
      { id: 'prod_cap', title: 'Hermes Cap', desc: 'Classic snapback', variants: [{ id: 'var_cap', title: 'One Size', price: 2400 }] },
      { id: 'prod_tote', title: 'Hermes Tote Bag', desc: 'Canvas tote bag', variants: [{ id: 'var_tote', title: 'One Size', price: 1900 }] },
    ]

    // Delete incomplete products from previous failed runs
    await pool.query("DELETE FROM money_amount WHERE id LIKE 'ma_%'")
    await pool.query("DELETE FROM product_variant WHERE id LIKE 'var_%'")
    await pool.query("DELETE FROM product_shipping_profile WHERE product_id LIKE 'prod_%'")
    await pool.query("DELETE FROM product WHERE id LIKE 'prod_%'")

    for (const item of products) {
      // Insert product
      const baseCols = 'id, title, description, is_giftcard, created_at, updated_at'
      const baseVals = '$1, $2, $3, false, NOW(), NOW()'
      const baseParams = [item.id, item.title, item.desc]

      if (hasProfileCol) {
        await pool.query(`INSERT INTO product (${baseCols}, profile_id) VALUES (${baseVals}, $4)`, [...baseParams, profileId])
      } else {
        await pool.query(`INSERT INTO product (${baseCols}) VALUES (${baseVals})`, baseParams)
        try { await pool.query(`INSERT INTO product_shipping_profile (profile_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, [profileId, item.id]) } catch(e) {}
      }

      // Set status to published if the column exists
      const hasStatusCol = await colExists('product', 'status')
      if (hasStatusCol) {
        await pool.query(`UPDATE product SET status = 'published' WHERE id = $1`, [item.id])
      }

      for (const v of item.variants) {
        await pool.query(`INSERT INTO product_variant (id, product_id, title, inventory_quantity, allow_backorder, manage_inventory, created_at, updated_at) VALUES ($1, $2, $3, 100, false, true, NOW(), NOW())`, [v.id, item.id, v.title])
        if (hasVariantCol) {
          await pool.query(`INSERT INTO money_amount (id, currency_code, amount, variant_id, created_at, updated_at) VALUES ($1, 'usd', $2, $3, NOW(), NOW())`, [`ma_${v.id}`, v.price, v.id])
        } else {
          await pool.query(`INSERT INTO money_amount (id, currency_code, amount, created_at, updated_at) VALUES ($1, 'usd', $2, NOW(), NOW())`, [`ma_${v.id}`, v.price])
        }
      }
      console.log(`✓ ${item.title}`)
    }

    console.log(`✓ ${products.length} products`)
    console.log('Setup complete')
  } catch (err) {
    console.error('Setup error:', err.message)
    throw err
  } finally {
    await pool.end()
  }
}

setup().catch(() => process.exit(1))
