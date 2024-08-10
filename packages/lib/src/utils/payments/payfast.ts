import crypto from "crypto";
import { generateIPRange } from "../ip";

export const generateSignature = (
  data: Record<string, string>,
  passphrase: string | null = null
) => {
  // Create parameter string
  let pfOutput = "";
  for (const key of Object.keys(data)) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`;
      }
    }
  }

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passphrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  const signature = crypto.createHash("md5").update(getString).digest("hex");
  return signature;
};

export const pfValidSignature = (
  pfSignature: string,
  pfParamString: string,
  pfPassphrase: string | null = null
) => {
  // Calculate security signature
  let tempParamString = pfParamString;
  if (pfPassphrase !== null) {
    tempParamString += `&passphrase=${encodeURIComponent(
      pfPassphrase.trim()
    ).replace(/%20/g, "+")}`;
  }

  const signature = crypto
    .createHash("md5")
    .update(tempParamString)
    .digest("hex");
  return pfSignature === signature;
};

export const pfValidIP = async (req: Request) => {
  const pfIp = req.headers.get("x-forwarded-for") as string;

  const ipWhitelist: string[] = [
    // IP Range: 197.97.145.144/28 (197.97.145.144 - 197.97.145.159)
    ...generateIPRange("197.97.145.144", "197.97.145.159"),

    // IP Range: 41.74.179.192/27 (41.74.179.192 – 41.74.179.223)
    ...generateIPRange("41.74.179.192", "41.74.179.223"),

    // IP Range: 102.216.36.0/28 (102.216.36.0 - 102.216.36.15)
    ...generateIPRange("102.216.36.0", "102.216.36.15"),

    // IP Range: 102.216.36.128/28 (102.216.36.128 - 102.216.36.143)
    ...generateIPRange("102.216.36.128", "102.216.36.143"),

    // Single IP Address: 144.126.193.139
    "144.126.193.139",
  ];

  if (ipWhitelist.includes(pfIp)) {
    return true;
  }
  return false;
};

export const pfValidPaymentData = (
  cartTotal: string,
  pfData: {
    [key: string]: string;
  }
) => {
  return (
    Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount_gross"])) <= 0.01
  );
};

export const pfValidServerConfirmation = async (
  pfHost: string,
  pfParamString: string
) => {
  const result = await fetch(`https://${pfHost}/eng/query/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: pfParamString,
  })
    .then((res) => res.text())
    .catch((error) => {
      console.error(error);
      return "INVALID";
    });

  return result === "VALID";
};
