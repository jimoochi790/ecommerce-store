// Direct DB setup — no Medusa container required
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

    // Ensure region exists
    const regions = await pool.query('SELECT COUNT(*) FROM region')
    if (parseInt(regions.rows[0].count) === 0) {
      await pool.query(
        `INSERT INTO region (id, name, currency_code, tax_rate, created_at, updated_at)
         VALUES ('reg_default', 'Worldwide', 'usd', 0, NOW(), NOW())`
      )
      await pool.query(
        `INSERT INTO region_countries (region_id, iso_2)
         VALUES ('reg_default', 'us')`
      )
      await pool.query(
        `INSERT INTO region_currencies (region_id, currency_code)
         VALUES ('reg_default', 'usd')`
      )
      console.log('✓ Region created')
    }

    // Ensure admin user exists
    const users = await pool.query("SELECT id FROM public.user WHERE email = 'admin@hermes.store'")
    if (users.rows.length === 0) {
      await pool.query(
        `INSERT INTO public.user (id, email, password_hash, first_name, last_name, role, created_at, updated_at)
         VALUES ('usr_admin', 'admin@hermes.store', $1, 'Admin', 'User', 'admin', NOW(), NOW())`,
        [hash.toString('base64')]
      )
      console.log('✓ Admin user created: admin@hermes.store / admin123')
    }

    // Ensure products exist
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
          `INSERT INTO product (id, title, description, status, created_at, updated_at)
           VALUES ($1, $2, $3, 'published', NOW(), NOW())`,
          [item.id, item.title, item.desc]
        )
        for (const v of item.variants) {
          await pool.query(
            `INSERT INTO product_variant (id, product_id, title, created_at, updated_at)
             VALUES ($1, $2, $3, NOW(), NOW())`,
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
  } finally {
    await pool.end()
  }
}

setup()
