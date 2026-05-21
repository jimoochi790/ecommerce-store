"use client"

import type { ProductOption, ProductVariant } from "@/lib/types"

interface VariantSelectorProps {
  options: ProductOption[]
  variants: ProductVariant[]
  selected: Record<string, string>
  onSelect: (optionId: string, value: string) => void
}

export default function VariantSelector({
  options,
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  if (!options || options.length === 0) return null

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const availableValues = getAvailableValues(
          option,
          variants,
          selected
        )

        return (
          <div key={option.id}>
            <label
              htmlFor={`option-${option.id}`}
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              {option.title}
            </label>
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
