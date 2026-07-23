import arcjet from "@arcjet/next";

// create base arcjet instance

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ["ip.src"], // track the ip
  rules: [],
});

export const authenticatedGenerationAj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["userId"],
  rules: [],
});
