export async function createCoinbaseCheckout({
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
  const url = "https://api.commerce.coinbase.com/charges";
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CC-Api-Key": secretKey,
      },
      body: JSON.stringify({
        local_price: {
          amount,
          currency,
        },
        pricing_type: "fixed_price",
        name: itemName,
        description: "Small description",
        redirect_url: returnUrl,

        metadata: {
          id,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating charge:", error);
  }
}

export async function registerCoinbaseWebhook({
  secretKey,
  url,
}: {
  secretKey: string;
  url: string;
}) {
  console.log("Registering Coinbase Webhook - Not implemented", {
    secretKey,
    url,
  });
}

export async function getAllCoinbaseWebhooks(secretKey: string) {
  console.log("Getting all Coinbase Webhooks - Not implemented", { secretKey });
  return [];
}

export async function deleteCoinbaseWebhook(
  secretKey: string,
  webhookId: string
) {
  console.log("Deleting Coinbase Webhook - Not implemented", {
    secretKey,
    webhookId,
  });
}

export async function deleteAllCoinbaseWebhooks(secretKey: string) {
  console.log("Deleting all Coinbase Webhooks - Not implemented", {
    secretKey,
  });
}

export function validateCoinbaseSignature({
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
  console.log("Validating Coinbase Signature - Not implemented", {
    payload,
    signature,
    webhookSecret,
    secretKey,
  });
  return true;
}
