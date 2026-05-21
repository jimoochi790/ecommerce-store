"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-data";
import { useCartStore } from "@/hooks/use-cart-store";
import ShippingForm from "@/components/ShippingForm";
import type { ShippingAddress } from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import { formatPrice } from "@/lib/utils";

type Step = "shipping" | "payment" | "confirming";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading } = useCart();
  const clearCart = useCartStore((s) => s.clearCart);
  const [step, setStep] = useState<Step>("shipping");
  const [address, setAddress] = useState<ShippingAddress>({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postal_code: "",
    country_code: "us",
    phone: "",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-neutral-600 mb-6">Add some products before checking out.</p>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // Medusa returns amounts in minor units (cents), convert for display
  const subtotal = (cart.subtotal ?? 0) / 100;
  const shipping = (cart.shipping_total ?? 0) / 100 || 9.99;
  const tax = (cart.tax_total ?? 0) / 100 || subtotal * 0.1;
  const total = (cart.total ?? 0) / 100;

  const handlePlaceOrder = () => {
    setStep("confirming");
    // In production: call Medusa cart completion API here
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === "confirming") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-neutral-600 mb-2">Thank you for your purchase.</p>
        <p className="text-neutral-500 text-sm mb-6">
          A confirmation email will be sent shortly.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "shipping"
                ? "bg-neutral-900 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {step === "shipping" ? "1" : "\u2713"}
          </div>
          <span
            className={`text-sm font-medium ${
              step === "shipping" ? "text-neutral-700" : "text-green-600"
            }`}
          >
            Shipping
          </span>
        </div>
        <div className="w-16 h-px bg-neutral-300 mx-4" />
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === "payment"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-200 text-neutral-500"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-medium ${
              step === "shipping" ? "text-neutral-400" : "text-neutral-700"
            }`}
          >
            Payment
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Shipping Address
              </h2>
              <ShippingForm
                values={address}
                onChange={setAddress}
              />
              <div className="mt-8">
                <button
                  onClick={() => setStep("payment")}
                  className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div>
              <button
                onClick={() => setStep("shipping")}
                className="text-sm text-neutral-500 hover:text-neutral-700 mb-6 inline-flex items-center gap-1"
              >
                &larr; Back to shipping
              </button>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Payment Details
              </h2>
              <PaymentForm />
              <div className="mt-8">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition font-medium"
                >
                  Place Order &mdash; {formatPrice(total * 100)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600 truncate flex-1 mr-2">
                    {item.title} &times; {item.quantity}
                  </span>
                  <span className="text-neutral-900 font-medium">
                    {formatPrice(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="text-neutral-900">
                  {formatPrice(subtotal * 100)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="text-neutral-900">
                  {formatPrice(shipping * 100)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax (est.)</span>
                <span className="text-neutral-900">
                  {formatPrice(tax * 100)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-neutral-200 pt-2 mt-2">
                <span className="text-neutral-900">Total</span>
                <span className="text-neutral-900">
                  {formatPrice(total * 100)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
