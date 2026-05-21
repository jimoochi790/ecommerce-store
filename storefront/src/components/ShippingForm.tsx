"use client"

interface ShippingFormProps {
  values: ShippingAddress
  onChange: (values: ShippingAddress) => void
  disabled?: boolean
}

export interface ShippingAddress {
  first_name: string
  last_name: string
  address_1: string
  address_2: string
  city: string
  state: string
  postal_code: string
  country_code: string
  phone: string
}

const defaultAddress: ShippingAddress = {
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postal_code: "",
  country_code: "us",
  phone: "",
}

export { defaultAddress }

export default function ShippingForm({
  values,
  onChange,
  disabled = false,
}: ShippingFormProps) {
  const update = (field: keyof ShippingAddress, value: string) => {
    onChange({ ...values, [field]: value })
  }

  const fieldClass = "input-field"

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="shipping-first-name" className="mb-1.5 block text-sm font-medium text-neutral-700">
            First name
          </label>
          <input
            id="shipping-first-name"
            type="text"
            value={values.first_name}
            onChange={(e) => update("first_name", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="shipping-last-name" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Last name
          </label>
          <input
            id="shipping-last-name"
            type="text"
            value={values.last_name}
            onChange={(e) => update("last_name", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="shipping-address-1" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Address
        </label>
        <input
          id="shipping-address-1"
          type="text"
          value={values.address_1}
          onChange={(e) => update("address_1", e.target.value)}
          required
          disabled={disabled}
          className={fieldClass}
          autoComplete="address-line1"
        />
      </div>

      <div>
        <label htmlFor="shipping-address-2" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Apartment, suite, etc.
        </label>
        <input
          id="shipping-address-2"
          type="text"
          value={values.address_2}
          onChange={(e) => update("address_2", e.target.value)}
          disabled={disabled}
          className={fieldClass}
          autoComplete="address-line2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="shipping-city" className="mb-1.5 block text-sm font-medium text-neutral-700">
            City
          </label>
          <input
            id="shipping-city"
            type="text"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label htmlFor="shipping-state" className="mb-1.5 block text-sm font-medium text-neutral-700">
            State
          </label>
          <input
            id="shipping-state"
            type="text"
            value={values.state}
            onChange={(e) => update("state", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="address-level1"
          />
        </div>
        <div>
          <label htmlFor="shipping-postal" className="mb-1.5 block text-sm font-medium text-neutral-700">
            ZIP / Postal
          </label>
          <input
            id="shipping-postal"
            type="text"
            value={values.postal_code}
            onChange={(e) => update("postal_code", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="postal-code"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="shipping-country" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Country
          </label>
          <select
            id="shipping-country"
            value={values.country_code}
            onChange={(e) => update("country_code", e.target.value)}
            required
            disabled={disabled}
            className={fieldClass}
            autoComplete="country-name"
          >
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="gb">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="au">Australia</option>
          </select>
        </div>
        <div>
          <label htmlFor="shipping-phone" className="mb-1.5 block text-sm font-medium text-neutral-700">
            Phone
          </label>
          <input
            id="shipping-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={disabled}
            className={fieldClass}
            autoComplete="tel"
          />
        </div>
      </div>
    </div>
  )
}
