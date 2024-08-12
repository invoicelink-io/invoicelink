import Stripe from "stripe";

export async function createStripeCheckout({
  id,
  itemName,
  secretKey,
  amount,
  currency,
  returnUrl,
  cancelUrl,
}: {
  id: string | undefined;
  itemName: string;
  secretKey: string;
  amount: number;
  currency: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const stripe = new Stripe(secretKey);

  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase() ?? "usd",
          unit_amount: amount * 100,
          product_data: {
            name: itemName ?? "Invoicelink.io",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: returnUrl,
    cancel_url: cancelUrl,
    metadata: {
      id: id ?? "",
    },
  });
}

export async function registerStripeWebhook({
  secretKey,
  url,
}: {
  secretKey: string;
  url: string;
}) {
  const stripe = new Stripe(secretKey);

  const endpoint = await stripe.webhookEndpoints.create({
    url,
    enabled_events: ["payment_intent.succeeded"],
  });

  console.log(endpoint);
  return endpoint;
}

export async function getAllStripeWebhooks(secretKey: string) {
  const stripe = new Stripe(secretKey);
  const webhookEndpoints = await stripe.webhookEndpoints.list({
    limit: 3,
  });
  return webhookEndpoints;
}

export async function deleteAllStripeWebhooks(secretKey: string) {
  const stripe = new Stripe(secretKey);
  const webhookEndpoints = await stripe.webhookEndpoints.list({
    limit: 3,
  });
  for (const webhook of webhookEndpoints.data) {
    await stripe.webhookEndpoints.del(webhook.id);
  }
}

export async function deleteStripeWebhook(
  secretKey: string,
  webhookId: string
) {
  const stripe = new Stripe(secretKey);
  const deleted = await stripe.webhookEndpoints.del(webhookId);
  return deleted;
}

export function validateStripeSignature({
  payload,
  signature,
  webhookSecret,
  secretKey,
}: {
  payload: string;
  signature: string;
  webhookSecret: string;
  secretKey: string;
}) {
  const stripe = new Stripe(secretKey);
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
