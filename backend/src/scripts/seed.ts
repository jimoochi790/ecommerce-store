import { MedusaContainer } from "@medusajs/medusa"
import {
  ProductStatus,
  ShippingProfileType,
} from "@medusajs/medusa"

export default async function seed(container: MedusaContainer) {
  const manager = container.resolve("manager")
  const productService = container.resolve("productService")
  const productCategoryService = container.resolve("productCategoryService")
  const regionService = container.resolve("regionService")
  const shippingOptionService = container.resolve("shippingOptionService")
  const shippingProfileService = container.resolve("shippingProfileService")
  const salesChannelService = container.resolve("salesChannelService")
  const storeService = container.resolve("storeService")

  console.log("🌱 Seeding database...")

  // Update store
  await storeService.update({
    name: "Hermes Merch",
    default_currency_code: "usd",
    currencies: [{ code: "usd", tax_rate: 0 }, { code: "eur", tax_rate: 0 }],
  })
  console.log("  ✓ Store configured")

  // Create default sales channel
  let salesChannel
  try {
    const channels = await salesChannelService.list()
    if (channels.length > 0) {
      salesChannel = channels[0]
    } else {
      salesChannel = await salesChannelService.create({
        name: "Default Sales Channel",
        description: "Created by seed",
        is_disabled: false,
      })
    }
  } catch (e) {
    salesChannel = await salesChannelService.create({
      name: "Default Sales Channel",
      description: "Created by seed",
      is_disabled: false,
    })
  }
  console.log("  ✓ Sales channel created")

  // Create regions
  let region
  const regions = await regionService.list()
  if (regions.length === 0) {
    region = await regionService.create({
      name: "United States",
      currency_code: "usd",
      tax_rate: 0,
      countries: ["us"],
      payment_providers: ["stripe"],
      fulfillment_providers: ["manual"],
    })
  } else {
    region = regions[0]
    await regionService.update(region.id, {
      payment_providers: ["stripe"],
      fulfillment_providers: ["manual"],
    })
  }
  console.log("  ✓ Region configured")

  // Create default shipping profile
  const profiles = await shippingProfileService.list()
  let defaultProfile
  if (profiles.length === 0) {
    defaultProfile = await shippingProfileService.createDefault()
  } else {
    defaultProfile = profiles.find((p) => p.type === ShippingProfileType.DEFAULT) || profiles[0]
  }
  console.log("  ✓ Shipping profile created")

  // Create shipping option
  const shippingOptions = await shippingOptionService.list()
  if (shippingOptions.length === 0) {
    await shippingOptionService.create({
      name: "Standard Shipping",
      region_id: region.id,
      provider_id: "manual",
      profile_id: defaultProfile.id,
      data: {},
      price_type: "flat_rate",
      amount: 500,
      is_return: false,
    })
    await shippingOptionService.create({
      name: "Express Shipping",
      region_id: region.id,
      provider_id: "manual",
      profile_id: defaultProfile.id,
      data: {},
      price_type: "flat_rate",
      amount: 1500,
      is_return: false,
    })
  }
  console.log("  ✓ Shipping options created")

  // Create product categories
  const categoryData = [
    {
      name: "T-Shirts",
      handle: "t-shirts",
      description: "Premium cotton tees",
    },
    {
      name: "Hoodies",
      handle: "hoodies",
      description: "Warm and comfortable hoodies",
    },
    {
      name: "Jackets",
      handle: "jackets",
      description: "Outerwear for all seasons",
    },
    {
      name: "Accessories",
      handle: "accessories",
      description: "Complete your look",
    },
  ]

  const categoryMap: Record<string, any> = {}
  for (const cat of categoryData) {
    try {
      const existing = await productCategoryService.list({ handle: cat.handle })
      if (existing.length > 0) {
        categoryMap[cat.handle] = existing[0]
      } else {
        const created = await productCategoryService.create({
          name: cat.name,
          handle: cat.handle,
          description: cat.description,
          is_active: true,
          is_internal: false,
        })
        categoryMap[cat.handle] = created
      }
    } catch (e) {
      const created = await productCategoryService.create({
        name: cat.name,
        handle: cat.handle,
        description: cat.description,
        is_active: true,
        is_internal: false,
      })
      categoryMap[cat.handle] = created
    }
  }
  console.log("  ✓ Product categories created")

  // Product data
  const products = [
    {
      title: "Classic Crew Tee",
      handle: "classic-crew-tee",
      description: "A timeless crew neck t-shirt crafted from 100% organic cotton. Pre-shrunk, soft-washed, and built to last. Features a relaxed fit with reinforced neck and shoulder seams.",
      category: "t-shirts",
      variants: [
        { title: "S / White", sku: "CCT-S-WH", size: "S", color: "White", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 50, allow_backorder: false },
        { title: "S / Black", sku: "CCT-S-BK", size: "S", color: "Black", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 45, allow_backorder: false },
        { title: "M / White", sku: "CCT-M-WH", size: "M", color: "White", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 60, allow_backorder: false },
        { title: "M / Black", sku: "CCT-M-BK", size: "M", color: "Black", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 55, allow_backorder: false },
        { title: "L / White", sku: "CCT-L-WH", size: "L", color: "White", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 40, allow_backorder: false },
        { title: "L / Black", sku: "CCT-L-BK", size: "L", color: "Black", prices: [{ amount: 2900 }], manage_inventory: true, inventory_quantity: 35, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "cotton" }, { value: "basics" }, { value: "men" }],
    },
    {
      title: "Vintage Wash Hoodie",
      handle: "vintage-wash-hoodie",
      description: "Garment-dyed heavyweight hoodie with a lived-in feel. Made from 450GSM brushed fleece with a relaxed dropped-shoulder fit. Features an oversized hood, kangaroo pocket, and ribbed cuffs.",
      category: "hoodies",
      variants: [
        { title: "M / Heather Grey", sku: "VWH-M-HG", size: "M", color: "Heather Grey", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 30, allow_backorder: false },
        { title: "M / Navy", sku: "VWH-M-NV", size: "M", color: "Navy", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 25, allow_backorder: false },
        { title: "M / Forest", sku: "VWH-M-FR", size: "M", color: "Forest", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 20, allow_backorder: false },
        { title: "L / Heather Grey", sku: "VWH-L-HG", size: "L", color: "Heather Grey", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 35, allow_backorder: false },
        { title: "L / Navy", sku: "VWH-L-NV", size: "L", color: "Navy", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 30, allow_backorder: false },
        { title: "L / Forest", sku: "VWH-L-FR", size: "L", color: "Forest", prices: [{ amount: 6500 }], manage_inventory: true, inventory_quantity: 15, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "fleece" }, { value: "streetwear" }, { value: "unisex" }],
    },
    {
      title: "Slim Fit Oxford Shirt",
      handle: "slim-fit-oxford-shirt",
      description: "A refined oxford button-down in lightweight cotton with a slight stretch. Features a button-down collar, chest pocket, and box pleat at back. Perfect for smart-casual occasions.",
      category: "t-shirts",
      variants: [
        { title: "S / Light Blue", sku: "SFO-S-LB", size: "S", color: "Light Blue", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 25, allow_backorder: false },
        { title: "S / White", sku: "SFO-S-WH", size: "S", color: "White", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 30, allow_backorder: false },
        { title: "M / Light Blue", sku: "SFO-M-LB", size: "M", color: "Light Blue", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 35, allow_backorder: false },
        { title: "M / White", sku: "SFO-M-WH", size: "M", color: "White", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 40, allow_backorder: false },
        { title: "L / Light Blue", sku: "SFO-L-LB", size: "L", color: "Light Blue", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 20, allow_backorder: false },
        { title: "L / White", sku: "SFO-L-WH", size: "L", color: "White", prices: [{ amount: 4500 }], manage_inventory: true, inventory_quantity: 25, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "cotton" }, { value: "smart-casual" }, { value: "men" }],
    },
    {
      title: "Tech Shell Jacket",
      handle: "tech-shell-jacket",
      description: "Lightweight, waterproof, windproof shell jacket with fully taped seams. Features an adjustable hood, underarm ventilation zips, and multiple secure pockets. Packs into its own pocket for travel.",
      category: "jackets",
      variants: [
        { title: "M / Olive", sku: "TSJ-M-OL", size: "M", color: "Olive", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 20, allow_backorder: false },
        { title: "M / Slate", sku: "TSJ-M-SL", size: "M", color: "Slate", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 15, allow_backorder: false },
        { title: "L / Olive", sku: "TSJ-L-OL", size: "L", color: "Olive", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 25, allow_backorder: false },
        { title: "L / Slate", sku: "TSJ-L-SL", size: "L", color: "Slate", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 18, allow_backorder: false },
        { title: "XL / Olive", sku: "TSJ-XL-OL", size: "XL", color: "Olive", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 12, allow_backorder: false },
        { title: "XL / Slate", sku: "TSJ-XL-SL", size: "XL", color: "Slate", prices: [{ amount: 12800 }], manage_inventory: true, inventory_quantity: 10, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "waterproof" }, { value: "outerwear" }, { value: "unisex" }, { value: "travel" }],
    },
    {
      title: "Relaxed Linen Shorts",
      handle: "relaxed-linen-shorts",
      description: "Breathable mid-rise shorts in washed Belgian linen. Elasticated waistband with drawcord, side pockets, and a single back patch pocket. Perfect for warm-weather outings.",
      category: "accessories",
      variants: [
        { title: "M / Sand", sku: "RLS-M-SD", size: "M", color: "Sand", prices: [{ amount: 4200 }], manage_inventory: true, inventory_quantity: 30, allow_backorder: false },
        { title: "M / Navy", sku: "RLS-M-NV", size: "M", color: "Navy", prices: [{ amount: 4200 }], manage_inventory: true, inventory_quantity: 28, allow_backorder: false },
        { title: "L / Sand", sku: "RLS-L-SD", size: "L", color: "Sand", prices: [{ amount: 4200 }], manage_inventory: true, inventory_quantity: 32, allow_backorder: false },
        { title: "L / Navy", sku: "RLS-L-NV", size: "L", color: "Navy", prices: [{ amount: 4200 }], manage_inventory: true, inventory_quantity: 25, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "linen" }, { value: "summer" }, { value: "unisex" }],
    },
    {
      title: "Knitted Beanie",
      handle: "knitted-beanie",
      description: "Chunky rib-knit beanie in a wool-alpaca blend. Features a wide fold-over brim and a subtle embroidered logo. One size fits most with a slouchy silhouette.",
      category: "accessories",
      variants: [
        { title: "One Size / Charcoal", sku: "KB-OS-CH", size: "One Size", color: "Charcoal", prices: [{ amount: 2500 }], manage_inventory: true, inventory_quantity: 100, allow_backorder: false },
        { title: "One Size / Rust", sku: "KB-OS-RS", size: "One Size", color: "Rust", prices: [{ amount: 2500 }], manage_inventory: true, inventory_quantity: 80, allow_backorder: false },
        { title: "One Size / Cream", sku: "KB-OS-CR", size: "One Size", color: "Cream", prices: [{ amount: 2500 }], manage_inventory: true, inventory_quantity: 90, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "wool" }, { value: "winter" }, { value: "unisex" }],
    },
    {
      title: "Canvas Tote Bag",
      handle: "canvas-tote-bag",
      description: "Heavyweight 16oz canvas tote with reinforced handles and an internal zip pocket. Generously sized to fit groceries, gym gear, or a weekend getaway. Pre-washed for a soft hand feel.",
      category: "accessories",
      variants: [
        { title: "One Size / Natural", sku: "CTB-OS-NT", size: "One Size", color: "Natural", prices: [{ amount: 3200 }], manage_inventory: true, inventory_quantity: 70, allow_backorder: false },
        { title: "One Size / Black", sku: "CTB-OS-BK", size: "One Size", color: "Black", prices: [{ amount: 3200 }], manage_inventory: true, inventory_quantity: 65, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "canvas" }, { value: "accessories" }, { value: "unisex" }],
    },
    {
      title: "Merino Wool Quarter-Zip",
      handle: "merino-wool-quarter-zip",
      description: "Ultra-fine 18.5 micron merino quarter-zip pullover. Naturally temperature-regulating, odor-resistant, and incredibly soft against skin. Features a rib-knit stand collar and raglan sleeves.",
      category: "jackets",
      variants: [
        { title: "M / Midnight", sku: "MWQ-M-MN", size: "M", color: "Midnight", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 22, allow_backorder: false },
        { title: "M / Oatmeal", sku: "MWQ-M-OM", size: "M", color: "Oatmeal", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 18, allow_backorder: false },
        { title: "L / Midnight", sku: "MWQ-L-MN", size: "L", color: "Midnight", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 28, allow_backorder: false },
        { title: "L / Oatmeal", sku: "MWQ-L-OM", size: "L", color: "Oatmeal", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 20, allow_backorder: false },
        { title: "XL / Midnight", sku: "MWQ-XL-MN", size: "XL", color: "Midnight", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 15, allow_backorder: false },
        { title: "XL / Oatmeal", sku: "MWQ-XL-OM", size: "XL", color: "Oatmeal", prices: [{ amount: 9800 }], manage_inventory: true, inventory_quantity: 12, allow_backorder: false },
      ],
      options: [{ title: "Size" }, { title: "Color" }],
      tags: [{ value: "merino" }, { value: "premium" }, { value: "men" }],
    },
  ]

  // Create products
  for (const productData of products) {
    const { title, handle, description, category, variants, options, tags } = productData

    try {
      const existing = await productService.list({ handle })
      if (existing.length > 0) {
        console.log(`  ⏭ Skipping existing product: ${title}`)
        continue
      }
    } catch (_) {
      // continue
    }

    const productPayload: any = {
      title,
      handle,
      description,
      status: ProductStatus.PUBLISHED,
      options,
      variants: variants.map((v) => ({
        title: v.title,
        sku: v.sku,
        prices: v.prices,
        options: [
          { value: v.size },
          { value: v.color },
        ],
        manage_inventory: v.manage_inventory,
        inventory_quantity: v.inventory_quantity,
        allow_backorder: v.allow_backorder,
      })),
      tags,
      categories: categoryMap[category] ? [{ id: categoryMap[category].id }] : [],
      sales_channels: salesChannel ? [{ id: salesChannel.id }] : [],
      profile_id: defaultProfile.id,
      type: undefined,
      collection_id: undefined,
    }

    try {
      await productService.create(productPayload)
      console.log(`  ✓ Created product: ${title}`)
    } catch (err: any) {
      console.error(`  ✗ Failed to create ${title}:`, err.message)
    }
  }

  console.log("✅ Seeding complete!")
}
