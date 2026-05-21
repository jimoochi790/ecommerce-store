import { SubscriberArgs } from "@medusajs/medusa"

export default async function productCreatedHandler({
  data,
  eventName,
  container,
}: SubscriberArgs<Record<string, any>>) {
  console.log(`[Subscriber] ${eventName}:`, data.id)
}

export const config = {
  event: "product.created",
  context: {
    subscriberId: "product-created-handler",
  },
}
