// Direct DB setup with correct Medusa v1 table schema
const { Pool } = require('pg')
const scrypt = require('scrypt-kdf')

async function setup() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  try {
    // Generate password hash
    const hash = await scrypt.kdf('admin123', { logN: 1, r: 1, p: 1 })

    // 1. Create region (country links via country.region_id)
    const regions = await pool.query('SELECT COUNT(*) FROM region')
    if (parseInt(regions.rows[0].count) === 0) {
      await pool.query(
        `INSERT INTO region (id, name, currency_code, tax_rate, created_at, updated_at)
         VALUES ('reg_default', 'Worldwide', 'usd', 0, NOW(), NOW())`
      )
      // Link US to region
      await pool.query(
        `UPDATE country SET region_id = 'reg_default' WHERE iso_2 = 'us'`
      )
      console.log('✓ Region created')
    }

    // 2. Create admin user (no "role" column in this schema)
    const users = await pool.query("SELECT id FROM \"user\" WHERE email = 'admin@hermes.store'")
    if (users.rows.length === 0) {
      await pool.query(
        `INSERT INTO "user" (id, email, password_hash, first_name, last_name, created_at, updated_at)
         VALUES ('usr_admin', 'admin@hermes.store', $1, 'Admin', 'User', NOW(), NOW())`,
        [hash.toString('base64')]
      )
      console.log('✓ Admin: admin@hermes.store / admin123')
    }

    // 3. Get default shipping profile
    let profile = await pool.query("SELECT id FROM shipping_profile WHERE type = 'default' LIMIT 1")
    if (profile.rows.length === 0) {
      await pool.query(
        `INSERT INTO shipping_profile (id, name, type, created_at, updated_at)
         VALUES ('sp_default', 'Default Shipping Profile', 'default', NOW(), NOW())`
      )
      profile = { rows: [{ id: 'sp_default' }] }
    }
    const profileId = profile.rows[0].id

    // 4. Create products
    const prods = await pool.query('SELECT COUNT(*) FROM product')
    if (parseInt(prods.rows[0].count) === 0) {
      const items = [
        { id: 'prod_tee', title: 'Hermes Logo Tee', desc: 'Premium cotton t-shirt', variants: [
          { id: 'var_tee_s', title: 'S', price: 2900 },
          { id: 'var_tee_m', title: 'M', price: 2900 },
          { id: 'var_tee_l', title: 'L', price: 2900 },
        ]},
        { id: 'prod_hoodie', title: 'Hermes Hoodie', desc: 'Cozy fleece hoodie', variants: [
          { id: 'var_hoodie_m', title: 'M', price: 5900 },
          { id: 'var_hoodie_l', title: 'L', price: 5900 },
        ]},
        { id: 'prod_cap', title: 'Hermes Cap', desc: 'Classic snapback', variants: [
          { id: 'var_cap', title: 'One Size', price: 2400 },
        ]},
        { id: 'prod_tote', title: 'Hermes Tote Bag', desc: 'Canvas tote bag', variants: [
          { id: 'var_tote', title: 'One Size', price: 1900 },
        ]},
      ]

      for (const item of items) {
        await pool.query(
          `INSERT INTO product (id, title, description, profile_id, is_giftcard, created_at, updated_at)
           VALUES ($1, $2, $3, $4, false, NOW(), NOW())`,
          [item.id, item.title, item.desc, profileId]
        )
        for (const v of item.variants) {
          await pool.query(
            `INSERT INTO product_variant (id, product_id, title, inventory_quantity, allow_backorder, manage_inventory, created_at, updated_at)
             VALUES ($1, $2, $3, 100, false, true, NOW(), NOW())`,
            [v.id, item.id, v.title]
          )
          await pool.query(
            `INSERT INTO money_amount (id, currency_code, amount, variant_id, created_at, updated_at)
             VALUES ($1, 'usd', $2, $3, NOW(), NOW())`,
            [`ma_${v.id}`, v.price, v.id]
          )
        }
        console.log(`✓ ${item.title}`)
      }
      console.log(`✓ Seeded ${items.length} products`)
    }

    console.log('Setup complete')
  } catch (err) {
    console.error('Setup error:', err.message)
    throw err
  } finally {
    await pool.end()
  }
}

setup().catch(() => process.exit(1))
