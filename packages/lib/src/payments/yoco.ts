import { z } from "zod";
import { DEV } from "esm-env";
import { createId } from "@paralleldrive/cuid2";
import crypto from "crypto";

const secretKeyStartsWith = DEV ? "sk_" : "sk_live_";

export const schema = z.object({
  secretKey: z.string().startsWith(secretKeyStartsWith, {
    message: `Secret Key must start with ${secretKeyStartsWith}`,
  }),
  amount: z.number().min(2),
  cancelUrl: z.string().url(),
  failureUrl: z.string().url(),
  successUrl: z.string().url(),
});

type YocoCheckout = z.infer<typeof schema>;
type YocoCheckoutErrors = z.inferFlattenedErrors<typeof schema>;

type Checkout = {
  id: string;
  amount: number;
  totalTaxAmount: number;
  subtotalAmount: number;
  currency: string;
  cancelUrl: string;
  failureUrl: string;
  successUrl: string;
  // Add the following properties based on the response
  status: string;
  metadata: {
    checkoutId: string;
    paymentFacilitator: string;
  };
  lineItems: null;
  paymentId: null;
  externalId: null;
  redirectUrl: string;
  totalDiscount: null;
  processingMode: string;
};

export async function createYocoCheckout({
  secretKey,
  amount,
  cancelUrl,
  failureUrl,
  successUrl,
}: YocoCheckout): Promise<{
  errors?: YocoCheckoutErrors;
  checkout?: Checkout;
}> {
  // validate zod schema
  const validate = schema.safeParse({
    secretKey,
    amount,
    cancelUrl,
    failureUrl,
    successUrl,
  });

  if (!validate.success) {
    return { errors: validate.error.flatten(), checkout: undefined };
  }

  const checkout = await fetch(`https://payments.yoco.com/api/checkouts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secretKey}`,
      "Idempotency-Key": createId(),
    },
    method: "POST",
    body: JSON.stringify({
      amount: amount * 100,
      totalTaxAmount: 0,
      subtotalAmount: amount * 100,
      currency: "ZAR",
      cancelUrl,
      failureUrl,
      successUrl,
    }),
  }).then((res) => res.json());

  return { errors: undefined, checkout };
}

export async function registerWebhook({
  secretKey,
  userId,
  url,
}: {
  secretKey: string;
  userId: string;
  url: string;
}) {
  const res = await fetch(`https://payments.yoco.com/api/webhooks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `invoicelink-${userId}`,
      url,
    }),
  });

  const webhook = await res.json();
  return webhook;
}

export async function getAllWebhooks(secretKey: string) {
  const res = await fetch(`https://payments.yoco.com/api/webhooks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });
  return (await res.json()) as {
    subscriptions: {
      id: string;
      name: string;
      url: string;
      mode: string;
    }[];
  };
}

export async function deleteWebhook(secretKey: string, webhookId: string) {
  const res = await fetch(
    `https://payments.yoco.com/api/webhooks/${webhookId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    }
  );

  return await res.json();
}

export async function deleteAllWebhooks(secretKey: string) {
  const webhooks = await getAllWebhooks(secretKey);

  for (const webhook of webhooks.subscriptions) {
    await deleteWebhook(secretKey, webhook.id);
  }
}

export function validateSignature({
  headers,
  body,
  secretKey,
}: {
  headers: Headers;
  body: string;
  secretKey: string;
}) {
  const id = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signedContent = `${id}.${timestamp}.${body}`;

  const secretBytes = Buffer.from(secretKey.split("_")[1], "base64");

  const expectedSignature = crypto
    .createHmac("sha256", secretBytes)
    .update(signedContent)
    .digest("base64");

  // Compare the signatures
  const signature =
    headers.get("webhook-signature")?.split(" ")[0].split(",")[1] ?? "";

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "base64"),
    Buffer.from(signature, "base64")
  );
}
