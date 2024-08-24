export {
  generateSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
  pfValidSignature,
} from "./payfast";
export {
  createYocoCheckout,
  deleteAllWebhooks,
  deleteWebhook,
  getAllWebhooks,
  registerWebhook,
  validateSignature,
} from "./yoco";
export {
  createStripeCheckout,
  registerStripeWebhook,
  deleteStripeWebhook,
  deleteAllStripeWebhooks,
  validateStripeSignature,
} from "./stripe";
export {
  createCoinbaseCheckout,
  deleteAllCoinbaseWebhooks,
  deleteCoinbaseWebhook,
  registerCoinbaseWebhook,
  validateCoinbaseSignature,
} from "./coinbase";

// NOTE: Update this when adding more payment gateways
// used in prisma queries
export const supportedIntegrations = {
  payfast: true,
  yoco: true,
  stripe: true,
  coinbase: true,
};
