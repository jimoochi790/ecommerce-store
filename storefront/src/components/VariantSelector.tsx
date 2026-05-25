"use client"

import type { ProductOption, ProductVariant } from "@/lib/types"

interface VariantSelectorProps {
  options: ProductOption[]
  variants: ProductVariant[]
  selected: Record<string, string>
  onSelect: (optionId: string, value: string) => void
  images?: { url: string }[]
}

// Color aliases for matching swatch images
const COLOR_ALIASES: Record<string, string[]> = {
  black: ["black", "grey", "gray", "dark", "retro"],
  white: ["white", "whitepng"],
  purple: ["purple", "peuple"],
}

function findSwatchImage(images: { url: string }[], colorValue: string): string | null {
  const terms = COLOR_ALIASES[colorValue.toLowerCase()] || [colorValue.toLowerCase()]
  for (const img of images) {
    const url = img.url.toLowerCase()
    if (terms.some((t) => url.includes(t))) {
      return img.url
    }
  }
  return null
}

export default function VariantSelector({
  options,
  variants,
  selected,
  onSelect,
  images,
}: VariantSelectorProps) {
  if (!options || options.length === 0) return null

  return (
    <div className="space-y-5">
      {options.map((option) => {
        const isColor = option.title.toLowerCase() === "color"
        const availableValues = getAvailableValues(option, variants, selected)

        return (
          <div key={option.id}>
            <label className="mb-2 block font-pixel text-[10px] uppercase tracking-wider text-neon-cyan">
              {option.title}
            </label>

            {isColor && images && images.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {Array.from(
                  new Set(
                    option.values
                      .filter((v) => availableValues.includes(v.value))
                      .map((v) => v.value)
                  )
                ).map((colorValue) => {
                  const swatchUrl = findSwatchImage(images, colorValue)
                  const isSelected = selected[option.id] === colorValue
                  return (
                    <button
                      key={colorValue}
                      type="button"
                      onClick={() => onSelect(option.id, colorValue)}
                      className={`group relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.4)] scale-110"
                          : "border-retro-border hover:border-neon-cyan/60 hover:scale-105"
                      }`}
                      title={colorValue}
                    >
                      {swatchUrl ? (
                        <img
                          src={swatchUrl}
                          alt={colorValue}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-retro-surface text-[8px] font-pixel uppercase text-gray-500">
                          {colorValue}
                        </div>
                      )}
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-pixel text-[8px] uppercase transition-opacity ${
                        isSelected ? "text-neon-cyan opacity-100" : "text-gray-500 opacity-0 group-hover:opacity-100"
                      }`}>
                        {colorValue}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <select
                id={`option-${option.id}`}
                value={selected[option.id] || ""}
                onChange={(e) => onSelect(option.id, e.target.value)}
                className="input-field"
              >
                <option value="">Select {option.title}...</option>
                {availableValues.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            )}
          </div>
        )
      })}
    </div>
  )
}

function getAvailableValues(
  option: ProductOption,
  variants: ProductVariant[],
  selected: Record<string, string>
): string[] {
  const valueSet = new Set<string>()

  variants.forEach((variant) => {
    let matches = true

    variant.options.forEach((opt) => {
      if (
        opt.option_id !== option.id &&
        selected[opt.option_id] &&
        selected[opt.option_id] !== opt.value
      ) {
        matches = false
      }
    })

    if (matches) {
      const val = variant.options.find((o) => o.option_id === option.id)
      if (val) valueSet.add(val.value)
    }
  })

  return Array.from(valueSet).sort()
}
