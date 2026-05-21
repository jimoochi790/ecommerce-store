"use client"

interface PaymentFormProps {
  disabled?: boolean
}

export default function PaymentForm({ disabled = false }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-sm text-neutral-500">
          Stripe Elements will mount here. For now, use the placeholder card fields below.
        </p>
      </div>

      <div>
        <label htmlFor="card-number" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Card number
        </label>
        <div className="relative">
          <input
            id="card-number"
            type="text"
            placeholder="4242 4242 4242 4242"
            disabled={disabled}
            className="input-field pl-10"
            autoComplete="cc-number"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="card-expiry" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Expiry date
          </label>
          <input
            id="card-expiry"
            type="text"
            placeholder="MM / YY"
            disabled={disabled}
            className="input-field"
            autoComplete="cc-exp"
          />
        </div>
        <div>
          <label htmlFor="card-cvc" className="mb-1.5 block text-sm font-medium text-neutral-700">
            CVC
          </label>
          <div className="relative">
            <input
              id="card-cvc"
              type="text"
              placeholder="123"
              disabled={disabled}
              className="input-field pr-10"
              autoComplete="cc-csc"
            />
            <svg
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
