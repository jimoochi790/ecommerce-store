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
    <div className="inline-flex items-center border-2 border-retro-border">
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:bg-retro-card hover:text-neon-cyan disabled:cursor-not-allowed disabled:opacity-20"
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
        className="h-10 w-14 border-x-2 border-retro-border bg-transparent text-center font-pixel text-sm text-gray-200 focus:outline-none disabled:cursor-not-allowed [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] [-moz-appearance:textfield]"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:bg-retro-card hover:text-neon-cyan disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Increase quantity"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
        </svg>
      </button>
    </div>
  )
}
