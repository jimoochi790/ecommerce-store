"use client"

interface QuantityPickerProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  disabled?: boolean
}

export default function QuantityPicker({
  value,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
}: QuantityPickerProps) {
  const decrement = () => {
    const next = value - 1
    if (next >= min) onChange(next)
  }

  const increment = () => {
    const next = value + 1
    if (next <= max) onChange(next)
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-neutral-300">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="flex h-10 w-10 items-center justify-center rounded-l-lg text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!isNaN(v) && v >= min && v <= max) onChange(v)
        }}
        disabled={disabled}
        className="h-10 w-14 border-x border-neutral-300 bg-transparent text-center text-sm font-medium text-neutral-900 focus:outline-none disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="flex h-10 w-10 items-center justify-center rounded-r-lg text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
        </svg>
      </button>
    </div>
  )
}
